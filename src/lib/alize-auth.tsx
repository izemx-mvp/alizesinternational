import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

export type Role = "Administrateur" | "Manager commercial" | "Commercial" | "Consultation";
export const roles: Role[] = ["Administrateur", "Manager commercial", "Commercial", "Consultation"];

export type Permission =
  | "dashboard" | "opportunities" | "search" | "editOpp" | "archiveOpp" | "prospects" | "aiMessage"
  | "reports" | "scoring" | "targeting" | "alerts" | "users" | "permissions";

export const permissionLabels: { key: Permission; label: string }[] = [
  { key: "dashboard", label: "Voir le tableau de bord" },
  { key: "opportunities", label: "Voir les opportunités" },
  { key: "search", label: "Créer une recherche" },
  { key: "editOpp", label: "Modifier une opportunité" },
  { key: "archiveOpp", label: "Archiver une opportunité" },
  { key: "prospects", label: "Voir tous les prospects" },
  { key: "aiMessage", label: "Générer un message IA" },
  { key: "reports", label: "Voir les rapports" },
  { key: "scoring", label: "Gérer la grille de scoring" },
  { key: "targeting", label: "Modifier le ciblage" },
  { key: "alerts", label: "Gérer les alertes" },
  { key: "users", label: "Gérer les utilisateurs" },
  { key: "permissions", label: "Modifier les permissions" },
];

const all = permissionLabels.map((p) => p.key);
export const defaultMatrix: Record<Role, Permission[]> = {
  Administrateur: all,
  "Manager commercial": ["dashboard", "opportunities", "search", "editOpp", "archiveOpp", "prospects", "aiMessage", "reports", "scoring", "targeting", "alerts"],
  Commercial: ["dashboard", "opportunities", "search", "editOpp", "prospects", "aiMessage"],
  Consultation: ["dashboard", "opportunities", "prospects", "reports"],
};

export const roleDescriptions: Record<Role, string> = {
  Administrateur: "Accès complet à la plateforme, aux utilisateurs et aux permissions.",
  "Manager commercial": "Pilote l’équipe, les rapports et la configuration de la prospection.",
  Commercial: "Traite les opportunités, génère des messages et fait avancer les statuts.",
  Consultation: "Accès en lecture seule aux tableaux de bord, opportunités et rapports.",
};

export type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  active: boolean;
  lastLogin: string;
  createdAt: string;
  assigned: number;
  prospects: number;
  actions: number;
  password?: string;
};

export const initialUsers: AppUser[] = [
  { id: "u-1", firstName: "Sophie", lastName: "Martin", email: "sophie@alize-demo.com", role: "Administrateur", active: true, lastLogin: "2026-09-24T09:12", createdAt: "2025-01-14", assigned: 11, prospects: 34, actions: 128, password: "demo123" },
  { id: "u-2", firstName: "Thomas", lastName: "Bernard", email: "thomas@alize-demo.com", role: "Manager commercial", active: true, lastLogin: "2026-09-24T08:41", createdAt: "2025-02-03", assigned: 9, prospects: 27, actions: 96, password: "demo123" },
  { id: "u-3", firstName: "Claire", lastName: "Dubois", email: "claire@alize-demo.com", role: "Commercial", active: true, lastLogin: "2026-09-23T17:55", createdAt: "2025-03-21", assigned: 14, prospects: 41, actions: 152, password: "demo123" },
  { id: "u-4", firstName: "Julien", lastName: "Robert", email: "julien@alize-demo.com", role: "Consultation", active: true, lastLogin: "2026-09-22T11:03", createdAt: "2025-05-09", assigned: 0, prospects: 6, actions: 12, password: "demo123" },
  { id: "u-5", firstName: "Emma", lastName: "Laurent", email: "emma@alize-demo.com", role: "Commercial", active: true, lastLogin: "2026-09-23T15:20", createdAt: "2025-06-17", assigned: 8, prospects: 22, actions: 74 },
  { id: "u-6", firstName: "Lucas", lastName: "Martin", email: "lucas@alize-demo.com", role: "Commercial", active: false, lastLogin: "2026-08-29T10:14", createdAt: "2025-07-02", assigned: 3, prospects: 9, actions: 31 },
  { id: "u-7", firstName: "Marie", lastName: "Lopez", email: "marie@alize-demo.com", role: "Manager commercial", active: true, lastLogin: "2026-09-21T09:48", createdAt: "2025-08-11", assigned: 6, prospects: 18, actions: 57 },
  { id: "u-8", firstName: "David", lastName: "Morel", email: "david@alize-demo.com", role: "Administrateur", active: true, lastLogin: "2026-09-19T14:30", createdAt: "2025-09-04", assigned: 2, prospects: 5, actions: 23 },
];

