import { Plus, Tag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventTypes } from "@/lib/alize-data";
import { useAlizeStore } from "@/lib/alize-store";
import { Breadcrumbs, PageHeader, StatusBadge, Surface, tableWrap, td, th } from "./Primitives";

export function KeywordsTypologiesPage() {
  const { keywords, toggleKeyword, addKeyword } = useAlizeStore();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Convention");
  const [language, setLanguage] = useState<"FR" | "EN">("FR");
  const [enabledTypes, setEnabledTypes] = useState(() => eventTypes.reduce<Record<string, boolean>>((acc, item) => ({ ...acc, [item]: true }), {}));
  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Mots-clés & typologies" }]} />
      <PageHeader title="Mots-clés & typologies" subtitle="Référentiel simulé des expressions et familles d’événements utilisées par l’agent IA." action={<Button onClick={() => setOpen(true)}><Plus />Ajouter un mot-clé</Button>} />
      <Tabs defaultValue="keywords">
        <TabsList><TabsTrigger value="keywords">Mots-clés</TabsTrigger><TabsTrigger value="types">Typologies d’événements</TabsTrigger></TabsList>
        <TabsContent value="keywords" className="mt-5"><div className={tableWrap}><table className="w-full border-collapse"><thead><tr className="border-b bg-panel-soft"><th className={th}>Mot-clé</th><th className={th}>Catégorie</th><th className={th}>Langue</th><th className={th}>Occurrences</th><th className={th}>Statut</th><th className={th}>Actions</th></tr></thead><tbody>{keywords.map((item) => <tr key={item.id} className="border-b transition hover:bg-secondary"><td className={td}><span className="font-semibold">{item.keyword}</span></td><td className={td}>{item.category}</td><td className={td}>{item.language}</td><td className={td}>{item.occurrences}</td><td className={td}><StatusBadge status={item.active ? "Actif" : "Inactif"} /></td><td className={td}><Button size="sm" variant="outline" onClick={() => toggleKeyword(item.id)}>{item.active ? "Désactiver" : "Activer"}</Button></td></tr>)}</tbody></table></div></TabsContent>
        <TabsContent value="types" className="mt-5"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{eventTypes.map((type) => <Surface key={type} className="hover-lift"><div className="flex items-start justify-between gap-4"><div className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><Tag className="size-5" /></div><Switch checked={Boolean(enabledTypes[type])} onCheckedChange={() => setEnabledTypes((current) => ({ ...current, [type]: !current[type] }))} /></div><h2 className="mt-4 font-display text-lg font-semibold">{type}</h2><p className="mt-2 text-sm text-muted-foreground">Typologie surveillée pour détecter les intentions et projets événementiels.</p><div className="mt-4"><StatusBadge status={enabledTypes[type] ? "Actif" : "Inactif"} /></div></Surface>)}</div></TabsContent>
      </Tabs>
      <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Ajouter un mot-clé</DialogTitle></DialogHeader><div className="space-y-3"><Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Mot-clé" /><Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{eventTypes.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><Select value={language} onValueChange={(value) => setLanguage(value as "FR" | "EN")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="FR">FR</SelectItem><SelectItem value="EN">EN</SelectItem></SelectContent></Select></div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button><Button onClick={() => { addKeyword({ keyword, category, language, active: true }); setKeyword(""); setOpen(false); }}>Ajouter</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
