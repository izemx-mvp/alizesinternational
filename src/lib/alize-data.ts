export type OpportunityStatus = "Priorité A" | "Priorité B" | "À qualifier" | "À contacter" | "En cours" | "Archivée";
export type CompanySize = "10–50" | "50–200" | "200–500" | "500–1 000" | "1 000–5 000" | "+5 000";
export type Tone = "Professionnel" | "Court & direct" | "Premium" | "Chaleureux";

export type Contact = {
  id: string;
  name: string;
  role: string;
  influence: "Décideur principal" | "Influenceur" | "Sponsor potentiel" | "Contact opérationnel";
  score: number;
  email: string;
};

export type Opportunity = {
  id: string;
  company: string;
  country: string;
  city: string;
  sector: string;
  size: CompanySize;
  eventType: string;
  opportunity: string;
  signal: string;
  score: number;
  status: OpportunityStatus;
  detectedAt: string;
  horizon: string;
  destination: string;
  website: string;
  employees: number;
  locations: string[];
  summary: string;
  scoreReasons: { label: string; points: number }[];
  timeline: { date: string; text: string }[];
  contacts: Contact[];
  notes: string[];
};

export type Prospect = {
  id: string;
  company: string;
  country: string;
  city: string;
  sector: string;
  size: CompanySize;
  decisionMakers: number;
  opportunities: number;
  potentialScore: number;
  lastAnalysis: string;
  watched: boolean;
  archived: boolean;
};

export type WatchSource = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  signals: number;
  analyzed: string;
  volume: string;
};

export type Keyword = {
  id: string;
  keyword: string;
  category: string;
  language: "FR" | "EN";
  occurrences: number;
  active: boolean;
};

export type AlertRule = {
  id: string;
  name: string;
  condition: string;
  channel: string;
  recipient: string;
  active: boolean;
};

export const countries = [
  "France",
  "Espagne",
  "Belgique",
  "Royaume-Uni",
  "Allemagne",
  "Suisse",
  "Italie",
  "Pays-Bas",
  "Émirats arabes unis",
  "Arabie Saoudite",
];

export const cities = [
  "Paris",
  "Lyon",
  "Marseille",
  "Madrid",
  "Barcelone",
  "Bruxelles",
  "Londres",
  "Berlin",
  "Dubaï",
  "Genève",
  "Amsterdam",
];

export const sectors = [
  "Pharmaceutique",
  "Technologie",
  "Finance",
  "Assurance",
  "Automobile",
  "Luxe",
  "Retail",
  "Agroalimentaire",
  "Industrie",
  "Énergie",
  "Conseil",
  "Télécommunications",
];

export const companySizes: CompanySize[] = ["10–50", "50–200", "200–500", "500–1 000", "1 000–5 000", "+5 000"];

export const eventTypes = [
  "Séminaire",
  "Convention",
  "Team building",
  "Incentive",
  "Conférence",
  "Salon professionnel",
  "Lancement produit",
  "Voyage corporate",
  "Réunion de direction",
  "Anniversaire entreprise",
];

export const defaultKeywords = [
  "annual meeting",
  "company retreat",
  "international convention",
  "incentive travel",
  "corporate event",
  "product launch",
  "team building",
];

