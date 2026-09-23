import { Calculator, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAlizeStore } from "@/lib/alize-store";
import { Breadcrumbs, PageHeader, StatusBadge, Surface } from "./Primitives";

export function ScoringPage() {
  const { scoring, setScoringPoint } = useAlizeStore();
  const total = scoring.reduce((sum, item) => sum + item.points, 0);
  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Grille de scoring" }]} />
      <PageHeader title="Grille de scoring" subtitle="Configurez les critères utilisés par l’agent pour prioriser les opportunités." />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Surface><h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold"><SlidersHorizontal className="size-5 text-primary" />Critères</h2><div className="space-y-3">{scoring.map((item) => <div key={item.id} className="grid items-center gap-3 rounded-xl border bg-card p-4 md:grid-cols-[1fr_130px]"><div><p className="font-semibold">{item.label}</p><p className="text-sm text-muted-foreground">Poids utilisé dans la qualification simulée.</p></div><Input type="number" value={item.points} min={0} max={40} onChange={(e) => setScoringPoint(item.id, Number(e.target.value))} /></div>)}</div></Surface>
        <Surface className="ai-sheen"><h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold"><Calculator className="size-5 text-primary" />Simulation de score</h2><p className="font-semibold">Nova Pharma</p><div className="mt-4 space-y-2">{scoring.map((item) => <div key={item.id} className="flex items-center justify-between rounded-lg bg-card p-3 text-sm"><span>{item.label}</span><span className="font-semibold text-primary">+{item.points}</span></div>)}</div><div className="mt-4 rounded-xl bg-primary p-5 text-primary-foreground"><p className="text-sm opacity-90">TOTAL</p><p className="font-display text-4xl font-semibold">{Math.min(100, total)} / 100</p></div><div className="mt-5 space-y-2"><Rule range="80–100" label="Priorité A" /><Rule range="60–79" label="Priorité B" /><Rule range="0–59" label="À qualifier" /></div></Surface>
      </div>
    </div>
  );
}
function Rule({ range, label }: { range: string; label: string }) { return <div className="flex items-center justify-between rounded-lg bg-card p-3 text-sm"><span>{range}</span><StatusBadge status={label} /></div>; }
