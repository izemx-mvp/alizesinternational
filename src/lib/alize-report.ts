export type WeekReport = {
  label: string;
  kpis: { newOpps: number; prioA: number; newProspects: number; contacted: number; inProgress: number; closed: number };
  prev: { newOpps: number; prioA: number; newProspects: number; contacted: number; inProgress: number; closed: number };
  funnel: number[];
  daily: number[];
  countries: { name: string; value: number }[];
  sectors: { name: string; value: number }[];
  events: { name: string; value: number }[];
  team: { name: string; userId: string; treated: number; messages: number; updated: number; inProgress: number }[];
};

const labels = ["11 – 17 août 2026", "18 – 24 août 2026", "25 – 31 août 2026", "1 – 7 septembre 2026", "8 – 14 septembre 2026", "15 – 21 septembre 2026"];
const f = [0.62, 0.71, 0.66, 0.8, 0.84, 1];
const base = { newOpps: 18, prioA: 7, newProspects: 26, contacted: 14, inProgress: 9, closed: 3 };
const scale = (n: number, k: number) => Math.max(0, Math.round(n * k));
const wobble = (i: number, j: number) => 1 + (((i * 7 + j * 13) % 9) - 4) / 20;

function kpisFor(i: number) {
  if (i < 0) return { newOpps: 10, prioA: 3, newProspects: 15, contacted: 7, inProgress: 5, closed: 1 };
  const k = f[i] ?? 1;
  return Object.fromEntries(Object.entries(base).map(([key, v], j) => [key, i === 5 ? v : scale(v, k * wobble(i, j))])) as WeekReport["kpis"];
}

export const weeks: WeekReport[] = labels.map((label, i) => {
  const k = f[i] ?? 1;
  const kp = kpisFor(i);
  const prev = i === 5 ? { newOpps: 15, prioA: 5, newProspects: 24, contacted: 12, inProgress: 8, closed: 4 } : kpisFor(i - 1);
  return {
    label,
    kpis: kp,
    prev,
    funnel: [486, 92, 54, kp.newOpps, kp.prioA, kp.contacted, kp.inProgress].map((v, j) => (j < 3 ? scale(v, k * wobble(i, j)) : v)),
    daily: i === 5 ? [2, 4, 3, 5, 3, 1, 0] : [2, 4, 3, 5, 3, 1, 0].map((v, j) => scale(v, k * wobble(i, j + 2))),
    countries: [["France", 8], ["Espagne", 3], ["Belgique", 2], ["Royaume-Uni", 2], ["Émirats arabes unis", 2], ["Allemagne", 1]].map(([name, v], j) => ({ name: String(name), value: i === 5 ? Number(v) : Math.max(1, scale(Number(v), k * wobble(i, j))) })),
    sectors: [["Pharmaceutique", 28], ["Technologie", 22], ["Finance", 17], ["Luxe", 11], ["Automobile", 11], ["Autres", 11]].map(([name, v], j) => ({ name: String(name), value: i === 5 ? Number(v) : Math.max(4, Math.round(Number(v) * wobble(i, j))) })),
    events: [["Convention", 6], ["Séminaire", 4], ["Team Building", 3], ["Incentive", 2], ["Lancement produit", 2], ["Conférence", 1]].map(([name, v], j) => ({ name: String(name), value: i === 5 ? Number(v) : Math.max(1, scale(Number(v), k * wobble(i, j + 1))) })),
    team: [
      { name: "Claire Dubois", userId: "u-3", treated: 12, messages: 8, updated: 14, inProgress: 4 },
      { name: "Thomas Bernard", userId: "u-2", treated: 9, messages: 6, updated: 11, inProgress: 3 },
      { name: "Emma Laurent", userId: "u-5", treated: 7, messages: 5, updated: 8, inProgress: 2 },
    ].map((t, j) => i === 5 ? t : { ...t, treated: scale(t.treated, k * wobble(i, j)), messages: scale(t.messages, k * wobble(i, j + 1)), updated: scale(t.updated, k * wobble(i, j + 2)), inProgress: scale(t.inProgress, k * wobble(i, j + 3)) }),
  };
});

export const topOpps = [
  { id: "opp-1", company: "Nova Pharma", opportunity: "Convention internationale", country: "France", sector: "Pharmaceutique", event: "Convention", score: 94, status: "À contacter", owner: "Claire Dubois", ownerId: "u-3" },
  { id: "opp-2", company: "TechVision Europe", opportunity: "Team Building", country: "Espagne", sector: "Technologie", event: "Team Building", score: 91, status: "En cours", owner: "Thomas Bernard", ownerId: "u-2" },
  { id: "opp-3", company: "Finora Group", opportunity: "Séminaire de direction", country: "Belgique", sector: "Finance", event: "Séminaire", score: 89, status: "À contacter", owner: "Claire Dubois", ownerId: "u-3" },
  { id: "opp-4", company: "MedicaNova", opportunity: "Conférence scientifique", country: "France", sector: "Pharmaceutique", event: "Conférence", score: 86, status: "Priorité A", owner: "Emma Laurent", ownerId: "u-5" },
  { id: "opp-5", company: "Lumière Luxe", opportunity: "Incentive VIP", country: "Émirats arabes unis", sector: "Luxe", event: "Incentive", score: 83, status: "À qualifier", owner: "Thomas Bernard", ownerId: "u-2" },
  { id: "opp-6", company: "AutoNext", opportunity: "Lancement produit", country: "Allemagne", sector: "Automobile", event: "Lancement produit", score: 81, status: "En cours", owner: "Emma Laurent", ownerId: "u-5" },
];

export const syntheses = [
  (w: WeekReport) => `Cette semaine, l’agent de prospection a identifié ${w.kpis.newOpps} nouvelles opportunités, dont ${w.kpis.prioA} classées Priorité A. La France reste le marché générant le plus grand nombre d’opportunités, principalement dans les secteurs pharmaceutique et technologique. Les conventions et séminaires représentent les typologies événementielles les plus fréquemment détectées.\n\nNova Pharma, TechVision Europe et Finora Group figurent parmi les opportunités présentant actuellement le plus fort potentiel.`,
  (w: WeekReport) => `Semaine dynamique : ${w.kpis.newOpps} opportunités détectées et ${w.kpis.contacted} prospects contactés. Le secteur pharmaceutique confirme sa position de leader, porté par des projets de conventions internationales à fort budget. L’Espagne et la Belgique progressent nettement.\n\nPriorité recommandée : sécuriser un premier rendez-vous avec Nova Pharma avant la fin du mois et relancer Finora Group sur son séminaire de direction.`,
  (w: WeekReport) => `Synthèse exécutive : ${w.kpis.prioA} opportunités Priorité A nécessitent une action rapide. ${w.kpis.inProgress} dossiers sont passés en cours, signe d’une bonne conversion des signaux détectés. Les événements de type convention et team building dominent la demande, avec des destinations privilégiées au Maroc et en Europe du Sud.\n\nL’équipe commerciale gagnerait à concentrer ses efforts sur les comptes technologiques en forte croissance.`,
];
