import { Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, Briefcase, Building2, Clock, History } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fullName, initials, useAuth, userHistory } from "@/lib/alize-auth";
import { Breadcrumbs, EmptyState, StatCard, Surface } from "./Primitives";
import { ActiveBadge, formatDateTime, RoleBadge } from "./Users";

export function UserProfilePage({ id }: { id: string }) {
  const { users, can } = useAuth();
  const user = users.find((u) => u.id === id);
  if (!user) return <EmptyState label="Utilisateur introuvable." />;
  const back = can("users") ? <Button asChild variant="outline"><Link to="/utilisateurs"><ArrowLeft />Retour</Link></Button> : <Button asChild variant="outline"><Link to="/"><ArrowLeft />Retour</Link></Button>;
  return (
    <div className="page-fade">
      <Breadcrumbs items={can("users") ? [{ label: "Utilisateurs & permissions", to: "/utilisateurs" }, { label: fullName(user) }] : [{ label: "Profil utilisateur" }]} />
      <Surface className="mb-6 ai-sheen">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16"><AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">{initials(user)}</AvatarFallback></Avatar>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Profil utilisateur</p>
              <h1 className="text-2xl font-semibold">{fullName(user)}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex gap-2"><RoleBadge role={user.role} /><ActiveBadge active={user.active} /></div>
            </div>
          </div>
          {back}
        </div>
      </Surface>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Opportunités assignées" value={String(user.assigned)} icon={Briefcase} />
        <StatCard label="Prospects suivis" value={String(user.prospects)} icon={Building2} delay={80} />
        <StatCard label="Actions commerciales" value={String(user.actions)} icon={Activity} delay={160} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Surface>
          <h2 className="mb-4 font-semibold">Informations</h2>
          <dl className="space-y-3 text-sm">
            {[["Rôle", user.role], ["Statut", user.active ? "Actif" : "Inactif"], ["Dernière connexion", formatDateTime(user.lastLogin)], ["Date de création", formatDateTime(user.createdAt)]].map(([k, v]) => <div key={k} className="flex justify-between border-b pb-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}
          </dl>
        </Surface>
        <Surface>
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><History className="size-4 text-primary" />Historique récent</h2>
          <ol className="relative space-y-4 border-l pl-5">
            {userHistory.map((h) => <li key={h.when} className="relative"><span className="absolute -left-[27px] top-1 size-3 rounded-full border-2 border-card bg-primary" /><p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3" />{h.when}</p><p className="text-sm">{h.text}</p></li>)}
          </ol>
        </Surface>
      </div>
    </div>
  );
}
