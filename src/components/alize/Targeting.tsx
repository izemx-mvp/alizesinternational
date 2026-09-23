import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAlizeStore } from "@/lib/alize-store";
import { Breadcrumbs, PageHeader, Surface } from "./Primitives";

type SectionKey = "countries" | "cities" | "sectors" | "sizes";
const labels: Record<SectionKey, string> = {
  countries: "Pays prioritaires",
  cities: "Villes prioritaires",
  sectors: "Secteurs prioritaires",
  sizes: "Tailles prioritaires",
};

export function TargetingPage() {
  const { targeting, addTarget, removeTarget, toggleTarget } = useAlizeStore();
  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Ciblage prioritaire" }]} />
      <PageHeader title="Ciblage prioritaire" subtitle="Paramètres locaux qui orientent la qualification des opportunités événementielles." />
      <div className="grid gap-5 md:grid-cols-2">
        {(Object.keys(labels) as SectionKey[]).map((section) => <TargetSection key={section} title={labels[section]} items={targeting[section]} onAdd={(label) => addTarget(section, label)} onRemove={(label) => removeTarget(section, label)} onToggle={(label) => toggleTarget(section, label)} />)}
      </div>
    </div>
  );
}

function TargetSection({ title, items, onAdd, onRemove, onToggle }: { title: string; items: { label: string; active: boolean }[]; onAdd: (label: string) => void; onRemove: (label: string) => void; onToggle: (label: string) => void }) {
  const [value, setValue] = useState("");
  return <Surface><h2 className="font-display text-lg font-semibold">{title}</h2><div className="mt-4 flex gap-2"><Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ajouter" /><Button variant="outline" onClick={() => { onAdd(value); setValue(""); }}><Plus />Ajouter</Button></div><div className="mt-4 space-y-2">{items.map((item) => <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3"><div><p className="font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.active ? "Actif" : "Désactivé"}</p></div><div className="flex items-center gap-2"><Switch checked={item.active} onCheckedChange={() => onToggle(item.label)} /><Button variant="ghost" size="icon" onClick={() => onRemove(item.label)} aria-label={`Supprimer ${item.label}`}><Trash2 className="size-4" /></Button></div></div>)}</div></Surface>;
}
