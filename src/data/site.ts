export const site = {
  name: 'Physio Dynamic',
  tagline: 'Κέντρο φυσικοθεραπείας στο Π. Φάληρο',
  owner: 'Ιωάννης Κώτουλας',
  phones: ['2117506000', '6936579008'],
  phoneDisplay: '211 750 6000',
  address: {
    street: 'Λ. Αμφιθέας 103',
    area: 'Παλαιό Φάληρο',
    postal: '17563',
    region: 'ΑΤΤΙΚΗΣ',
  },
  addressLine: 'Λ. Αμφιθέας 103, Παλαιό Φάληρο, 17563, ΑΤΤΙΚΗΣ',
  hours: [
    { day: 'Καθημερινές', time: '09:00 – 21:00' },
    { day: 'Σάββατο', time: 'Κλειστά' },
    { day: 'Κυριακή', time: 'Κλειστά' },
  ],
  headerStrip: 'Είμαστε συμβεβλημένοι με ολα τα ταμεία. Καλέστε στο 211 750 6000 για να προγραμματίσετε το ραντεβού σας.',
  bookingUrl: 'https://doodle.com/bp/ioanniskotoulas/physio-dynamic-?reauth=true',
  social: {
    facebook: 'http://facebook.com/kotoulasphysio',
    instagram: 'https://www.instagram.com/physiodynamicgr/',
  },
  analytics: {
    gtag: 'GT-MKRVGV47',
    ads: 'AW-10906618363',
    gtm: 'GTM-KMN59H9R',
    cookieYesId: '10fbfbca49479ac832e74c25',
  },
};

export const services = [
  { slug: 'mckenzie-μηχανική-διάγνωση-και-θεραπεία', title: 'McKenzie – Μηχανική Διάγνωση και Θεραπεία' },
  { slug: 'αθλητικοί-τραυματισμοί', title: 'Αθλητικοί Τραυματισμοί' },
  { slug: 'κατ-οίκον-φυσιοθεραπευτικές-υπηρεσ', title: "Κατ' οίκον Υπηρεσίες" },
  { slug: 'manual-therapy-δια-χειρός-θεραπεία', title: 'Manual Therapy' },
  { slug: 'βελονισμός', title: 'Βελονισμός' },
  { slug: 'indiba-activ', title: 'Θεραπεία με Indiba Activ' },
  { slug: 'shockwave-therapy-κρουστικός-υπέρηχος', title: 'Shockwave Therapy' },
  { slug: 'trigger-points', title: 'Trigger Points' },
  { slug: 'τεχνική-ξηράς-βελόνας', title: 'Τεχνική Ξηράς Βελόνας' },
  { slug: 'θεραπευτική-άσκηση', title: 'Θεραπευτική Άσκηση' },
  { slug: 'otago-exercise-program-πρόγραμμα-άσκησης-για-πρόληψη-της', title: 'Otago Exercise Program' },
  { slug: 'kinesio-taping', title: 'Kinesio Taping' },
  { slug: 'pilates', title: 'Pilates' },
  { slug: 'ορθωτικά-πέλματα', title: 'Ορθωτικά Πέλματα' },
  { slug: 'λειτουργική-μαγνητική-διέγερση-fms', title: 'Λειτουργική Μαγνητική Διέγερση (FMS)' },
] as const;

export type Service = typeof services[number];

export const serviceGroups = [
  {
    title: 'Διαγνωστικές & Χειρωνακτικές',
    blurb: 'Κλινική αξιολόγηση και δια χειρός τεχνικές αποκατάστασης.',
    icon: 'hand',
    items: [
      { slug: 'mckenzie-μηχανική-διάγνωση-και-θεραπεία', title: 'McKenzie', desc: 'Μηχανική Διάγνωση & Θεραπεία' },
      { slug: 'manual-therapy-δια-χειρός-θεραπεία', title: 'Manual Therapy', desc: 'Δια χειρός θεραπεία' },
    ],
  },
  {
    title: 'Θεραπείες με βελόνα',
    blurb: 'Ενέσιμες τεχνικές για μυοπεριτονιακό πόνο και trigger points.',
    icon: 'needle',
    items: [
      { slug: 'βελονισμός', title: 'Βελονισμός', desc: 'Θεραπευτικός βελονισμός' },
      { slug: 'τεχνική-ξηράς-βελόνας', title: 'Τεχνική Ξηράς Βελόνας', desc: 'Dry needling' },
      { slug: 'trigger-points', title: 'Trigger Points', desc: 'Σημεία πυροδότησης' },
    ],
  },
  {
    title: 'Τεχνολογία αιχμής',
    blurb: 'Σύγχρονες συσκευές που επιταχύνουν την αποκατάσταση.',
    icon: 'device',
    items: [
      { slug: 'indiba-activ', title: 'Indiba Activ', desc: 'Ραδιοσυχνότητες 448 kHz' },
      { slug: 'shockwave-therapy-κρουστικός-υπέρηχος', title: 'Shockwave Therapy', desc: 'Κρουστικός υπέρηχος' },
      { slug: 'λειτουργική-μαγνητική-διέγερση-fms', title: 'FMS', desc: 'Λειτουργική Μαγνητική Διέγερση' },
    ],
  },
  {
    title: 'Άσκηση & Αποκατάσταση',
    blurb: 'Εξατομικευμένα προγράμματα ενδυνάμωσης και επανένταξης.',
    icon: 'movement',
    items: [
      { slug: 'θεραπευτική-άσκηση', title: 'Θεραπευτική Άσκηση', desc: 'Εξατομικευμένα προγράμματα' },
      { slug: 'pilates', title: 'Pilates', desc: 'Clinical Pilates & Reformer' },
      { slug: 'otago-exercise-program-πρόγραμμα-άσκησης-για-πρόληψη-της', title: 'Otago Exercise Program', desc: 'Πρόληψη πτώσεων 65+' },
      { slug: 'kinesio-taping', title: 'Kinesio Taping', desc: 'Ελαστικές ταινίες υποστήριξης' },
    ],
  },
  {
    title: 'Εξειδικευμένες υπηρεσίες',
    blurb: 'Εξατομικευμένη φροντίδα σε ειδικές ανάγκες και πληθυσμούς.',
    icon: 'special',
    items: [
      { slug: 'αθλητικοί-τραυματισμοί', title: 'Αθλητικοί Τραυματισμοί', desc: 'Πιστοποίηση APA' },
      { slug: 'κατ-οίκον-φυσιοθεραπευτικές-υπηρεσ', title: "Κατ' οίκον Υπηρεσίες", desc: 'Φυσικοθεραπεία στον χώρο σας' },
      { slug: 'ορθωτικά-πέλματα', title: 'Ορθωτικά Πέλματα', desc: 'Εξατομικευμένος σχεδιασμός' },
    ],
  },
] as const;

export type ServiceGroup = typeof serviceGroups[number];
