import { site } from './site';
import { testimonials, faqs } from './home';

const SITE = 'https://physiodynamic.com.gr';
const BUSINESS_ID = `${SITE}/#business`;
const PHONE = '+302117506000';
const LOGO = 'https://physiodynamic.com.gr/wp-content/uploads/2022/03/cropped-logo-Ιωάννης-Κωτουλας-e1648814356905-307x58.jpg';
const IMAGE = `${SITE}/hero-fallback.jpg`;

// Site-wide business entity (Physiotherapy clinic) with rating + on-page reviews.
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physiotherapy',
    '@id': BUSINESS_ID,
    name: site.name,
    description:
      'Σύγχρονο κέντρο φυσικοθεραπείας στο Παλαιό Φάληρο. Manual Therapy, McKenzie, Βελονισμός, Shockwave, Μαγνητικός Διεγέρτης (FMS), Pilates & αποκατάσταση. Συμβεβλημένοι με όλα τα ταμεία.',
    url: SITE,
    telephone: PHONE,
    image: IMAGE,
    logo: LOGO,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.area,
      postalCode: site.address.postal,
      addressRegion: 'Αττική',
      addressCountry: 'GR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 37.9293307, longitude: 23.7031064 },
    hasMap: 'https://www.google.com/maps/place/?q=place_id:ChIJDV7bayC9oRQRyMGID3HujLs',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [site.social.facebook, site.social.instagram],
    areaServed: ['Παλαιό Φάληρο', 'Άλιμος', 'Νέα Σμύρνη', 'Καλλιθέα', 'Μοσχάτο'].map((n) => ({
      '@type': 'City',
      name: n,
    })),
    founder: {
      '@type': 'Person',
      name: site.owner,
      jobTitle: 'Φυσικοθεραπευτής',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '185',
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.text,
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: site.name,
    inLanguage: 'el',
    publisher: { '@id': BUSINESS_ID },
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  const clean = items.filter((f) => f && f.q && f.a);
  if (clean.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: clean.map((f) => ({
      '@type': 'Question',
      name: f.q.replace(/\s+/g, ' ').trim(),
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\s+/g, ' ').trim() },
    })),
  };
}

// Build FAQ pairs from service sections whose heading is a question (ends with ; or ?).
export function faqFromSections(sections: any[]) {
  const pairs = (sections || [])
    .filter((s) => s && s.heading && s.body && /[;?]\s*$/.test(s.heading.trim()))
    .map((s) => ({ q: s.heading, a: s.body }));
  return faqPage(pairs);
}

export function serviceSchema(page: { slug: string; title: string; description?: string; heroImage?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: page.title,
    description: page.description,
    url: `${SITE}/${page.slug}/`,
    inLanguage: 'el',
    mainEntityOfPage: `${SITE}/${page.slug}/`,
    ...(page.heroImage ? { image: page.heroImage.startsWith('http') ? page.heroImage : `${SITE}${page.heroImage}` } : {}),
    provider: { '@id': BUSINESS_ID },
  };
}

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE}${it.url}`,
    })),
  };
}

export function blogPosting(post: {
  slug: string;
  title: string;
  excerpt?: string;
  heroImage?: string;
  author?: string;
  dateDisplay?: string;
  date?: string;
  datePublished?: string;
}) {
  const published = post.datePublished || post.date;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage ? (post.heroImage.startsWith('http') ? post.heroImage : `${SITE}${post.heroImage}`) : IMAGE,
    author: { '@type': post.author ? 'Person' : 'Organization', name: post.author || site.name },
    publisher: { '@id': BUSINESS_ID },
    mainEntityOfPage: `${SITE}/${post.slug}/`,
    ...(published ? { datePublished: published, dateModified: published } : {}),
  };
}