const contactPool: Contact[] = [
  { id: "c-1", name: "Sophie Martin", role: "Event Manager", influence: "Décideur principal", score: 92, email: "s.martin@example.com" },
  { id: "c-2", name: "Julien Bernard", role: "Marketing Director", influence: "Influenceur", score: 85, email: "j.bernard@example.com" },
  { id: "c-3", name: "Sarah Dupont", role: "HR Director", influence: "Influenceur", score: 78, email: "s.dupont@example.com" },
  { id: "c-4", name: "Nadia El Amrani", role: "Head of Communications", influence: "Décideur principal", score: 90, email: "n.elamrani@example.com" },
  { id: "c-5", name: "Marc Leclerc", role: "General Manager", influence: "Sponsor potentiel", score: 82, email: "m.leclerc@example.com" },
  { id: "c-6", name: "Clara Hoffmann", role: "People Director", influence: "Influenceur", score: 80, email: "c.hoffmann@example.com" },
  { id: "c-7", name: "Thomas Moreau", role: "Sales Director", influence: "Décideur principal", score: 88, email: "t.moreau@example.com" },
  { id: "c-8", name: "Elena Rossi", role: "Brand Director", influence: "Influenceur", score: 83, email: "e.rossi@example.com" },
  { id: "c-9", name: "Romain Petit", role: "Office Manager", influence: "Contact opérationnel", score: 71, email: "r.petit@example.com" },
  { id: "c-10", name: "Amine Kadiri", role: "Regional Director", influence: "Décideur principal", score: 87, email: "a.kadiri@example.com" },
  { id: "c-11", name: "Laura Fischer", role: "Corporate Events Lead", influence: "Décideur principal", score: 91, email: "l.fischer@example.com" },
  { id: "c-12", name: "Pierre Lambert", role: "Chief Commercial Officer", influence: "Sponsor potentiel", score: 84, email: "p.lambert@example.com" },
  { id: "c-13", name: "Isabelle Nguyen", role: "Talent Acquisition Lead", influence: "Influenceur", score: 77, email: "i.nguyen@example.com" },
  { id: "c-14", name: "Victor Garcia", role: "Marketing Manager", influence: "Contact opérationnel", score: 73, email: "v.garcia@example.com" },
  { id: "c-15", name: "Leila Mansouri", role: "Executive Assistant", influence: "Contact opérationnel", score: 74, email: "l.mansouri@example.com" },
  { id: "c-16", name: "Hugo Vidal", role: "Transformation Director", influence: "Influenceur", score: 81, email: "h.vidal@example.com" },
  { id: "c-17", name: "Camille Robert", role: "Communication Director", influence: "Décideur principal", score: 89, email: "c.robert@example.com" },
  { id: "c-18", name: "Adam Wilson", role: "EMEA Operations Director", influence: "Sponsor potentiel", score: 86, email: "a.wilson@example.com" },
  { id: "c-19", name: "Marta Kowalska", role: "HR Business Partner", influence: "Influenceur", score: 76, email: "m.kowalska@example.com" },
  { id: "c-20", name: "Yasmine Benali", role: "Travel & Events Manager", influence: "Décideur principal", score: 93, email: "y.benali@example.com" },
];

