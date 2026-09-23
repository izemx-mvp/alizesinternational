import { Bell, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { countries, eventTypes, sectors } from "@/lib/alize-data";
import { useAlizeStore } from "@/lib/alize-store";
import { Breadcrumbs, PageHeader, StatusBadge, Surface } from "./Primitives";

export function AlertsPage() {
  const { alerts, addAlert, toggleAlert } = useAlizeStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("France");
  const [sector, setSector] = useState("Pharmaceutique");
  const [eventType, setEventType] = useState("Convention");
  const [score, setScore] = useState("80");
  const [channel, setChannel] = useState("Plateforme");
  const [recipient, setRecipient] = useState("Sophie Martin");
  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Alertes" }]} />
      <PageHeader title="Alertes" subtitle="Règles de notification fictives pour la démonstration du suivi commercial." action={<Button onClick={() => setOpen(true)}><Plus />Créer une alerte</Button>} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{alerts.map((alert) => <Surface key={alert.id} className="hover-lift"><div className="flex items-start justify-between gap-4"><div className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><Bell className="size-5" /></div><Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} /></div><h2 className="mt-4 font-display text-lg font-semibold">{alert.name}</h2><p className="mt-2 rounded-lg bg-panel-soft p-3 text-sm text-muted-foreground">{alert.condition}</p><div className="mt-4 flex flex-wrap gap-2"><StatusBadge status={alert.active ? "Actif" : "Inactif"} /><span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">{alert.channel}</span></div><p className="mt-4 text-sm text-muted-foreground">Destinataire : <span className="font-semibold text-foreground">{alert.recipient}</span></p></Surface>)}</div>
      <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Créer une alerte</DialogTitle></DialogHeader><div className="grid gap-3"><Input placeholder="Nom alerte" value={name} onChange={(e) => setName(e.target.value)} /><Pick value={country} onValueChange={setCountry} options={countries} /><Pick value={sector} onValueChange={setSector} options={sectors} /><Pick value={eventType} onValueChange={setEventType} options={eventTypes} /><Input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="Score minimum" /><Pick value={channel} onValueChange={setChannel} options={["Plateforme", "Email", "Plateforme + Email"]} /><Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Destinataire" /></div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button><Button onClick={() => { addAlert({ name: name || "Nouvelle alerte", condition: `Pays = ${country} · Secteur = ${sector} · Événement = ${eventType} · Score >= ${score}`, channel, recipient }); setOpen(false); setName(""); }}>Créer</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
function Pick({ value, onValueChange, options }: { value: string; onValueChange: (value: string) => void; options: string[] }) { return <Select value={value} onValueChange={onValueChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{options.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>; }
