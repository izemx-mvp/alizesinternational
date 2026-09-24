import { useAuth } from "@/lib/alize-auth";
import { Activity, DatabaseZap, Power, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAlizeStore } from "@/lib/alize-store";
import { Breadcrumbs, PageHeader, StatCard, StatusBadge, Surface } from "./Primitives";

export function WatchSourcesPage() {
  const { can } = useAuth();
  const { sources, toggleSource } = useAlizeStore();
  const active = sources.filter((item) => item.active).length;
  const signals = sources.reduce((sum, item) => sum + item.signals, 0);
  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Sources de veille" }]} />
      <PageHeader title="Sources de veille" subtitle="Sources simulées utilisées par l’agent IA pour détecter les signaux événementiels." />
      <div className="mb-6 grid gap-4 md:grid-cols-3"><StatCard label="Sources actives" value={String(active)} icon={Power} /><StatCard label="Signaux cette semaine" value={String(signals)} icon={Radar} delay={80} /><StatCard label="Dernière analyse" value="12" detail="minutes" icon={Activity} delay={140} /></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{sources.map((source) => <Surface key={source.id} className="hover-lift"><div className="flex items-start justify-between gap-4"><div className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><DatabaseZap className="size-5" /></div><Switch disabled={!can("targeting")} checked={source.active} onCheckedChange={() => toggleSource(source.id)} aria-label={`Activer ${source.name}`} /></div><h2 className="mt-4 font-display text-lg font-semibold">{source.name}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{source.description}</p><div className="mt-4 flex flex-wrap gap-2"><StatusBadge status={source.active ? "Actif" : "Inactif"} /><span className="rounded-md bg-panel-soft px-2.5 py-1 text-xs font-semibold text-muted-foreground">{source.signals} signaux</span></div><div className="mt-4 rounded-xl bg-panel-soft p-3 text-sm text-muted-foreground"><p>{source.volume}</p><p>Dernière analyse : {source.analyzed}</p></div><Button className="mt-4 w-full" variant="outline" onClick={() => toggleSource(source.id)}>{source.active ? "Désactiver" : "Activer"}</Button></Surface>)}</div>
    </div>
  );
}