const rows = [
  ["Nova Pharma", "France", "Paris", "Pharmaceutique", "500–1 000", "Convention", "Convention internationale", "Expansion internationale", 94, "Priorité A", "2026-09-21", "3–6 mois", "Marrakech, Maroc", 820],
  ["TechVision Europe", "Espagne", "Madrid", "Technologie", "1 000–5 000", "Team building", "Team Building EMEA", "Croissance rapide des effectifs", 91, "Priorité A", "2026-09-20", "90 jours", "Marrakech, Maroc", 1240],
  ["Finora Group", "Belgique", "Bruxelles", "Finance", "500–1 000", "Séminaire", "Séminaire direction", "Nouvelle direction", 89, "À contacter", "2026-09-19", "60 jours", "Agadir, Maroc", 730],
  ["Luxe & Co", "France", "Paris", "Luxe", "200–500", "Lancement produit", "Lancement produit", "Lancement d’une nouvelle gamme", 87, "À qualifier", "2026-09-18", "90 jours", "Marrakech, Maroc", 420],
  ["Atlas Automotive Europe", "Allemagne", "Berlin", "Automobile", "+5 000", "Convention", "Convention réseau distributeurs", "Nouvelle implantation internationale", 86, "En cours", "2026-09-18", "6 mois", "Casablanca, Maroc", 6400],
  ["MedicaNova", "Suisse", "Genève", "Pharmaceutique", "200–500", "Conférence", "Conférence scientifique", "Participation à un salon", 84, "Priorité A", "2026-09-17", "90 jours", "Marrakech, Maroc", 390],
  ["GreenTech Solutions", "Pays-Bas", "Amsterdam", "Énergie", "500–1 000", "Incentive", "Incentive commercial", "Levée de fonds", 83, "Priorité A", "2026-09-17", "6 mois", "Essaouira, Maroc", 680],
  ["Vertex Consulting", "Royaume-Uni", "Londres", "Conseil", "1 000–5 000", "Réunion de direction", "Réunion de direction Europe", "Fusion / acquisition", 81, "Priorité A", "2026-09-16", "60 jours", "Marrakech, Maroc", 1800],
  ["Digital Horizon", "France", "Lyon", "Technologie", "200–500", "Team building", "Retraite équipe produit", "Recrutement massif", 78, "Priorité B", "2026-09-15", "30 jours", "Taghazout, Maroc", 310],
  ["Altura Finance", "Espagne", "Barcelone", "Finance", "500–1 000", "Séminaire", "Séminaire managers", "Nouvelle stratégie RH", 77, "À contacter", "2026-09-14", "90 jours", "Marrakech, Maroc", 760],
  ["BioHealth Europe", "Belgique", "Bruxelles", "Pharmaceutique", "1 000–5 000", "Convention", "Convention commerciale", "Croissance rapide des effectifs", 82, "Priorité A", "2026-09-14", "6 mois", "Marrakech, Maroc", 1480],
  ["Nexa Retail", "France", "Marseille", "Retail", "500–1 000", "Anniversaire entreprise", "Anniversaire entreprise", "Communication autour d’un événement corporate", 74, "À qualifier", "2026-09-13", "12 mois", "Agadir, Maroc", 620],
  ["Solaris Energy", "Émirats arabes unis", "Dubaï", "Énergie", "1 000–5 000", "Conférence", "Conférence partenaires", "Expansion internationale", 88, "Priorité A", "2026-09-13", "90 jours", "Marrakech, Maroc", 2100],
  ["Apex Technologies", "Allemagne", "Berlin", "Technologie", "500–1 000", "Salon professionnel", "Salon innovation", "Participation à un salon", 69, "À qualifier", "2026-09-12", "60 jours", "Casablanca, Maroc", 910],
  ["Prime Insurance", "Royaume-Uni", "Londres", "Assurance", "1 000–5 000", "Séminaire", "Séminaire réseau", "Nouvelle direction", 72, "En cours", "2026-09-12", "6 mois", "Marrakech, Maroc", 1640],
  ["BlueWave Consulting", "France", "Paris", "Conseil", "200–500", "Voyage corporate", "Voyage corporate", "Nouvelle stratégie RH", 66, "À contacter", "2026-09-11", "90 jours", "Essaouira, Maroc", 280],
  ["EuroMed Solutions", "Italie", "Milan", "Industrie", "500–1 000", "Convention", "Convention fournisseurs", "Nouvelle implantation internationale", 79, "Priorité B", "2026-09-11", "6 mois", "Casablanca, Maroc", 870],
  ["Global Retail Partners", "Pays-Bas", "Amsterdam", "Retail", "+5 000", "Lancement produit", "Lancement collection Europe", "Lancement d’une nouvelle gamme", 80, "Priorité A", "2026-09-10", "90 jours", "Marrakech, Maroc", 5600],
  ["Visionary Labs", "Suisse", "Genève", "Technologie", "50–200", "Team building", "Team building R&D", "Recrutement massif", 58, "À qualifier", "2026-09-10", "30 jours", "Taghazout, Maroc", 140],
  ["Urban Mobility Group", "Allemagne", "Berlin", "Automobile", "1 000–5 000", "Conférence", "Conférence mobilité", "Participation à un salon", 76, "En cours", "2026-09-09", "6 mois", "Marrakech, Maroc", 2300],
  ["Helio Foods", "Espagne", "Barcelone", "Agroalimentaire", "200–500", "Incentive", "Incentive forces de vente", "Croissance rapide des effectifs", 71, "À contacter", "2026-09-09", "90 jours", "Agadir, Maroc", 360],
  ["Quantum Assurance", "France", "Lyon", "Assurance", "500–1 000", "Réunion de direction", "Comité exécutif", "Nouvelle direction", 63, "À qualifier", "2026-09-08", "60 jours", "Marrakech, Maroc", 540],
  ["Meridian Telecom", "Royaume-Uni", "Londres", "Télécommunications", "+5 000", "Convention", "Convention internationale", "Fusion / acquisition", 85, "Priorité A", "2026-09-08", "6 mois", "Casablanca, Maroc", 7200],
  ["Orion Capital", "Belgique", "Bruxelles", "Finance", "200–500", "Séminaire", "Séminaire investisseurs", "Levée de fonds", 82, "Priorité A", "2026-09-07", "90 jours", "Marrakech, Maroc", 290],
  ["Maison Aurelia", "France", "Paris", "Luxe", "50–200", "Lancement produit", "Lancement collection privée", "Lancement d’une nouvelle gamme", 64, "À qualifier", "2026-09-07", "60 jours", "Marrakech, Maroc", 130],
  ["Vega Industries", "Italie", "Milan", "Industrie", "1 000–5 000", "Salon professionnel", "Salon distributeurs", "Participation à un salon", 61, "Archivée", "2026-09-06", "12 mois", "Casablanca, Maroc", 1900],
  ["CloudNine Retail", "Allemagne", "Berlin", "Retail", "200–500", "Team building", "Retraite commerciale", "Recrutement massif", 59, "À qualifier", "2026-09-06", "90 jours", "Agadir, Maroc", 270],
  ["Everest Advisory", "Suisse", "Genève", "Conseil", "500–1 000", "Séminaire", "Séminaire partenaires", "Expansion internationale", 73, "À contacter", "2026-09-05", "6 mois", "Marrakech, Maroc", 690],
  ["Falcon Motors", "Émirats arabes unis", "Dubaï", "Automobile", "+5 000", "Incentive", "Incentive concessionnaires", "Nouvelle implantation internationale", 90, "Priorité A", "2026-09-05", "6 mois", "Marrakech, Maroc", 6100],
  ["Cedra Energy", "Arabie Saoudite", "Riyad", "Énergie", "1 000–5 000", "Conférence", "Conférence leadership", "Nouvelle stratégie RH", 75, "En cours", "2026-09-04", "12 mois", "Casablanca, Maroc", 2400],
  ["BrightCom", "Pays-Bas", "Amsterdam", "Télécommunications", "500–1 000", "Convention", "Convention clients", "Communication autour d’un événement corporate", 68, "À contacter", "2026-09-04", "90 jours", "Marrakech, Maroc", 790],
  ["Northstar Pharma", "Royaume-Uni", "Londres", "Pharmaceutique", "1 000–5 000", "Convention", "Convention médicale", "Participation à un salon", 92, "Priorité A", "2026-09-03", "6 mois", "Marrakech, Maroc", 1700],
] as const;

