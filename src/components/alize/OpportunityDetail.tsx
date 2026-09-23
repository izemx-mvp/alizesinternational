import { Link } from "@tanstack/react-router";
import { ArrowLeft, BriefcaseBusiness, Building2, Copy, Mail, MapPin, MessageSquare, Phone, RefreshCw, Sparkles, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAlizeStore } from "@/lib/alize-store";
import type { Opportunity, Tone } from "@/lib/alize-data";
import { Breadcrumbs, EmptyState, PageHeader, ScoreBadge, StatusBadge, Surface } from "./Primitives";

const actions = ["Résumer l’opportunité", "Générer un email", "Générer un message LinkedIn", "Préparer un argumentaire", "Identifier le meilleur décideur", "Préparer un script d’appel"];
const tones: Tone[] = ["Professionnel", "Court & direct", "Premium", "Chaleureux"];

export function OpportunityDetailPage({ id }: { id: string }) {
  const { opportunities, setOpportunityStatus } = useAlizeStore();
  const opportunity = opportunities.find((item) => item.id === id);
  const [tone, setTone] = useState<Tone>("Professionnel");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantAction, setAssistantAction] = useState<string>("Générer un email");
  const [variant, setVariant] = useState(0);

  const content = useMemo(() => opportunity ? buildAssistantText(opportunity, assistantAction, tone, variant) : "", [assistantAction, opportunity, tone, variant]);

  if (!opportunity) return <EmptyState label="Opportunité introuvable." />;
  const primaryContact = opportunity.contacts[0];

  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Opportunités", to: "/opportunites" }, { label: opportunity.company }]} />
      <PageHeader
        title={opportunity.company}
        subtitle={`${opportunity.city}, ${opportunity.country} · ${opportunity.sector} · ${opportunity.size} employés`}
        action={<div className="flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/opportunites"><ArrowLeft />Retour</Link></Button><Button onClick={() => setOpportunityStatus(opportunity.id, "En cours")}>Passer en cours</Button></div>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Surface className="ai-sheen">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="font-display text-xl font-semibold">Résumé IA</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{opportunity.summary}</p></div>
              <div className="rounded-xl bg-card p-4 shadow-card"><div className="text-sm text-muted-foreground">Score</div><div className="mt-1 font-display text-4xl font-semibold text-primary">{opportunity.score} / 100</div><div className="mt-2"><StatusBadge status={opportunity.status} /></div></div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3"><Info label="Opportunité estimée" value={opportunity.opportunity} /><Info label="Destination potentielle" value={opportunity.destination} /><Info label="Horizon" value={opportunity.horizon} /></div>
          </Surface>

          <Surface>
            <h2 className="mb-4 font-display text-lg font-semibold">Pourquoi cette opportunité ?</h2>
            <div className="grid gap-3 md:grid-cols-3">{opportunity.scoreReasons.map((reason) => <div key={reason.label} className="rounded-xl border bg-panel-soft p-4"><p className="font-display text-2xl font-semibold text-primary">+{reason.points}</p><p className="mt-1 text-sm text-muted-foreground">{reason.label}</p></div>)}</div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary p-4"><span className="font-semibold">Score final</span><ScoreBadge score={opportunity.score} /></div>
          </Surface>

          <Surface>
            <h2 className="mb-4 font-display text-lg font-semibold">Signaux détectés</h2>
            <div className="space-y-4">{opportunity.timeline.map((item) => <div key={item.date} className="relative border-l pl-5"><span className="absolute -left-1.5 top-1 size-3 rounded-full bg-primary" /><p className="text-xs font-semibold uppercase text-primary">{item.date}</p><p className="mt-1 text-sm text-foreground">{item.text}</p></div>)}</div>
          </Surface>

          <Surface>
            <h2 className="mb-4 font-display text-lg font-semibold">Entreprise</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"><Info icon={Building2} label="Site" value={opportunity.website} /><Info label="Secteur" value={opportunity.sector} /><Info label="Effectif" value={String(opportunity.employees)} /><Info icon={MapPin} label="Pays" value={opportunity.country} /><Info label="Ville" value={opportunity.city} /><Info label="Implantations" value={opportunity.locations.join(", ")} /></div>
          </Surface>

          <Surface>
            <h2 className="mb-4 font-display text-lg font-semibold">Contacts recommandés</h2>
            <div className="grid gap-3 lg:grid-cols-3">{opportunity.contacts.map((contact) => <div key={contact.id} className="rounded-xl border bg-card p-4 shadow-card"><div className="mb-3 flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full bg-secondary text-primary"><UserRound className="size-5" /></div><div><p className="font-semibold">{contact.name}</p><p className="text-xs text-muted-foreground">{contact.role}</p></div></div><StatusBadge status={contact.influence} /><p className="mt-3 text-sm font-medium">Score contact : {contact.score} %</p><div className="mt-4 flex flex-wrap gap-2"><Button size="sm" onClick={() => { setAssistantAction("Générer un email"); setAssistantOpen(true); }}><Mail />Email</Button><Button size="sm" variant="outline" onClick={() => { setAssistantAction("Générer un message LinkedIn"); setAssistantOpen(true); }}><MessageSquare />LinkedIn</Button><Button size="sm" variant="ghost" onClick={() => toast("Profil simulé affiché")}>Voir le profil</Button></div></div>)}</div>
          </Surface>
        </div>

        <aside className="space-y-6">
          <Surface className="sticky top-24">
            <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-5" /></div><div><h2 className="font-display text-lg font-semibold">Assistant de prospection IA</h2><p className="text-xs text-muted-foreground">Génération simulée depuis la mock data</p></div></div>
            <Select value={tone} onValueChange={(value) => setTone(value as Tone)}><SelectTrigger className="mt-4"><SelectValue /></SelectTrigger><SelectContent>{tones.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
            <div className="mt-4 grid gap-2">{actions.map((action) => <Button key={action} variant={action === assistantAction ? "default" : "outline"} onClick={() => { setAssistantAction(action); setAssistantOpen(true); }}>{action}</Button>)}</div>
            <div className="mt-5 rounded-xl bg-panel-soft p-4 text-sm leading-6 text-muted-foreground">Meilleur contact recommandé : <span className="font-semibold text-foreground">{primaryContact?.name}</span>, {primaryContact?.role}.</div>
          </Surface>
        </aside>
      </div>

      <Dialog open={assistantOpen} onOpenChange={setAssistantOpen}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>{assistantAction}</DialogTitle></DialogHeader><div className="rounded-xl bg-panel-soft p-4 text-sm leading-7 whitespace-pre-line">{content}</div><DialogFooter><Button variant="outline" onClick={() => { navigator.clipboard?.writeText(content); toast.success("Texte copié"); }}><Copy />Copier</Button><Button variant="outline" onClick={() => setVariant((v) => v + 1)}><RefreshCw />Régénérer</Button><Button onClick={() => setAssistantOpen(false)}>Fermer</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}

function Info({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) {
  return <div className="rounded-xl border bg-card p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">{Icon ? <Icon className="size-3" /> : null}{label}</p><p className="mt-2 text-sm font-semibold text-foreground">{value}</p></div>;
}

function buildAssistantText(opp: Opportunity, action: string, tone: Tone, variant: number) {
  const contact = opp.contacts[0]?.name ?? "Madame, Monsieur";
  if (action === "Résumer l’opportunité") return `${opp.company} combine un score de ${opp.score}/100, un signal clé (${opp.signal}) et un besoin probable de type ${opp.opportunity}. Le meilleur angle commercial est de proposer une prise en charge premium au Maroc sur un horizon ${opp.horizon}.`;
  if (action === "Identifier le meilleur décideur") return `${contact} ressort comme contact prioritaire avec un score de ${opp.contacts[0]?.score ?? 90} %. Son rôle est directement lié à l’organisation ou à l’influence des événements corporate.`;
  if (action === "Préparer un argumentaire") return `Angle recommandé : relier ${opp.signal.toLowerCase()} à un moment de mobilisation interne. Mettre en avant la capacité d’ALIZÉ INTERNATIONAL à concevoir un ${opp.eventType.toLowerCase()} clé en main à ${opp.destination}, avec logistique, expérience et pilotage exécutif.`;
  if (action === "Préparer un script d’appel") return `Bonjour ${contact}, je vous appelle de la part d’ALIZÉ INTERNATIONAL. Nous accompagnons les entreprises en phase de développement dans leurs événements corporate. J’ai noté plusieurs signaux autour de ${opp.company}, notamment ${opp.signal.toLowerCase()}. Est-ce que vos prochains temps forts internes ou commerciaux sont déjà planifiés ?`;
  if (action === "Générer un message LinkedIn") return `Bonjour ${contact}, j’ai vu que ${opp.company} traverse une phase active autour de ${opp.signal.toLowerCase()}. Chez ALIZÉ INTERNATIONAL, nous aidons les équipes à transformer ces moments en événements corporate premium, notamment au Maroc. Ouvert à un échange rapide ?`;
  const premium = tone === "Premium" ? "Notre approche combine exigence logistique, expérience haut de gamme et accompagnement discret des équipes dirigeantes." : "Nous pouvons vous proposer un format efficace et adapté à vos enjeux.";
  const opening = variant % 2 === 0 ? `Bonjour ${contact},` : `Bonjour,`;
  return `Objet : Organisation de vos prochains événements corporate\n\n${opening}\n\nJe me permets de vous contacter suite aux développements récents de ${opp.company}, notamment ${opp.signal.toLowerCase()}. Ces signaux peuvent indiquer un besoin prochain autour d’un ${opp.eventType.toLowerCase()} ou d’un temps fort managérial.\n\n${premium}\n\nSeriez-vous disponible pour un échange de 15 minutes cette semaine ?`;
}
