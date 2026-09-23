import { Link } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Building2, CheckCircle2, PieChart as PieIcon, Radar, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countryBars, chart30Days, eventDistribution } from "@/lib/alize-data";
import { useAlizeStore } from "@/lib/alize-store";
import { PageHeader, ProcessTimeline, ScoreBadge, StatCard, StatusBadge, Surface, tableWrap, td, th } from "./Primitives";

const donutColors = ["var(--primary)", "var(--ai)", "var(--success)", "var(--warning)", "var(--muted-foreground)", "var(--secondary-foreground)"];

export function DashboardPage() {
  const { opportunities, prospects } = useAlizeStore();
  const priority = opportunities.filter((item) => item.status === "Priorité A").length;
  const toContact = opportunities.filter((item) => item.status === "À contacter").length;
  const top = [...opportunities].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="page-fade">
      <PageHeader
        title="Bonjour Sophie,"
        subtitle="Voici les nouvelles opportunités détectées par votre agent de prospection."
        action={<Button asChild><Link to="/nouvelle-recherche">Lancer une recherche <ArrowRight /></Link></Button>}
      />
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground"><span className="size-2 rounded-full bg-success" /> Agent IA actif</span>
        <span className="rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground">Dernière analyse : il y a 12 min</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Opportunités détectées" value="48" detail="+12 cette semaine" icon={Radar} />
        <StatCard label="Priorité A" value={String(priority)} detail="+4 cette semaine" icon={Target} delay={70} />
        <StatCard label="Nouveaux prospects" value="23" icon={Building2} delay={120} />
        <StatCard label="À contacter" value={String(toContact)} icon={CheckCircle2} delay={170} />
        <StatCard label="Taux de qualification" value="68 %" icon={TrendingUp} delay={220} />
      </div>

      <Surface className="mt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div><h2 className="font-display text-lg font-semibold">Processus de prospection IA</h2><p className="text-sm text-muted-foreground">De la cible au message commercial, chaque étape reste lisible.</p></div>
          <PieIcon className="size-5 text-primary" />
        </div>
        <ProcessTimeline />
      </Surface>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_.9fr]">
        <Surface>
          <h2 className="mb-4 font-display text-lg font-semibold">Opportunités détectées sur les 30 derniers jours</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart30Days}>
                <defs><linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.28}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--border)" }} />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fill="url(#lineFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Surface>
        <Surface>
          <h2 className="mb-4 font-display text-lg font-semibold">Répartition par type d’événement</h2>
          <div className="grid items-center gap-4 md:grid-cols-[220px_1fr] xl:grid-cols-1">
            <div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={eventDistribution} innerRadius={58} outerRadius={86} paddingAngle={3} dataKey="value">{eventDistribution.map((entry, index) => <Cell key={entry.name} fill={donutColors[index % donutColors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
            <div className="space-y-2">{eventDistribution.map((item, index) => <div key={item.name} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: donutColors[index % donutColors.length] }} />{item.name}</span><span className="font-semibold">{item.value} %</span></div>)}</div>
          </div>
        </Surface>
      </div>

      <Surface className="mt-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Opportunités par pays</h2>
        <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={countryBars}><XAxis dataKey="country" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--border)" }} /><Bar dataKey="value" radius={[8, 8, 0, 0]} fill="var(--ai)" /></BarChart></ResponsiveContainer></div>
      </Surface>

      <Surface className="mt-6">
        <div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-lg font-semibold">Opportunités prioritaires</h2><Button asChild variant="outline"><Link to="/opportunites">Voir toutes les opportunités</Link></Button></div>
        <div className={tableWrap}>
          <table className="w-full border-collapse"><thead><tr className="border-b bg-panel-soft"><th className={th}>Entreprise</th><th className={th}>Pays</th><th className={th}>Secteur</th><th className={th}>Opportunité</th><th className={th}>Score</th><th className={th}>Statut</th><th className={th}>Action</th></tr></thead><tbody>{top.map((opp) => <tr key={opp.id} className="border-b transition hover:bg-secondary"><td className={td}><Link to="/opportunites/$id" params={{ id: opp.id }} className="font-semibold text-primary">{opp.company}</Link></td><td className={td}>{opp.country}</td><td className={td}>{opp.sector}</td><td className={td}>{opp.opportunity}</td><td className={td}><ScoreBadge score={opp.score} /></td><td className={td}><StatusBadge status={opp.status} /></td><td className={td}><Button asChild size="sm" variant="outline"><Link to="/opportunites/$id" params={{ id: opp.id }}>Ouvrir</Link></Button></td></tr>)}</tbody></table>
        </div>
      </Surface>
    </div>
  );
}