export const initialOpportunities: Opportunity[] = rows.map((row, index) => {
  const [company, country, city, sector, size, eventType, opportunity, signal, score, status, detectedAt, horizon, destination, employees] = row;
  const fallbackContact: Contact = { id: "c-fallback", name: "Sophie Martin", role: "Event Manager", influence: "Décideur principal", score: 92, email: "s.martin@example.com" };
  const baseContacts: Contact[] = [
    contactPool[index % contactPool.length] ?? fallbackContact,
    contactPool[(index + 5) % contactPool.length] ?? fallbackContact,
    contactPool[(index + 9) % contactPool.length] ?? fallbackContact,
  ];
  return {
    id: `opp-${index + 1}`,
    company,
    country,
    city,
    sector,
    size,
    eventType,
    opportunity,
    signal,
    score,
    status,
    detectedAt,
    horizon,
    destination,
    website: `www.${company.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "").slice(0, 18)}.example`,
    employees,
    locations: Array.from(new Set([country, "Maroc", index % 2 === 0 ? "Espagne" : "Belgique"])),
    summary: `${company} présente plusieurs signaux indiquant un potentiel besoin événementiel à court ou moyen terme. L’entreprise est suivie pour ${signal.toLowerCase()} et un besoin de type ${opportunity.toLowerCase()} semble probable sur l’horizon ${horizon}.`,
    scoreReasons: [
      { label: "Secteur prioritaire", points: sector === "Pharmaceutique" || sector === "Finance" || sector === "Technologie" || sector === "Luxe" ? 20 : 12 },
      { label: "Pays prioritaire", points: ["France", "Belgique", "Espagne", "Royaume-Uni", "Émirats arabes unis"].includes(country) ? 15 : 10 },
      { label: "Entreprise > 200", points: employees > 200 ? 15 : 6 },
      { label: "Signal événementiel récent", points: score > 80 ? 25 : 16 },
      { label: "Décideur identifié", points: 15 },
      { label: "Dimension internationale", points: employees > 500 ? 10 : 5 },
    ],
    timeline: [
      { date: "Il y a 4 jours", text: signal },
      { date: "Il y a 12 jours", text: `Renforcement des équipes ${sector.toLowerCase()} sur la zone ${country}` },
      { date: "Il y a 18 jours", text: "Publication liée à une nouvelle priorité commerciale" },
      { date: "Il y a 25 jours", text: `Prise de parole autour d’un projet ${eventType.toLowerCase()}` },
    ],
    contacts: baseContacts.map((contact, cIndex) => ({ ...contact, id: `${contact.id}-${index}-${cIndex}` })),
    notes: index % 4 === 0 ? ["À relancer après validation du ciblage prioritaire."] : [],
  };
});

