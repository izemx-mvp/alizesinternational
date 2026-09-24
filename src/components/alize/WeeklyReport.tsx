import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, CalendarDays, ChevronLeft, ChevronRight, FileDown, Loader2, Printer, RefreshCw, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { syntheses, topOpps, weeks, type WeekReport } from "@/lib/alize-report";
import { Breadcrumbs, PageHeader, ScoreBadge, SkeletonRows, StatusBadge, Surface, tableWrap, td, th } from "./Primitives";

const palette = ["var(--primary)", "var(--ai)", "var(--success)", "var(--warning)", "var(--destructive)", "var(--muted-foreground)"];
const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const filterOptions = {
  country: ["France", "Espagne", "Belgique", "Royaume-Uni", "Émirats arabes unis", "Allemagne"],
  sector: ["Pharmaceutique", "Technologie", "Finance", "Luxe", "Automobile"],
  event: ["Convention", "Séminaire", "Team Building", "Incentive", "Lancement produit", "Conférence"],
  owner: ["Claire Dubois", "Thomas Bernard", "Emma Laurent"],
  status: ["Priorité A", "À contacter", "En cours", "À qualifier"],
};
type Filters = Record<keyof typeof filterOptions, string>;
const noFilters: Filters = { country: "all", sector: "all", event: "all", owner: "all", status: "all" };

function applyFilters(w: WeekReport, fl: Filters): WeekReport {
  let k = 1;
  if (fl.country !== "all") k *= fl.country === "France" ? 0.45 : 0.16;
  if (fl.sector !== "all") k *= fl.sector === "Pharmaceutique" ? 0.3 : 0.2;
  if (fl.event !== "all") k *= fl.event === "Convention" ? 0.34 : 0.2;
  if (fl.owner !== "all") k *= fl.owner === "Claire Dubois" ? 0.42 : 0.3;
  if (fl.status !== "all") k *= 0.5;
  if (k === 1) return w;
  const s = (n: number) => Math.max(0, Math.round(n * k));
  const sk = <T extends Record<string, number>>(o: T) => Object.fromEntries(Object.entries(o).map(([a, b]) => [a, s(b)])) as T;
  return {
    ...w,
    kpis: sk(w.kpis),
    prev: sk(w.prev),
    funnel: w.funnel.map((v, i) => (i < 2 ? v : s(v))),
    daily: w.daily.map(s),
    countries: w.countries.filter((c) => fl.country === "all" || c.name === fl.country).map((c) => ({ ...c, value: fl.country === "all" ? s(c.value) : w.kpis.newOpps ? s(w.kpis.newOpps) : 0 })),
    sectors: fl.sector === "all" ? w.sectors : [{ name: fl.sector, value: 100 }],
    events: w.events.filter((e) => fl.event === "all" || e.name === fl.event).map((e) => ({ ...e, value: Math.max(fl.event === "all" ? 0 : 1, s(e.value)) })),
    team: w.team.filter((t) => fl.owner === "all" || t.name === fl.owner),
  };
}

