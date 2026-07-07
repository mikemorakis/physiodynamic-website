interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface Payload {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  website?: string;
}

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Μη έγκυρο αίτημα' }, 400);
  }

  if (body.website && body.website.trim() !== '') {
    return jsonResponse({ ok: true });
  }

  const name = (body.name ?? '').trim().slice(0, 200);
  const phone = (body.phone ?? '').trim().slice(0, 40);
  const email = (body.email ?? '').trim().slice(0, 200);
  const message = (body.message ?? '').trim().slice(0, 4000);

  if (!name || !phone) {
    return jsonResponse({ error: 'Συμπληρώστε όνομα και τηλέφωνο' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: 'Η φόρμα δεν είναι ρυθμισμένη' }, 500);
  }

  const to = env.CONTACT_TO_EMAIL || 'kotoulasphysio@gmail.com';
  const from = env.CONTACT_FROM_EMAIL || 'Physio Dynamic <onboarding@resend.dev>';

  const html = `
    <h2>Νέο μήνυμα από τη φόρμα επικοινωνίας</h2>
    <p><strong>Ονοματεπώνυμο:</strong> ${escapeHtml(name)}</p>
    <p><strong>Τηλέφωνο:</strong> ${escapeHtml(phone)}</p>
    ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ''}
    ${message ? `<p><strong>Μήνυμα:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
    <hr>
    <p style="color:#666;font-size:12px">Αποστολή από physiodynamic.com.gr</p>
  `;

  const text = [
    `Ονοματεπώνυμο: ${name}`,
    `Τηλέφωνο: ${phone}`,
    email && `Email: ${email}`,
    message && `Μήνυμα:\n${message}`,
  ].filter(Boolean).join('\n\n');

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email || undefined,
      subject: `Νέο μήνυμα από ${name} — Physio Dynamic`,
      html,
      text,
    }),
  });

  if (!resendRes.ok) {
    const err = await resendRes.text();
    console.error('Resend error:', err);
    return jsonResponse({ error: 'Αποτυχία αποστολής' }, 502);
  }

  return jsonResponse({ ok: true });
};