export const initialProspects: Prospect[] = [
  ...initialOpportunities.slice(0, 25).map((opp, index) => ({
    id: `pro-${index + 1}`,
    company: opp.company,
    country: opp.country,
    city: opp.city,
    sector: opp.sector,
    size: opp.size,
    decisionMakers: opp.contacts.length + (index % 3),
    opportunities: index % 5 === 0 ? 2 : 1,
    potentialScore: Math.min(99, opp.score + (index % 7) - 3),
    lastAnalysis: index < 8 ? "il y a 12 min" : index < 16 ? "aujourd’hui" : "hier",
    watched: index % 2 === 0,
    archived: false,
  })),
  { id: "pro-26", company: "Kairo Events Holding", country: "Émirats arabes unis", city: "Dubaï", sector: "Conseil", size: "200–500", decisionMakers: 2, opportunities: 0, potentialScore: 57, lastAnalysis: "hier", watched: true, archived: false },
  { id: "pro-27", company: "Alpine MedTech", country: "Suisse", city: "Genève", sector: "Pharmaceutique", size: "500–1 000", decisionMakers: 4, opportunities: 0, potentialScore: 71, lastAnalysis: "il y a 2 jours", watched: false, archived: false },
  { id: "pro-28", company: "Omnia Retail", country: "France", city: "Paris", sector: "Retail", size: "1 000–5 000", decisionMakers: 3, opportunities: 0, potentialScore: 62, lastAnalysis: "il y a 3 jours", watched: true, archived: false },
  { id: "pro-29", company: "Baltic Advisory", country: "Pays-Bas", city: "Amsterdam", sector: "Finance", size: "50–200", decisionMakers: 1, opportunities: 0, potentialScore: 54, lastAnalysis: "il y a 4 jours", watched: false, archived: false },
  { id: "pro-30", company: "Cobalt Motors", country: "Allemagne", city: "Berlin", sector: "Automobile", size: "+5 000", decisionMakers: 5, opportunities: 0, potentialScore: 79, lastAnalysis: "il y a 5 jours", watched: true, archived: false },
];

