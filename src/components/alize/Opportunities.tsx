import { Link } from "@tanstack/react-router";
import { Archive, ArrowDownUp, CheckSquare, FileDown, Mail, MoreHorizontal, RotateCcw, Search, StickyNote } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { companySizes, countries, eventTypes, sectors, type Opportunity, type OpportunityStatus } from "@/lib/alize-data";
import { useAlizeStore } from "@/lib/alize-store";
import { Breadcrumbs, EmptyState, PageHeader, ScoreBadge, SkeletonRows, StatusBadge, Surface, tableWrap, td, th, usePageNumbers, useVisibleDelay } from "./Primitives";

type SortKey = "company" | "country" | "score" | "detectedAt" | "size";
type SortDirection = "asc" | "desc";

const statusTabs: { label: string; value: "all" | OpportunityStatus }[] = [
  { label: "Toutes", value: "all" },
  { label: "Priorité A", value: "Priorité A" },
  { label: "À qualifier", value: "À qualifier" },
  { label: "À contacter", value: "À contacter" },
  { label: "En cours", value: "En cours" },
  { label: "Archivées / closes", value: "Archivée" },
];

export function OpportunitiesPage() {
  const { opportunities, setOpportunityStatus, addOpportunityNote, archiveMany, setManyStatus } = useAlizeStore();
  const visible = useVisibleDelay();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [city, setCity] = useState("all");
  const [sector, setSector] = useState("all");
  const [size, setSize] = useState("all");
  const [eventType, setEventType] = useState("all");
  const [status, setStatus] = useState<"all" | OpportunityStatus>("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [noteFor, setNoteFor] = useState<Opportunity | null>(null);
  const [note, setNote] = useState("");
  const [messageFor, setMessageFor] = useState<Opportunity | null>(null);

  const cities = useMemo(() => Array.from(new Set(opportunities.map((item) => item.city))).sort(), [opportunities]);
  const filtered = useMemo(() => {
    const now = new Date("2026-09-23").getTime();
    return opportunities
      .filter((item) => item.company.toLowerCase().includes(query.toLowerCase()))
      .filter((item) => country === "all" || item.country === country)
      .filter((item) => city === "all" || item.city === city)
      .filter((item) => sector === "all" || item.sector === sector)
      .filter((item) => size === "all" || item.size === size)
      .filter((item) => eventType === "all" || item.eventType === eventType)
      .filter((item) => status === "all" || item.status === status)
      .filter((item) => item.score >= minScore && item.score <= maxScore)
      .filter((item) => {
        if (dateFilter === "all") return true;
        const diff = (now - new Date(item.detectedAt).getTime()) / 86400000;
        return dateFilter === "7" ? diff <= 7 : diff <= 30;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const result = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), "fr");
        return sortDir === "asc" ? result : -result;
      });
  }, [city, country, dateFilter, eventType, maxScore, minScore, opportunities, query, sector, size, sortDir, sortKey, status]);
  const pages = usePageNumbers(filtered.length, pageSize);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allOnPage = pageItems.length > 0 && pageItems.every((item) => selected.includes(item.id));

  const counts = useMemo(() => statusTabs.map((tab) => ({ ...tab, count: tab.value === "all" ? opportunities.length : opportunities.filter((item) => item.status === tab.value).length })), [opportunities]);

  const reset = () => { setQuery(""); setCountry("all"); setCity("all"); setSector("all"); setSize("all"); setEventType("all"); setStatus("all"); setDateFilter("all"); setMinScore(0); setMaxScore(100); setPage(1); };
  const toggleSort = (key: SortKey) => { setSortKey(key); setSortDir(sortKey === key && sortDir === "desc" ? "asc" : "desc"); };
  const toggleSelect = (id: string) => setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const selectPage = () => {
    setSelected(allOnPage ? [] : pageItems.map((item) => item.id));
    if (!allOnPage) toast.success(`${pageItems.length} opportunités sélectionnées`);
  };

  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Opportunités" }]} />
      <PageHeader title="Opportunités" subtitle="Opportunités détectées et qualifiées par votre agent IA." />
      <div className="mb-5 flex flex-wrap gap-2">{counts.map((tab) => <Button key={tab.value} variant={status === tab.value ? "default" : "outline"} size="sm" onClick={() => { setStatus(tab.value); setPage(1); }}>{tab.label} {tab.count}</Button>)}</div>

      <Surface className="mb-5">
        <div className="grid gap-3 lg:grid-cols-4 xl:grid-cols-6">
          <div className="relative lg:col-span-2"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Recherche entreprise" className="pl-9" /></div>
          <FilterSelect value={country} onValueChange={setCountry} placeholder="Pays" options={countries} />
          <FilterSelect value={city} onValueChange={setCity} placeholder="Ville" options={cities} />
          <FilterSelect value={sector} onValueChange={setSector} placeholder="Secteur" options={sectors} />
          <FilterSelect value={size} onValueChange={setSize} placeholder="Taille" options={companySizes} />
          <FilterSelect value={eventType} onValueChange={setEventType} placeholder="Type événement" options={eventTypes} />
          <FilterSelect value={dateFilter} onValueChange={setDateFilter} placeholder="Date" options={["7", "30"]} labels={{ "7": "7 derniers jours", "30": "30 derniers jours" }} />
          <Input type="number" value={minScore} min={0} max={100} onChange={(e) => setMinScore(Number(e.target.value))} placeholder="Score min" />
          <Input type="number" value={maxScore} min={0} max={100} onChange={(e) => setMaxScore(Number(e.target.value))} placeholder="Score max" />
          <Button variant="outline" onClick={() => toast("Plus de filtres activés en simulation")}>Plus de filtres</Button>
          <Button variant="ghost" onClick={reset}><RotateCcw />Réinitialiser</Button>
        </div>
      </Surface>

      {selected.length > 0 ? <Surface className="mb-5 flex flex-wrap items-center justify-between gap-3 bg-secondary"><div className="font-semibold text-secondary-foreground">{selected.length} opportunité{selected.length > 1 ? "s" : ""} sélectionnée{selected.length > 1 ? "s" : ""}</div><div className="flex flex-wrap gap-2"><Button size="sm" onClick={() => setManyStatus(selected, "Priorité A")}><CheckSquare />Ajouter à Priorité A</Button><Button size="sm" variant="outline" onClick={() => setManyStatus(selected, "En cours")}>Changer le statut</Button><Button size="sm" variant="outline" onClick={() => archiveMany(selected)}><Archive />Archiver</Button><Button size="sm" variant="outline" onClick={() => toast.success("Export de la sélection généré en simulation")}><FileDown />Exporter sélection</Button></div></Surface> : null}

      {!visible ? <SkeletonRows /> : (
        <div className={tableWrap}>
          <table className="w-full border-collapse">
            <thead><tr className="border-b bg-panel-soft"><th className={th}><Checkbox checked={allOnPage} onCheckedChange={selectPage} /></th>{[["Entreprise", "company"], ["Pays", "country"], ["Taille", "size"], ["Score", "score"], ["Date", "detectedAt"]].map(([label, key]) => <th key={key} className={th}><Button variant="ghost" size="sm" onClick={() => toggleSort(key as SortKey)}>{label}<ArrowDownUp className="size-3" /></Button></th>)}<th className={th}>Opportunité</th><th className={th}>Ville</th><th className={th}>Secteur</th><th className={th}>Signal détecté</th><th className={th}>Statut</th><th className={th}>Actions</th></tr></thead>
            <tbody>{pageItems.map((opp) => <tr key={opp.id} className="border-b transition hover:bg-secondary/70"><td className={td}><Checkbox checked={selected.includes(opp.id)} onCheckedChange={() => toggleSelect(opp.id)} /></td><td className={td}><Link to="/opportunites/$id" params={{ id: opp.id }} className="font-semibold text-primary hover:underline">{opp.company}</Link></td><td className={td}>{opp.country}</td><td className={td}>{opp.size}</td><td className={td}><ScoreBadge score={opp.score} /></td><td className={td}>{formatDate(opp.detectedAt)}</td><td className={td}>{opp.opportunity}</td><td className={td}>{opp.city}</td><td className={td}>{opp.sector}</td><td className="min-w-[220px] px-4 py-3 text-sm text-muted-foreground">{opp.signal}</td><td className={td}><StatusBadge status={opp.status} /></td><td className={td}><RowActions opp={opp} onStatus={setOpportunityStatus} onNote={() => { setNoteFor(opp); setNote(""); }} onMessage={() => setMessageFor(opp)} /></td></tr>)}</tbody>
          </table>
          {pageItems.length === 0 ? <EmptyState label="Aucune opportunité ne correspond aux filtres." /> : null}
        </div>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div className="text-sm text-muted-foreground">{filtered.length} résultats</div><div className="flex items-center gap-2"><Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent>{[10, 25, 50].map((item) => <SelectItem key={item} value={String(item)}>{item} / page</SelectItem>)}</SelectContent></Select>{pages.slice(0, 3).map((item) => <Button key={item} size="sm" variant={page === item ? "default" : "outline"} onClick={() => setPage(item)}>{item}</Button>)}<Button size="sm" variant="outline" disabled={page >= pages.length} onClick={() => setPage((p) => p + 1)}>Suivant</Button></div></div>

      <Dialog open={Boolean(noteFor)} onOpenChange={(next) => !next && setNoteFor(null)}><DialogContent><DialogHeader><DialogTitle>Ajouter une note</DialogTitle><DialogDescription>{noteFor?.company}</DialogDescription></DialogHeader><Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note commerciale..." /><DialogFooter><Button variant="outline" onClick={() => setNoteFor(null)}>Fermer</Button><Button onClick={() => { if (noteFor) addOpportunityNote(noteFor.id, note); setNoteFor(null); }}>Enregistrer</Button></DialogFooter></DialogContent></Dialog>
      <Dialog open={Boolean(messageFor)} onOpenChange={(next) => !next && setMessageFor(null)}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>Message généré</DialogTitle><DialogDescription>{messageFor?.company}</DialogDescription></DialogHeader>{messageFor ? <div className="rounded-xl bg-panel-soft p-4 text-sm leading-7">Bonjour,<br /><br />Je me permets de vous contacter suite aux signaux récents observés autour de {messageFor.company}, notamment {messageFor.signal.toLowerCase()}. ALIZÉ INTERNATIONAL accompagne les équipes dans l’organisation de {messageFor.eventType.toLowerCase()} premium au Maroc, avec une approche clé en main pour les directions commerciales et RH.<br /><br />Seriez-vous disponible cette semaine pour échanger sur vos prochains temps forts corporate ?</div> : null}<DialogFooter><Button variant="outline" onClick={() => { navigator.clipboard?.writeText("Message copié"); toast.success("Message copié"); }}>Copier</Button><Button onClick={() => toast.success("Nouvelle variante générée")}>Régénérer</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}

function FilterSelect({ value, onValueChange, placeholder, options, labels }: { value: string; onValueChange: (value: string) => void; placeholder: string; options: string[]; labels?: Record<string, string> }) {
  return <Select value={value} onValueChange={(v) => { onValueChange(v); }}><SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent><SelectItem value="all">{placeholder}</SelectItem>{options.map((item) => <SelectItem key={item} value={item}>{labels?.[item] ?? item}</SelectItem>)}</SelectContent></Select>;
}

function RowActions({ opp, onStatus, onNote, onMessage }: { opp: Opportunity; onStatus: (id: string, status: OpportunityStatus) => void; onNote: () => void; onMessage: () => void }) {
  return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Actions"><MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem asChild><Link to="/opportunites/$id" params={{ id: opp.id }}>Voir le détail</Link></DropdownMenuItem><DropdownMenuItem onClick={() => onStatus(opp.id, "Priorité A")}>Passer en priorité A</DropdownMenuItem><DropdownMenuItem onClick={() => onStatus(opp.id, "À qualifier")}>Marquer à qualifier</DropdownMenuItem><DropdownMenuItem onClick={() => onStatus(opp.id, "À contacter")}>Marquer à contacter</DropdownMenuItem><DropdownMenuItem onClick={() => onStatus(opp.id, "En cours")}>Passer en cours</DropdownMenuItem><DropdownMenuItem onClick={onNote}><StickyNote className="size-4" />Ajouter une note</DropdownMenuItem><DropdownMenuItem onClick={onMessage}><Mail className="size-4" />Générer un message</DropdownMenuItem><DropdownMenuItem onClick={() => onStatus(opp.id, "Archivée")}>Archiver</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}