export const userHistory = [
  { when: "Aujourd’hui 09:24", text: "Opportunité « Nova Pharma » passée en « À contacter »" },
  { when: "Hier 16:12", text: "Note ajoutée sur TechVision Europe" },
  { when: "Hier 14:38", text: "Message de prospection généré" },
  { when: "22 sept. 11:05", text: "Finora Group ajouté à la surveillance" },
  { when: "21 sept. 17:40", text: "Recherche IA lancée : Pharma · France · 3–6 mois" },
];

export const fullName = (u: AppUser) => `${u.firstName} ${u.lastName}`;
export const initials = (u: AppUser) => `${u.firstName[0] ?? ""}${u.lastName[0] ?? ""}`.toUpperCase();

const USERS_KEY = "alize-demo-users";
const MATRIX_KEY = "alize-demo-matrix";
const SESSION_KEY = "alize-demo-session";

type AuthStore = {
  ready: boolean;
  user: AppUser | null;
  users: AppUser[];
  matrix: Record<Role, Permission[]>;
  can: (p: Permission) => boolean;
  login: (email: string, password: string, remember: boolean) => AppUser | null;
  logout: () => void;
  addUser: (u: Omit<AppUser, "id" | "lastLogin" | "createdAt" | "assigned" | "prospects" | "actions">) => void;
  updateUser: (id: string, patch: Partial<AppUser>) => void;
  deleteUser: (id: string) => void;
  togglePermission: (role: Role, p: Permission) => void;
};

const Ctx = createContext<AuthStore | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem(USERS_KEY);
      if (u) setUsers(JSON.parse(u));
      const m = localStorage.getItem(MATRIX_KEY);
      if (m) setMatrix(JSON.parse(m));
      const s = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
      if (s) setUserId(s);
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  useEffect(() => { if (ready) localStorage.setItem(USERS_KEY, JSON.stringify(users)); }, [ready, users]);
  useEffect(() => { if (ready) localStorage.setItem(MATRIX_KEY, JSON.stringify(matrix)); }, [ready, matrix]);

  const user = users.find((u) => u.id === userId) ?? null;
  const can = useCallback((p: Permission) => Boolean(user && matrix[user.role].includes(p)), [matrix, user]);

  const value = useMemo<AuthStore>(() => ({
    ready, user, users, matrix, can,
    login: (email, password, remember) => {
      const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && (u.password ?? "demo123") === password);
      if (!found || !found.active) return null;
      (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, found.id);
      setUserId(found.id);
      setUsers((list) => list.map((u) => (u.id === found.id ? { ...u, lastLogin: new Date().toISOString().slice(0, 16) } : u)));
      return found;
    },
    logout: () => {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      setUserId(null);
      toast.success("Session terminée.");
    },
    addUser: (u) => {
      setUsers((list) => [...list, { ...u, id: `u-${Date.now()}`, lastLogin: "", createdAt: new Date().toISOString().slice(0, 10), assigned: 0, prospects: 0, actions: 0 }]);
      toast.success("Utilisateur créé avec succès. Invitation simulée.");
    },
    updateUser: (id, patch) => setUsers((list) => list.map((u) => (u.id === id ? { ...u, ...patch } : u))),
    deleteUser: (id) => { setUsers((list) => list.filter((u) => u.id !== id)); toast.success("Utilisateur supprimé."); },
    togglePermission: (role, p) => {
      setMatrix((m) => ({ ...m, [role]: m[role].includes(p) ? m[role].filter((x) => x !== p) : [...m[role], p] }));
      toast.success("Permissions mises à jour.");
    },
  }), [can, matrix, ready, user, users]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}

export const routePermissions: { prefix: string; perm: Permission }[] = [
  { prefix: "/nouvelle-recherche", perm: "search" },
  { prefix: "/prospects", perm: "prospects" },
  { prefix: "/opportunites", perm: "opportunities" },
  { prefix: "/rapport-hebdomadaire", perm: "reports" },
  { prefix: "/grille-scoring", perm: "scoring" },
  { prefix: "/ciblage-prioritaire", perm: "targeting" },
  { prefix: "/alertes", perm: "alerts" },
  { prefix: "/utilisateurs", perm: "users" },
];