export const initialSources: WatchSource[] = [
  { id: "s-1", name: "Sites corporate", description: "Pages actualités, communiqués et recrutements publiés par les entreprises cibles.", active: true, signals: 42, analyzed: "12 min", volume: "312 sites suivis" },
  { id: "s-2", name: "Actualités entreprises", description: "Presse économique et annonces de croissance, levées de fonds ou nominations.", active: true, signals: 36, analyzed: "12 min", volume: "184 sources analysées" },
  { id: "s-3", name: "Réseaux sociaux professionnels", description: "Signaux publics autour des équipes, nominations et événements corporate.", active: true, signals: 28, analyzed: "18 min", volume: "96 flux surveillés" },
  { id: "s-4", name: "Communiqués de presse", description: "Annonces officielles d’expansion, produits, partenariats et salons.", active: true, signals: 24, analyzed: "22 min", volume: "71 sources actives" },
  { id: "s-5", name: "Offres d’emploi", description: "Détection des recrutements massifs et créations de pôles régionaux.", active: true, signals: 31, analyzed: "27 min", volume: "448 offres analysées" },
  { id: "s-6", name: "Salons professionnels", description: "Participation ou prise de parole à des salons B2B européens et MENA.", active: true, signals: 19, analyzed: "33 min", volume: "54 calendriers suivis" },
  { id: "s-7", name: "Médias économiques", description: "Articles sur investissements, croissance, opérations M&A et stratégie RH.", active: false, signals: 12, analyzed: "2 h", volume: "38 médias suivis" },
  { id: "s-8", name: "Bases entreprises", description: "Données de taille, secteur, implantations et évolution des effectifs.", active: true, signals: 47, analyzed: "45 min", volume: "1 248 entreprises" },
  { id: "s-9", name: "Pages carrières", description: "Suivi des campagnes RH indiquant un besoin de cohésion ou d’intégration.", active: true, signals: 22, analyzed: "1 h", volume: "210 pages analysées" },
  { id: "s-10", name: "Calendriers sectoriels", description: "Échéances congrès, salons, conférences et lancements de produit.", active: false, signals: 9, analyzed: "3 h", volume: "26 calendriers" },
];

export const initialKeywords: Keyword[] = [
  { id: "k-1", keyword: "annual meeting", category: "Convention", language: "EN", occurrences: 28, active: true },
  { id: "k-2", keyword: "séminaire entreprise", category: "Séminaire", language: "FR", occurrences: 41, active: true },
  { id: "k-3", keyword: "company retreat", category: "Team building", language: "EN", occurrences: 17, active: true },
  { id: "k-4", keyword: "international convention", category: "Convention", language: "EN", occurrences: 23, active: true },
  { id: "k-5", keyword: "incentive travel", category: "Incentive", language: "EN", occurrences: 19, active: true },
  { id: "k-6", keyword: "corporate event", category: "Corporate", language: "EN", occurrences: 34, active: true },
  { id: "k-7", keyword: "product launch", category: "Lancement produit", language: "EN", occurrences: 21, active: true },
  { id: "k-8", keyword: "team building", category: "Team building", language: "EN", occurrences: 37, active: true },
  { id: "k-9", keyword: "voyage corporate", category: "Voyage corporate", language: "FR", occurrences: 12, active: true },
  { id: "k-10", keyword: "réunion de direction", category: "Direction", language: "FR", occurrences: 16, active: true },
  { id: "k-11", keyword: "anniversaire entreprise", category: "Anniversaire", language: "FR", occurrences: 11, active: false },
  { id: "k-12", keyword: "sales kickoff", category: "Convention", language: "EN", occurrences: 15, active: true },
  { id: "k-13", keyword: "executive seminar", category: "Séminaire", language: "EN", occurrences: 9, active: true },
  { id: "k-14", keyword: "dealer convention", category: "Convention", language: "EN", occurrences: 8, active: false },
  { id: "k-15", keyword: "retreat management", category: "Séminaire", language: "EN", occurrences: 13, active: true },
];

