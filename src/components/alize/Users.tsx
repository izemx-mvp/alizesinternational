import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowDownUp, Check, KeyRound, MoreHorizontal, Pencil, Plus, Power, Search, ShieldCheck, Trash2, UserCog, UserRound, Users as UsersIcon, UserCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { fullName, initials, permissionLabels, roleDescriptions, roles, useAuth, type AppUser, type Role } from "@/lib/alize-auth";
import { Breadcrumbs, EmptyState, PageHeader, StatCard, Surface, tableWrap, td, th } from "./Primitives";
import { NO_PERM } from "./Guarded";

export function formatDateTime(v: string) {
  if (!v) return "Jamais";
  const d = new Date(v);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) + (v.includes("T") ? ` · ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}` : "");
}

export function RoleBadge({ role }: { role: Role }) {
  const cls = role === "Administrateur" ? "bg-primary text-primary-foreground" : role === "Manager commercial" ? "bg-ai text-ai-foreground" : role === "Commercial" ? "bg-secondary text-secondary-foreground" : "bg-neutral-badge text-neutral-badge-foreground";
  return <Badge variant="outline" className={`whitespace-nowrap border-transparent ${cls}`}>{role}</Badge>;
}
export function ActiveBadge({ active }: { active: boolean }) {
  return <Badge variant="outline" className={`border-transparent ${active ? "bg-success text-success-foreground" : "bg-neutral-badge text-neutral-badge-foreground"}`}>{active ? "Actif" : "Inactif"}</Badge>;
}

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis").max(50),
  lastName: z.string().trim().min(1, "Nom requis").max(50),
  email: z.string().trim().email("Adresse email invalide").max(255),
});

type FormState = { firstName: string; lastName: string; email: string; role: Role; active: boolean };
const emptyForm: FormState = { firstName: "", lastName: "", email: "", role: "Commercial", active: true };

