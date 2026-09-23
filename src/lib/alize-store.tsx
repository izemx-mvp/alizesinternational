import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  initialAlerts,
  initialKeywords,
  initialOpportunities,
  initialProspects,
  initialSources,
  scoreCriteria,
  targetConfig,
  type AlertRule,
  type Keyword,
  type Opportunity,
  type OpportunityStatus,
  type Prospect,
  type WatchSource,
} from "./alize-data";

type TargetSection = keyof typeof targetConfig;

type Store = {
  opportunities: Opportunity[];
  prospects: Prospect[];
  sources: WatchSource[];
  keywords: Keyword[];
  alerts: AlertRule[];
  scoring: typeof scoreCriteria;
  targeting: Record<TargetSection, { label: string; active: boolean }[]>;
  setOpportunityStatus: (id: string, status: OpportunityStatus) => void;
  addOpportunityNote: (id: string, note: string) => void;
  archiveMany: (ids: string[]) => void;
  setManyStatus: (ids: string[], status: OpportunityStatus) => void;
  toggleSource: (id: string) => void;
  toggleKeyword: (id: string) => void;
  addKeyword: (keyword: Omit<Keyword, "id" | "occurrences">) => void;
  setScoringPoint: (id: string, points: number) => void;
  addTarget: (section: TargetSection, label: string) => void;
  removeTarget: (section: TargetSection, label: string) => void;
  toggleTarget: (section: TargetSection, label: string) => void;
  addAlert: (alert: Omit<AlertRule, "id" | "active">) => void;
  toggleAlert: (id: string) => void;
  updateProspect: (id: string, patch: Partial<Prospect>) => void;
};

const AlizeStoreContext = createContext<Store | null>(null);

export function AlizeStoreProvider({ children }: { children: ReactNode }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [prospects, setProspects] = useState<Prospect[]>(initialProspects);
  const [sources, setSources] = useState<WatchSource[]>(initialSources);
  const [keywords, setKeywords] = useState<Keyword[]>(initialKeywords);
  const [alerts, setAlerts] = useState<AlertRule[]>(initialAlerts);
  const [scoring, setScoring] = useState(scoreCriteria);
  const [targeting, setTargeting] = useState<Store["targeting"]>(() => ({
    countries: targetConfig.countries.map((label) => ({ label, active: true })),
    cities: targetConfig.cities.map((label) => ({ label, active: true })),
    sectors: targetConfig.sectors.map((label) => ({ label, active: true })),
    sizes: targetConfig.sizes.map((label) => ({ label, active: true })),
  }));

  const value = useMemo<Store>(() => ({
    opportunities,
    prospects,
    sources,
    keywords,
    alerts,
    scoring,
    targeting,
    setOpportunityStatus: (id, status) => {
      setOpportunities((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
      toast.success(`Statut mis à jour : ${status}`);
    },
    addOpportunityNote: (id, note) => {
      const clean = note.trim();
      if (!clean) return;
      setOpportunities((items) => items.map((item) => (item.id === id ? { ...item, notes: [clean, ...item.notes] } : item)));
      toast.success("Note ajoutée à l’opportunité");
    },
    archiveMany: (ids) => {
      setOpportunities((items) => items.map((item) => (ids.includes(item.id) ? { ...item, status: "Archivée" } : item)));
      toast.success(`${ids.length} opportunité${ids.length > 1 ? "s" : ""} archivée${ids.length > 1 ? "s" : ""}`);
    },
    setManyStatus: (ids, status) => {
      setOpportunities((items) => items.map((item) => (ids.includes(item.id) ? { ...item, status } : item)));
      toast.success(`${ids.length} opportunité${ids.length > 1 ? "s" : ""} passée${ids.length > 1 ? "s" : ""} en ${status}`);
    },
    toggleSource: (id) => setSources((items) => items.map((item) => (item.id === id ? { ...item, active: !item.active } : item))),
    toggleKeyword: (id) => setKeywords((items) => items.map((item) => (item.id === id ? { ...item, active: !item.active } : item))),
    addKeyword: (keyword) => {
      setKeywords((items) => [{ id: `k-${Date.now()}`, occurrences: 0, ...keyword }, ...items]);
      toast.success("Mot-clé ajouté");
    },
    setScoringPoint: (id, points) => setScoring((items) => items.map((item) => (item.id === id ? { ...item, points } : item))),
    addTarget: (section, label) => {
      const clean = label.trim();
      if (!clean) return;
      setTargeting((current) => ({ ...current, [section]: [{ label: clean, active: true }, ...current[section]] }));
      toast.success("Critère ajouté");
    },
    removeTarget: (section, label) => setTargeting((current) => ({ ...current, [section]: current[section].filter((item) => item.label !== label) })),
    toggleTarget: (section, label) => setTargeting((current) => ({
      ...current,
      [section]: current[section].map((item) => (item.label === label ? { ...item, active: !item.active } : item)),
    })),
    addAlert: (alert) => {
      setAlerts((items) => [{ id: `a-${Date.now()}`, active: true, ...alert }, ...items]);
      toast.success("Alerte créée en mode simulation");
    },
    toggleAlert: (id) => setAlerts((items) => items.map((item) => (item.id === id ? { ...item, active: !item.active } : item))),
    updateProspect: (id, patch) => setProspects((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item))),
  }), [alerts, keywords, opportunities, prospects, scoring, sources, targeting]);

  return <AlizeStoreContext.Provider value={value}>{children}</AlizeStoreContext.Provider>;
}

export function useAlizeStore() {
  const store = useContext(AlizeStoreContext);
  if (!store) throw new Error("useAlizeStore must be used inside AlizeStoreProvider");
  return store;
}