export const initialAlerts: AlertRule[] = [
  { id: "a-1", name: "Priorité A détectée", condition: "Score >= 80", channel: "Plateforme + Email", recipient: "Sophie Martin", active: true },
  { id: "a-2", name: "Nouvelle opportunité Pharma en France", condition: "Secteur = Pharma · Pays = France", channel: "Plateforme", recipient: "Équipe commerciale", active: true },
  { id: "a-3", name: "Nouvelle opportunité Convention / Incentive", condition: "Événement = Convention ou Incentive", channel: "Email", recipient: "Sophie Martin", active: true },
  { id: "a-4", name: "Signal expansion internationale", condition: "Signal contient expansion", channel: "Plateforme", recipient: "Business Development", active: true },
  { id: "a-5", name: "Décideur identifié score élevé", condition: "Contact >= 85 %", channel: "Plateforme", recipient: "Sophie Martin", active: false },
  { id: "a-6", name: "Lancement produit luxe", condition: "Secteur = Luxe · Événement = Lancement produit", channel: "Email", recipient: "Direction commerciale", active: true },
  { id: "a-7", name: "Pays prioritaire MENA", condition: "Pays = EAU ou Arabie Saoudite", channel: "Plateforme", recipient: "Pôle international", active: true },
  { id: "a-8", name: "Score en hausse", condition: "Progression score > 10", channel: "Email", recipient: "Sophie Martin", active: false },
  { id: "a-9", name: "Nouveau salon détecté", condition: "Signal = Participation salon", channel: "Plateforme", recipient: "Veille", active: true },
  { id: "a-10", name: "Entreprise +5 000 collaborateurs", condition: "Taille = +5 000", channel: "Email", recipient: "Key accounts", active: true },
];

export const chart30Days = [
  { day: "J-29", value: 7 }, { day: "J-25", value: 11 }, { day: "J-21", value: 9 }, { day: "J-17", value: 16 },
  { day: "J-13", value: 19 }, { day: "J-9", value: 22 }, { day: "J-5", value: 31 }, { day: "Aujourd’hui", value: 48 },
];

export const eventDistribution = [
  { name: "Séminaire", value: 28 },
  { name: "Convention", value: 21 },
  { name: "Team building", value: 18 },
  { name: "Incentive", value: 15 },
  { name: "Conférence", value: 10 },
  { name: "Lancement produit", value: 8 },
];

export const countryBars = [
  { country: "France", value: 15 },
  { country: "Espagne", value: 9 },
  { country: "Belgique", value: 7 },
  { country: "Royaume-Uni", value: 6 },
  { country: "Allemagne", value: 5 },
  { country: "Émirats arabes unis", value: 4 },
];

export const scoreCriteria = [
  { id: "sc-1", label: "Secteur prioritaire", points: 20 },
  { id: "sc-2", label: "Pays prioritaire", points: 15 },
  { id: "sc-3", label: "Taille entreprise > 200", points: 15 },
  { id: "sc-4", label: "Signal événementiel récent", points: 25 },
  { id: "sc-5", label: "Décideur identifié", points: 15 },
  { id: "sc-6", label: "Dimension internationale", points: 10 },
];

export const targetConfig = {
  countries: ["France", "Belgique", "Espagne", "Royaume-Uni", "Émirats arabes unis"],
  cities: ["Paris", "Lyon", "Bruxelles", "Madrid", "Barcelone", "Londres", "Dubaï"],
  sectors: ["Pharma", "Finance", "Tech", "Luxe", "Automobile"],
  sizes: ["200–500", "500–1 000", "1 000–5 000", "+5 000"],
};

export function scoreStatus(score: number): OpportunityStatus {
  if (score >= 80) return "Priorité A";
  if (score >= 60) return "Priorité B";
  return "À qualifier";
}
