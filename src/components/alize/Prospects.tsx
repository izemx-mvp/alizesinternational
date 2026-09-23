import { Building2, Eye, FilePlus2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries, sectors, companySizes } from "@/lib/alize-data";
import { useAlizeStore } from "@/lib/alize-store";
import { Breadcrumbs, PageHeader, ScoreBadge, StatCard, StatusBadge, Surface, tableWrap, td, th } from "./Primitives";

export function ProspectsPage() {
  const { prospects, updateProspect } = useAlizeStore();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [sector, setSector] = useState("all");
  const [size, setSize] = useState("all");
  const [score, setScore] = useState("all");
  const [hasOpportunity, setHasOpportunity] = useState("all");
  const filtered = useMemo(() => prospects
    .filter((item) => item.company.toLowerCase().includes(query.toLowerCase()))
    .filter((item) => country === "all" || item.country === country)
    .filter((item) => sector === "all" || item.sector === sector)
    .filter((item) => size === "all" || item.size === size)
    .filter((item) => score === "all" || item.potentialScore >= Number(score))
    .filter((item) => hasOpportunity === "all" || (hasOpportunity === "yes" ? item.opportunities > 0 : item.opportunities === 0)),
    [country, hasOpportunity, prospects, query, score, sector, size]);

  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Prospects" }]} />
      <PageHeader title="Prospects" subtitle="Base des entreprises détectées, y compris celles sans opportunité confirmée." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Entreprises surveillées" value="163" icon={Building2} /><StatCard label="Opportunités actives" value="48" icon={FilePlus2} delay={80} /><StatCard label="Décideurs identifiés" value="72" icon={Eye} delay={140} /><StatCard label="Nouveaux cette semaine" value="26" icon={Search} delay={200} /></div>
      <Surface className="my-5"><div className="grid gap-3 lg:grid-cols-6"><Input placeholder="Recherche entreprise" value={query} onChange={(e) => setQuery(e.target.value)} /><Filter value={country} onValueChange={setCountry} placeholder="Pays" options={countries} /><Filter value={sector} onValueChange={setSector} placeholder="Secteur" options={sectors} /><Filter value={size} onValueChange={setSize} placeholder="Taille" options={companySizes} /><Filter value={score} onValueChange={setScore} placeholder="Score" options={["50", "60", "70", "80"]} labels={{ "50": ">= 50", "60": ">= 60", "70": ">= 70", "80": ">= 80" }} /><Filter value={hasOpportunity} onValueChange={setHasOpportunity} placeholder="Opportunité" options={["yes", "no"]} labels={{ yes: "Oui", no: "Non" }} /></div></Surface>
      <div className={tableWrap}><table className="w-full border-collapse"><thead><tr className="border-b bg-panel-soft"><th className={th}>Entreprise</th><th className={th}>Pays</th><th className={th}>Ville</th><th className={th}>Secteur</th><th className={th}>Taille</th><th className={th}>Décideurs</th><th className={th}>Opportunités</th><th className={th}>Score potentiel</th><th className={th}>Dernière analyse</th><th className={th}>Actions</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id} className="border-b transition hover:bg-secondary"><td className={td}><span className="font-semibold text-foreground">{item.company}</span></td><td className={td}>{item.country}</td><td className={td}>{item.city}</td><td className={td}>{item.sector}</td><td className={td}>{item.size}</td><td className={td}>{item.decisionMakers}</td><td className={td}>{item.opportunities ? <StatusBadge status={`${item.opportunities} active${item.opportunities > 1 ? "s" : ""}`} /> : "—"}</td><td className={td}><ScoreBadge score={item.potentialScore} /></td><td className={td}>{item.lastAnalysis}</td><td className={td}><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => toast("Fiche entreprise simulée")}>Voir entreprise</Button><Button size="sm" variant="outline" onClick={() => toast.success("Opportunité créée en simulation")}>Créer opportunité</Button><Button size="sm" variant="ghost" onClick={() => updateProspect(item.id, { watched: !item.watched })}>{item.watched ? "Surveillé" : "Surveiller"}</Button><Button size="sm" variant="ghost" onClick={() => updateProspect(item.id, { archived: true })}>Archiver</Button></div></td></tr>)}</tbody></table></div>
    </div>
  );
}

function Filter({ value, onValueChange, placeholder, options, labels }: { value: string; onValueChange: (value: string) => void; placeholder: string; options: string[]; labels?: Record<string, string> }) {
  return <Select value={value} onValueChange={onValueChange}><SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent><SelectItem value="all">{placeholder}</SelectItem>{options.map((item) => <SelectItem key={item} value={item}>{labels?.[item] ?? item}</SelectItem>)}</SelectContent></Select>;
}