export function WeeklyReportPage() {
  const navigate = useNavigate();
  const [weekIndex, setWeekIndex] = useState(weeks.length - 1);
  const [filters, setFilters] = useState<Filters>(noFilters);
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState(0);
  const [regenerating, setRegenerating] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => { setLoading(true); const t = window.setTimeout(() => setLoading(false), 450); return () => window.clearTimeout(t); }, [weekIndex, filters]);

  const week = useMemo(() => applyFilters(weeks[weekIndex] ?? weeks[0]!, filters), [filters, weekIndex]);
  const opps = topOpps.filter((o) => (filters.country === "all" || o.country === filters.country) && (filters.sector === "all" || o.sector === filters.sector) && (filters.event === "all" || o.event === filters.event) && (filters.owner === "all" || o.owner === filters.owner) && (filters.status === "all" || o.status === filters.status));
  const setFilter = (key: keyof Filters, v: string) => { setFilters((f) => ({ ...f, [key]: v })); toast("Filtres appliqués."); };
  const regenerate = () => { setRegenerating(true); window.setTimeout(() => { setVariant((v) => (v + 1) % syntheses.length); setRegenerating(false); toast.success("Nouvelle synthèse IA générée."); }, 1400); };
  const exportPdf = () => {
    setExporting(true);
    toast.loading("Génération du rapport...", { id: "pdf" });
    window.setTimeout(() => { setExporting(false); toast.success("Rapport hebdomadaire généré avec succès.", { id: "pdf", description: "Choisissez « Enregistrer au format PDF » dans la fenêtre d’impression." }); window.print(); }, 1300);
  };
  const toOpps = (search: { status?: string; country?: string }) => navigate({ to: "/opportunites", search });

  const kpiDefs: { key: keyof WeekReport["kpis"]; label: string; tip: string; onClick?: () => void; pct?: boolean }[] = [
    { key: "newOpps", label: "Nouvelles opportunités", tip: "Opportunités créées par l’agent IA cette semaine", onClick: () => toOpps({}), pct: true },
    { key: "prioA", label: "Priorité A", tip: "Opportunités avec un score ≥ 80", onClick: () => toOpps({ status: "Priorité A" }) },
    { key: "newProspects", label: "Nouveaux prospects", tip: "Entreprises ajoutées à la surveillance", onClick: () => navigate({ to: "/prospects" }), pct: true },
    { key: "contacted", label: "Prospects contactés", tip: "Premier contact commercial effectué", onClick: () => toOpps({ status: "À contacter" }) },
    { key: "inProgress", label: "Passées en cours", tip: "Opportunités en discussion active", onClick: () => toOpps({ status: "En cours" }) },
    { key: "closed", label: "Opportunités closes", tip: "Opportunités gagnées ou archivées", onClick: () => toOpps({ status: "Archivée" }) },
  ];
  const funnelLabels = ["Entreprises analysées", "Entreprises retenues", "Signaux pertinents", "Opportunités créées", "Priorité A", "Prospects contactés", "Opportunités en cours"];
  const topCountry = [...week.countries].sort((a, b) => b.value - a.value)[0];
  const maxEvent = Math.max(1, ...week.events.map((e) => e.value));

  return (
    <div className="page-fade print:p-0">
      <Breadcrumbs items={[{ label: "Rapport hebdomadaire" }]} />
      <PageHeader title="Rapport hebdomadaire" subtitle="Analyse synthétique de l’activité de prospection et des opportunités détectées durant la semaine." action={
        <div className="flex flex-wrap gap-2 print:hidden">
          <Button variant="outline" onClick={() => window.print()}><Printer />Imprimer</Button>
          <Button onClick={exportPdf} disabled={exporting}>{exporting ? <Loader2 className="animate-spin" /> : <FileDown />}{exporting ? "Génération du rapport..." : "Exporter PDF"}</Button>
        </div>
      } />

      <Surface className="mb-5 print:hidden">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" disabled={weekIndex === 0} onClick={() => setWeekIndex((i) => i - 1)}><ChevronLeft />Semaine précédente</Button>
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"><CalendarDays className="size-4" />{weeks[weekIndex]?.label}</div>
            <Button variant="outline" size="sm" disabled={weekIndex === weeks.length - 1} onClick={() => setWeekIndex((i) => i + 1)}>Semaine suivante<ChevronRight /></Button>
            <Button variant="ghost" size="sm" onClick={() => setWeekIndex(weeks.length - 1)}>Cette semaine</Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <FSel value={filters.country} ph="Pays" opts={filterOptions.country} on={(v) => setFilter("country", v)} />
            <FSel value={filters.sector} ph="Secteur" opts={filterOptions.sector} on={(v) => setFilter("sector", v)} />
            <FSel value={filters.event} ph="Type événement" opts={filterOptions.event} on={(v) => setFilter("event", v)} />
            <FSel value={filters.owner} ph="Commercial" opts={filterOptions.owner} on={(v) => setFilter("owner", v)} />
            <FSel value={filters.status} ph="Statut" opts={filterOptions.status} on={(v) => setFilter("status", v)} />
            <Button variant="ghost" onClick={() => { setFilters(noFilters); toast("Filtres réinitialisés."); }}><RotateCcw />Réinitialiser</Button>
          </div>
        </div>
      </Surface>

      <Surface className="mb-6 ai-sheen border-ai/30">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-ai text-ai-foreground shadow-panel"><BrainCircuit className="size-6" /></div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-semibold">Synthèse IA de la semaine</h2><Button size="sm" variant="outline" onClick={regenerate} disabled={regenerating} className="print:hidden"><RefreshCw className={regenerating ? "animate-spin" : ""} />Régénérer la synthèse</Button></div>
            {regenerating || loading ? <div className="mt-3 space-y-2">{[92, 100, 84, 60].map((w) => <div key={w} className="h-3 animate-pulse rounded bg-ai/20" style={{ width: `${w}%` }} />)}</div> : <p key={variant + weekIndex} className="page-fade mt-3 whitespace-pre-line text-sm leading-7 text-foreground">{syntheses[variant]?.(week)}</p>}
          </div>
        </div>
      </Surface>

      {loading ? <div className="mb-6"><SkeletonRows /></div> : (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {kpiDefs.map((d, i) => {
            const v = week.kpis[d.key]; const p = week.prev[d.key]; const diff = v - p;
            const trend = d.pct && p ? `${diff >= 0 ? "+" : ""}${Math.round((diff / p) * 100)} %` : `${diff >= 0 ? "+" : ""}${diff}`;
            return (
              <Tooltip key={d.key}>
                <TooltipTrigger asChild>
                  <button onClick={d.onClick} className="hover-lift animate-fade-in rounded-xl border bg-card p-4 text-left shadow-card" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">{d.label}</p>
                    <Counter value={v} />
                    <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${diff >= 0 ? "text-success" : "text-destructive"}`}>{diff >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}{trend} <span className="font-normal text-muted-foreground">vs sem. préc.</span></p>
                  </button>
                </TooltipTrigger>
                <TooltipContent>{d.tip}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      )}

      <Surface className="mb-6">
        <h2 className="mb-4 font-semibold">Performance de la prospection</h2>
        <div className="overflow-x-auto"><div className="grid min-w-[860px] grid-cols-7 gap-2">
          {week.funnel.map((v, i) => (
            <div key={i} className="relative rounded-xl border bg-panel-soft p-3 transition hover:border-primary">
              <p className="text-[11px] font-semibold uppercase leading-4 text-muted-foreground">{funnelLabels[i]}</p>
              <p className="mt-2 font-display text-2xl font-semibold">{v}</p>
              <div className="mt-3 h-1.5 rounded-full bg-secondary"><div className="h-1.5 rounded-full bg-primary transition-all duration-700" style={{ width: `${Math.max(8, 100 - i * 13)}%` }} /></div>
              {i < 6 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 size-5 -translate-y-1/2 rounded-full bg-card p-0.5 text-primary" /> : null}
            </div>
          ))}
        </div></div>
      </Surface>

      <div className="mb-6 grid gap-6 xl:grid-cols-3">
        <Surface>
          <h2 className="mb-4 font-semibold">Opportunités détectées cette semaine</h2>
          <div className="h-64"><ResponsiveContainer><BarChart data={week.daily.map((v, i) => ({ day: days[i], value: v }))}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} /><XAxis dataKey="day" fontSize={12} stroke="var(--muted-foreground)" /><YAxis allowDecimals={false} fontSize={12} stroke="var(--muted-foreground)" /><RTooltip cursor={{ fill: "var(--secondary)" }} formatter={(v) => [v, "Opportunités"]} /><Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </Surface>
        <Surface>
          <h2 className="mb-4 font-semibold">Opportunités par marché</h2>
          <div className="h-64"><ResponsiveContainer><BarChart data={week.countries} layout="vertical" margin={{ left: 30 }}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} /><XAxis type="number" allowDecimals={false} fontSize={12} stroke="var(--muted-foreground)" /><YAxis type="category" dataKey="name" width={110} fontSize={11} stroke="var(--muted-foreground)" /><RTooltip cursor={{ fill: "var(--secondary)" }} formatter={(v) => [v, "Opportunités"]} /><Bar dataKey="value" fill="var(--ai)" radius={[0, 6, 6, 0]} className="cursor-pointer" onClick={(d: { name?: string }) => d.name && toOpps({ country: d.name })} /></BarChart></ResponsiveContainer></div>
          <p className="text-xs text-muted-foreground">Cliquez sur un marché pour voir ses opportunités.</p>
        </Surface>
        <Surface>
          <h2 className="mb-4 font-semibold">Répartition par secteur</h2>
          <div className="h-64"><ResponsiveContainer><PieChart><Pie data={week.sectors} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>{week.sectors.map((s, i) => <Cell key={s.name} fill={palette[i % palette.length]} />)}</Pie><RTooltip formatter={(v) => [`${v} %`, "Part"]} /><Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} /></PieChart></ResponsiveContainer></div>
        </Surface>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Surface>
          <h2 className="mb-4 font-semibold">Typologies les plus détectées</h2>
          <div className="space-y-3">{week.events.map((e) => <div key={e.name}><div className="mb-1 flex justify-between text-sm"><span>{e.name}</span><span className="font-semibold">{e.value}</span></div><div className="h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-primary transition-all duration-700" style={{ width: `${(e.value / maxEvent) * 100}%` }} /></div></div>)}</div>
        </Surface>
        <Surface>
          <h2 className="mb-4 font-semibold">Faits marquants de la semaine</h2>
          <ul className="space-y-2.5 text-sm">
            <li><button className="hover:text-primary" onClick={() => toOpps({ status: "Priorité A" })}>🔥 {week.kpis.prioA} nouvelles opportunités Priorité A</button></li>
            <li>📈 {week.kpis.newOpps >= week.prev.newOpps ? "+" : ""}{week.prev.newOpps ? Math.round(((week.kpis.newOpps - week.prev.newOpps) / week.prev.newOpps) * 100) : 0} % d’opportunités détectées</li>
            <li><button className="hover:text-primary" onClick={() => toOpps({ country: topCountry?.name ?? "France" })}>🇫🇷 {topCountry?.name ?? "France"} : marché le plus actif</button></li>
            <li>💊 {week.sectors[0]?.name} : secteur dominant</li>
            <li>🎯 {week.events[0]?.name ?? "Convention"} : typologie événementielle principale</li>
            <li><Link to="/opportunites/$id" params={{ id: "opp-1" }} className="hover:text-primary">⭐ Nova Pharma : score le plus élevé de la semaine — 94/100</Link></li>
          </ul>
        </Surface>
        <Surface>
          <h2 className="mb-4 font-semibold">À suivre la semaine prochaine</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[`${Math.max(1, week.kpis.prioA - 2)} opportunités Priorité A n’ont pas encore été contactées.`, "3 prospects attendent une qualification complémentaire.", "Le secteur Technologie progresse de 18 %.", "2 opportunités sont en attente depuis plus de 7 jours."].map((t) => <li key={t} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" />{t}</li>)}
          </ul>
        </Surface>
      </div>

      <Surface className="mb-6">
        <h2 className="mb-4 font-semibold">Top opportunités de la semaine</h2>
        <div className={tableWrap}>
          <table className="w-full border-collapse">
            <thead><tr className="border-b bg-panel-soft">{["Entreprise", "Opportunité", "Pays", "Secteur", "Score", "Statut", "Commercial", "Action"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>{opps.length === 0 ? <tr><td colSpan={8} className="p-6 text-center text-sm text-muted-foreground">Aucune opportunité pour ces filtres.</td></tr> : opps.map((o) => (
              <tr key={o.id} className="border-b transition hover:bg-secondary/70">
                <td className={td}><Link to="/opportunites/$id" params={{ id: o.id }} className="font-semibold text-primary hover:underline">{o.company}</Link></td>
                <td className={td}>{o.opportunity}</td>
                <td className={td}><button className="hover:text-primary hover:underline" onClick={() => toOpps({ country: o.country })}>{o.country}</button></td>
                <td className={td}>{o.sector}</td>
                <td className={td}><ScoreBadge score={o.score} /></td>
                <td className={td}><StatusBadge status={o.status} /></td>
                <td className={td}><Link to="/utilisateurs/$id" params={{ id: o.ownerId }} className="hover:text-primary hover:underline">{o.owner}</Link></td>
                <td className={td}><Button asChild size="sm" variant="outline"><Link to="/opportunites/$id" params={{ id: o.id }}>Voir l’opportunité</Link></Button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Surface>

      <Surface>
        <h2 className="mb-4 font-semibold">Activité commerciale</h2>
        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <div className={tableWrap}>
            <table className="w-full border-collapse">
              <thead><tr className="border-b bg-panel-soft">{["Commercial", "Prospects traités", "Messages générés", "Opp. mises à jour", "Opp. en cours"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>{week.team.map((t) => <tr key={t.name} className="border-b transition hover:bg-secondary/70"><td className={td}><Link to="/utilisateurs/$id" params={{ id: t.userId }} className="font-semibold text-primary hover:underline">{t.name}</Link></td><td className={td}>{t.treated}</td><td className={td}>{t.messages}</td><td className={td}>{t.updated}</td><td className={td}>{t.inProgress}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="h-56"><ResponsiveContainer><BarChart data={week.team.map((t) => ({ ...t, name: t.name.split(" ")[0] }))}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} /><XAxis dataKey="name" fontSize={12} stroke="var(--muted-foreground)" /><YAxis allowDecimals={false} fontSize={12} stroke="var(--muted-foreground)" /><RTooltip cursor={{ fill: "var(--secondary)" }} /><Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} /><Bar dataKey="treated" name="Prospects" fill="var(--primary)" radius={[4, 4, 0, 0]} /><Bar dataKey="messages" name="Messages" fill="var(--ai)" radius={[4, 4, 0, 0]} /><Bar dataKey="updated" name="Mises à jour" fill="var(--warning)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
      </Surface>
    </div>
  );
}

function FSel({ value, ph, opts, on }: { value: string; ph: string; opts: string[]; on: (v: string) => void }) {
  return <Select value={value} onValueChange={on}><SelectTrigger className="min-w-[130px]"><SelectValue placeholder={ph} /></SelectTrigger><SelectContent><SelectItem value="all">{ph} : tous</SelectItem>{opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>;
}

function Counter({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => { let f = 0; const id = window.setInterval(() => { f += 1; setN(Math.round((value * f) / 20)); if (f >= 20) window.clearInterval(id); }, 25); return () => window.clearInterval(id); }, [value]);
  return <p className="mt-2 font-display text-3xl font-semibold">{n}</p>;
}
