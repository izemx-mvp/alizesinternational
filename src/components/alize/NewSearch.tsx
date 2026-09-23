import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Plus, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { companySizes, countries, cities, defaultKeywords, eventTypes, sectors } from "@/lib/alize-data";
import { Breadcrumbs, MultiSelectChips, PageHeader, ProcessTimeline, Surface } from "./Primitives";

const steps = [
  "Analyse des critères",
  "Identification des entreprises correspondant à la cible",
  "Analyse des signaux événementiels",
  "Recherche des décideurs potentiels",
  "Qualification des opportunités",
  "Calcul du scoring",
];
const progressValues = [0, 20, 42, 68, 85, 100];

export function NewSearchPage() {
  const navigate = useNavigate();
  const [selectedCountries, setSelectedCountries] = useState(["France", "Espagne"]);
  const [selectedCities, setSelectedCities] = useState(["Paris", "Madrid", "Dubaï"]);
  const [selectedSectors, setSelectedSectors] = useState(["Pharmaceutique", "Technologie", "Finance", "Luxe"]);
  const [selectedSizes, setSelectedSizes] = useState(["200–500", "500–1 000"]);
  const [selectedEvents, setSelectedEvents] = useState(["Convention", "Team building", "Lancement produit"]);
  const [horizon, setHorizon] = useState("90 jours");
  const [keywords, setKeywords] = useState(defaultKeywords);
  const [newKeyword, setNewKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    const timers = steps.map((_, index) => window.setTimeout(() => setStep(index), 550 + index * 650));
    return () => timers.forEach(window.clearTimeout);
  }, [open]);

  const progress = progressValues[step] ?? 0;
  const done = step === steps.length - 1;
  const summary = useMemo(() => [
    `${selectedCountries.length} pays`, `${selectedCities.length} villes`, `${selectedSectors.length} secteurs`,
    `Entreprises : ${selectedSizes.join(", ") || "+200 employés"}`, `${selectedEvents.length} types d’événements`, `Horizon : ${horizon}`,
  ], [horizon, selectedCities.length, selectedCountries.length, selectedEvents.length, selectedSectors.length, selectedSizes]);

  const reset = () => {
    setSelectedCountries([]); setSelectedCities([]); setSelectedSectors([]); setSelectedSizes([]); setSelectedEvents([]); setHorizon("90 jours"); setKeywords(defaultKeywords);
    toast.success("Ciblage réinitialisé");
  };

  const addKeyword = () => {
    const clean = newKeyword.trim();
    if (!clean || keywords.includes(clean)) return;
    setKeywords((items) => [...items, clean]); setNewKeyword("");
  };

  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Nouvelle recherche" }]} />
      <PageHeader title="Nouvelle prospection événementielle" subtitle="Définissez votre cible et laissez l’agent IA identifier les opportunités événementielles les plus pertinentes." />
      <Surface className="mb-6 ai-sheen"><ProcessTimeline compact /></Surface>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Surface className="space-y-6">
          <Criteria title="Marchés / Pays"><MultiSelectChips options={countries} value={selectedCountries} onChange={setSelectedCountries} /></Criteria>
          <Criteria title="Villes"><MultiSelectChips options={cities} value={selectedCities} onChange={setSelectedCities} /></Criteria>
          <Criteria title="Secteurs d’activité"><MultiSelectChips options={sectors} value={selectedSectors} onChange={setSelectedSectors} /></Criteria>
          <Criteria title="Taille d’entreprise"><MultiSelectChips options={companySizes} value={selectedSizes} onChange={setSelectedSizes} /></Criteria>
          <Criteria title="Types d’événement"><MultiSelectChips options={eventTypes} value={selectedEvents} onChange={setSelectedEvents} /></Criteria>
          <Criteria title="Horizon">
            <Select value={horizon} onValueChange={setHorizon}><SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger><SelectContent>{["30 jours", "60 jours", "90 jours", "6 mois", "12 mois"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
          </Criteria>
          <Criteria title="Mots-clés">
            <div className="flex gap-2"><Input value={newKeyword} onChange={(event) => setNewKeyword(event.target.value)} placeholder="Ajouter un mot-clé" onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addKeyword(); } }} /><Button type="button" variant="outline" onClick={addKeyword}><Plus />Ajouter</Button></div>
            <div className="mt-3 flex flex-wrap gap-2">{keywords.map((keyword) => <span key={keyword} className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{keyword}<button type="button" onClick={() => setKeywords((items) => items.filter((item) => item !== keyword))} aria-label={`Supprimer ${keyword}`}><X className="size-3" /></button></span>)}</div>
          </Criteria>
        </Surface>
        <aside className="space-y-4">
          <Surface className="sticky top-24">
            <h2 className="font-display text-lg font-semibold">Votre ciblage</h2>
            <div className="mt-4 space-y-3">{summary.map((item) => <div key={item} className="flex items-center gap-3 rounded-lg bg-panel-soft p-3 text-sm"><CheckCircle2 className="size-4 text-ai" />{item}</div>)}</div>
            <div className="mt-6 grid gap-3"><Button size="lg" onClick={() => setOpen(true)}><Sparkles />Lancer la recherche IA</Button><Button size="lg" variant="outline" onClick={reset}>Réinitialiser</Button></div>
          </Surface>
        </aside>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader><DialogTitle>Recherche IA en cours</DialogTitle><DialogDescription>Simulation locale des étapes d’analyse de prospection événementielle.</DialogDescription></DialogHeader>
          <div className="space-y-5">
            <Progress value={progress} className="h-3" />
            <div className="text-center font-display text-3xl font-semibold text-primary">{progress} %</div>
            <div className="space-y-2">{steps.map((item, index) => <div key={item} className="flex items-center gap-3 rounded-lg bg-panel-soft p-3 text-sm"><CheckCircle2 className={index <= step ? "size-4 text-success" : "size-4 text-muted-foreground"} /><span className={index <= step ? "font-medium text-foreground" : "text-muted-foreground"}>{item}</span></div>)}</div>
            {done ? <div className="rounded-xl border bg-accent p-4 text-accent-foreground"><p className="font-semibold">Analyse terminée</p><p className="mt-1 text-sm">24 opportunités identifiées · 7 opportunités Priorité A · 18 décideurs identifiés</p></div> : null}
          </div>
          <DialogFooter>{done ? <Button onClick={() => navigate({ to: "/opportunites" })}>Afficher les résultats</Button> : <Button disabled><Search className="animate-pulse" />Analyse</Button>}</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Criteria({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2 className="mb-3 font-display text-base font-semibold">{title}</h2>{children}</div>;
}
