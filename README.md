# Physio Dynamic — Website

Ιστότοπος του κέντρου φυσικοθεραπείας **Physio Dynamic** (Παλαιό Φάληρο).
Στατικό site φτιαγμένο με **Astro 5**, φιλοξενία στο **Cloudflare Pages**.

- **Live:** https://physiodynamic.com.gr
- **Repo:** https://github.com/mikemorakis/physiodynamic-website
- **Sitemap:** https://physiodynamic.com.gr/sitemap-index.xml

---

## Τι χρειάζεσαι (μία φορά ανά μηχάνημα)

- [Node.js](https://nodejs.org) 20 ή νεότερο (περιλαμβάνει `npm`)
- [Git](https://git-scm.com)

## Κατέβασμα του project σε νέο μηχάνημα (π.χ. laptop)

```bash
git clone https://github.com/mikemorakis/physiodynamic-website.git
cd physiodynamic-website
npm install
```

## Τοπική προεπισκόπηση (ενώ δουλεύεις)

```bash
npm run dev
```

Άνοιξε το `http://localhost:4321` στον browser. Οι αλλαγές φαίνονται ζωντανά.

---

## Ανέβασμα αλλαγών (Deploy)

Υπάρχουν **δύο** τρόποι — και οι δύο ανεβάζουν στο production (`physiodynamic.com.gr`):

**1. Αυτόματο (προτεινόμενο) — απλώς κάνε push:**

```bash
git add -A
git commit -m "περιγραφή αλλαγών"
git push
```

Το push ενεργοποιεί το **GitHub Action** (`.github/workflows/deploy.yml`), που χτίζει και ανεβάζει μόνο του στο Cloudflare Pages (production branch: `main`).

**2. Χειροκίνητο — απευθείας από το μηχάνημά σου:**

```bash
npm run deploy
```

Χτίζει τοπικά και ανεβάζει με το `wrangler`. Χρήσιμο όταν θες να δεις άμεσα το αποτέλεσμα χωρίς να περιμένεις το Action.

> Μετά το deploy, κάνε **Ctrl+F5** (hard refresh) για να φύγει το cache.

---

## Δουλειά από πολλά μηχανήματα (PC + laptop)

Ο κώδικας ζει στο GitHub — αυτό είναι το «κοινό» σημείο.

- **Πριν** ξεκινήσεις δουλειά σε ένα μηχάνημα: `git pull` (παίρνεις ό,τι ανέβασε το άλλο).
- **Μετά** τη δουλειά: `git add -A && git commit -m "..." && git push`.

Έτσι τα δύο μηχανήματα μένουν συγχρονισμένα και δεν διχάζεται το project.

> Αν το git παραπονεθεί για `index.lock`: `del .git\index.lock` (Windows) και ξαναδοκίμασε.

---

## Δομή του project

```
src/
  pages/        Σελίδες (index.astro = αρχική, [...slug].astro = υπηρεσίες + blog,
                404.astro, νομικές σελίδες)
  layouts/      BaseLayout.astro (κοινό <head>, scripts, footer), PageLayout.astro
  components/   Header, Footer, CookieConsent, StickyCTA, ServiceIcon, ContactForm, Search
  data/         site.ts     → ρυθμίσεις (τηλέφωνα, διεύθυνση, booking URL, analytics)
                home.ts     → περιεχόμενο αρχικής (testimonials, FAQ)
                posts.ts    → άρθρα blog / SEO
                services.ts → σελίδες υπηρεσιών
                schema.ts   → JSON-LD structured data (SEO)
                pillar-content.ts → FAQ & πίνακες για FMS / McKenzie
  styles/       global.css  → χρώματα & γραμματοσειρές
public/         Στατικά αρχεία (εικόνες, hero.mp4, icons, robots.txt, llms.txt, favicon)
.github/workflows/deploy.yml   Αυτόματο deploy στο Cloudflare Pages
```

---

## Σημαντικά που πρέπει να ξέρεις

- **Γραμματοσειρά:** Google Sans, **self-hosted** μέσω `@fontsource/google-sans` (μόνο greek+latin subsets, imports στο `global.css`, preload στο `BaseLayout.astro`). Ρυθμίζεται μέσω των μεταβλητών `--font-body` / `--font-heading` στο `global.css`.
- **Εικόνες:** είναι βελτιστοποιημένες (max 1400px, quality ~82). Όταν προσθέτεις νέες, κράτα τες συμπιεσμένες — μεγάλες φωτογραφίες ρίχνουν την ταχύτητα.
- **Hero video:** `public/hero.mp4` (1280px, χωρίς ήχο). Φορτώνει *μετά* το πρώτο render για γρήγορο LCP. Τα posters (`hero-poster-*.jpg`) είναι καρέ του βίντεο σε 3 μεγέθη.
- **Performance:** όλο το CSS γίνεται inline (astro.config), τα analytics (gtag/GTM) φορτώνουν στην πρώτη αλληλεπίδραση (ή μετά από 6s), τα κρυφά menus και τα below-fold sections χρησιμοποιούν `content-visibility` — μην αφαιρεθούν αυτά χωρίς λόγο, κρατούν το PageSpeed στο ~100.
- **`_to_delete/`:** φάκελος με παλιά/backup αρχεία. Είναι στο `.gitignore` — αγνόησέ τον ή σβήσ' τον.
- **SEO pillars:** Φυσικοθεραπεία (αρχική), Λειτουργική Μαγνητική Διέγερση (FMS), McKenzie. Κανόνας: κάθε νέο SEO άρθρο έχει **πίνακα**.
- **Ραντεβού:** το booking URL είναι στο `src/data/site.ts` (`bookingUrl`).
- **Analytics:** Google Tag Manager (`GTM-KMN59H9R`), GA4 μέσω GTM, Google Ads, με Consent Mode v2 (cookie banner).

---

## Cloudflare Pages

- Project name: `physiodynamic`
- **Production branch: `main`** (γι' αυτό όλα τα deploy χρησιμοποιούν `--branch=main`).