export function UsersPage() {
  const { users, user: me, addUser, updateUser, deleteUser, matrix, togglePermission, can } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<"all" | Role>("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<"name" | "createdAt" | "lastLogin">("name");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toDelete, setToDelete] = useState<AppUser | null>(null);
  const pageSize = 6;

  const filtered = useMemo(() => users
    .filter((u) => `${fullName(u)} ${u.email}`.toLowerCase().includes(query.toLowerCase()))
    .filter((u) => role === "all" || u.role === role)
    .filter((u) => status === "all" || (status === "active" ? u.active : !u.active))
    .sort((a, b) => sort === "name" ? fullName(a).localeCompare(fullName(b), "fr") : (b[sort] || "").localeCompare(a[sort] || "")), [query, role, sort, status, users]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setErrors({}); setFormOpen(true); };
  const openEdit = (u: AppUser) => { setEditing(u); setForm({ firstName: u.firstName, lastName: u.lastName, email: u.email, role: u.role, active: u.active }); setErrors({}); setFormOpen(true); };
  const save = () => {
    const r = formSchema.safeParse(form);
    if (!r.success) { const f = r.error.flatten().fieldErrors; setErrors({ firstName: f.firstName?.[0] ?? "", lastName: f.lastName?.[0] ?? "", email: f.email?.[0] ?? "" }); return; }
    if (users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase() && u.id !== editing?.id)) { setErrors({ email: "Cette adresse est déjà utilisée" }); return; }
    const data = { ...form, ...r.data };
    if (editing) { updateUser(editing.id, data); toast.success("Modifications enregistrées."); } else addUser(data);
    setFormOpen(false);
  };
  const toggleActive = (u: AppUser) => {
    if (u.id === me?.id) { toast.error("Vous ne pouvez pas désactiver votre propre compte."); return; }
    updateUser(u.id, { active: !u.active });
    toast.success(u.active ? "Utilisateur désactivé." : "Utilisateur activé.");
  };

  return (
    <div className="page-fade">
      <Breadcrumbs items={[{ label: "Utilisateurs & permissions" }]} />
      <PageHeader title="Utilisateurs & permissions" subtitle="Gérez les membres ayant accès à la plateforme et leurs niveaux d’autorisation." action={<Button onClick={openCreate}><Plus />Ajouter un utilisateur</Button>} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Utilisateurs" value={String(users.length)} icon={UsersIcon} />
        <StatCard label="Administrateurs" value={String(users.filter((u) => u.role === "Administrateur").length)} icon={ShieldCheck} delay={80} />
        <StatCard label="Commerciaux" value={String(users.filter((u) => u.role === "Commercial").length)} icon={UserRound} delay={160} />
        <StatCard label="Utilisateurs actifs" value={String(users.filter((u) => u.active).length)} icon={UserCheck} delay={240} />
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-5"><TabsTrigger value="users">Utilisateurs</TabsTrigger><TabsTrigger value="roles">Rôles & permissions</TabsTrigger></TabsList>
        <TabsContent value="users">
          <Surface className="mb-5">
            <div className="grid gap-3 md:grid-cols-4">
              <div className="relative md:col-span-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Nom ou email" className="pl-9" /></div>
              <Select value={role} onValueChange={(v) => { setRole(v as Role | "all"); setPage(1); }}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tous les rôles</SelectItem>{roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
              <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tous</SelectItem><SelectItem value="active">Actif</SelectItem><SelectItem value="inactive">Inactif</SelectItem></SelectContent></Select>
              <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}><SelectTrigger><ArrowDownUp className="size-3.5" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="name">Tri : Nom</SelectItem><SelectItem value="createdAt">Tri : Date création</SelectItem><SelectItem value="lastLogin">Tri : Dernière connexion</SelectItem></SelectContent></Select>
            </div>
          </Surface>
          {items.length === 0 ? <EmptyState label="Aucun utilisateur ne correspond à ces filtres." /> : (
            <div className={tableWrap}>
              <table className="w-full border-collapse">
                <thead><tr className="border-b bg-panel-soft">{["Avatar", "Utilisateur", "Email", "Rôle", "Statut", "Dernière connexion", "Opp. assignées", "Création", "Actions"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
                <tbody>{items.map((u) => (
                  <tr key={u.id} className="border-b transition hover:bg-secondary/70">
                    <td className={td}><Avatar className="size-9"><AvatarFallback className="bg-secondary text-xs font-bold text-primary">{initials(u)}</AvatarFallback></Avatar></td>
                    <td className={td}><Link to="/utilisateurs/$id" params={{ id: u.id }} className="font-semibold text-primary hover:underline">{fullName(u)}</Link>{u.id === me?.id ? <span className="ml-2 text-xs text-muted-foreground">(vous)</span> : null}</td>
                    <td className={`${td} text-muted-foreground`}>{u.email}</td>
                    <td className={td}><RoleBadge role={u.role} /></td>
                    <td className={td}><ActiveBadge active={u.active} /></td>
                    <td className={td}>{formatDateTime(u.lastLogin)}</td>
                    <td className={`${td} font-semibold`}>{u.assigned}</td>
                    <td className={td}>{formatDateTime(u.createdAt)}</td>
                    <td className={td}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Actions"><MoreHorizontal /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate({ to: "/utilisateurs/$id", params: { id: u.id } })}><UserRound />Voir le profil</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(u)}><Pencil />Modifier</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger><UserCog className="mr-2 size-4" />Changer le rôle</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>{roles.map((r) => <DropdownMenuItem key={r} onClick={() => { updateUser(u.id, { role: r }); toast.success(`Rôle modifié : ${r}`); }}>{r === u.role ? <Check /> : <span className="w-4" />}{r}</DropdownMenuItem>)}</DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuItem onClick={() => toggleActive(u)}><Power />{u.active ? "Désactiver" : "Activer"}</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Lien de réinitialisation simulé pour ${u.email}`)}><KeyRound />Réinitialiser le mot de passe</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem disabled={u.id === me?.id} onClick={() => setToDelete(u)} className="text-destructive focus:text-destructive"><Trash2 />Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground"><span>{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""}</span><div className="flex gap-2">{Array.from({ length: pages }, (_, i) => i + 1).map((n) => <Button key={n} size="sm" variant={n === page ? "default" : "outline"} onClick={() => setPage(n)}>{n}</Button>)}</div></div>
        </TabsContent>

        <TabsContent value="roles">
          <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roles.map((r) => (
              <Surface key={r} className="hover-lift">
                <div className="flex items-center justify-between"><RoleBadge role={r} /><span className="text-xs text-muted-foreground">{users.filter((u) => u.role === r).length} membre(s)</span></div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{roleDescriptions[r]}</p>
                <p className="mt-3 text-xs font-semibold text-foreground">{matrix[r].length} / {permissionLabels.length} permissions</p>
                <div className="mt-2 h-1.5 rounded-full bg-secondary"><div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${(matrix[r].length / permissionLabels.length) * 100}%` }} /></div>
              </Surface>
            ))}
          </div>
          <div className={tableWrap}>
            <table className="w-full border-collapse">
              <thead><tr className="border-b bg-panel-soft"><th className={th}>Permission</th>{["Administrateur", "Manager", "Commercial", "Consultation"].map((h) => <th key={h} className={`${th} text-center`}>{h}</th>)}</tr></thead>
              <tbody>{permissionLabels.map((p) => (
                <tr key={p.key} className="border-b transition hover:bg-secondary/60">
                  <td className={`${td} font-medium`}>{p.label}</td>
                  {roles.map((r) => {
                    const on = matrix[r].includes(p.key);
                    const locked = r === "Administrateur" || !can("permissions");
                    return (
                      <td key={r} className={`${td} text-center`}>
                        {locked ? (
                          <Tooltip><TooltipTrigger asChild><span className={`inline-grid size-7 place-items-center rounded-full ${on ? "bg-success text-success-foreground" : "bg-neutral-badge text-neutral-badge-foreground"}`}>{on ? <Check className="size-4" /> : <X className="size-4" />}</span></TooltipTrigger><TooltipContent>{r === "Administrateur" ? "L’administrateur dispose de toutes les permissions." : NO_PERM}</TooltipContent></Tooltip>
                        ) : <Switch checked={on} onCheckedChange={() => togglePermission(r, p.key)} />}
                      </td>
                    );
                  })}
                </tr>
              ))}</tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Modifier l’utilisateur" : "Ajouter un utilisateur"}</DialogTitle><DialogDescription>{editing ? fullName(editing) : "Aucun email réel n’est envoyé : l’invitation est simulée."}</DialogDescription></DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prénom" error={errors["firstName"]}><Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></Field>
            <Field label="Nom" error={errors["lastName"]}><Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></Field>
            <div className="sm:col-span-2"><Field label="Adresse email" error={errors["email"]}><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field></div>
            <Field label="Rôle"><Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></Field>
            <Field label="Statut"><Select value={form.active ? "a" : "i"} onValueChange={(v) => setForm({ ...form, active: v === "a" })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="a">Actif</SelectItem><SelectItem value="i">Inactif</SelectItem></SelectContent></Select></Field>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setFormOpen(false)}>Annuler</Button><Button onClick={save}>{editing ? "Enregistrer les modifications" : "Créer l’utilisateur"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Supprimer l’utilisateur</AlertDialogTitle><AlertDialogDescription>Êtes-vous sûr de vouloir supprimer {toDelete ? fullName(toDelete) : ""} ?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (toDelete) deleteUser(toDelete.id); setToDelete(null); }}>Supprimer</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return <div><Label className="mb-1.5 block">{label}</Label>{children}{error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}</div>;
}
