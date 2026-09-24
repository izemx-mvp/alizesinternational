import { useNavigate } from "@tanstack/react-router";
import { BrainCircuit, Loader2, Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialUsers, useAuth } from "@/lib/alize-auth";

const schema = z.object({
  email: z.string().trim().min(1, "L’adresse email est requise.").email("Adresse email invalide.").max(255),
  password: z.string().min(1, "Le mot de passe est requis.").max(100),
});

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotDone, setForgotDone] = useState(false);
  const [forgotError, setForgotError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const f = parsed.error.flatten().fieldErrors;
      setErrors({ email: f.email?.[0], password: f.password?.[0] });
      return;
    }
    setErrors({});
    setLoading(true);
    window.setTimeout(() => {
      const user = login(parsed.data.email, parsed.data.password, remember);
      setLoading(false);
      if (!user) { setErrors({ form: "Adresse email ou mot de passe incorrect." }); return; }
      toast.success(`Bienvenue ${user.firstName}`, { description: "Connexion réussie." });
      navigate({ to: "/" });
    }, 1000);
  };

  const sendReset = () => {
    if (!z.string().email().safeParse(forgotEmail.trim()).success) { setForgotError("Adresse email invalide."); return; }
    setForgotError("");
    setForgotDone(true);
    toast.success("Lien de réinitialisation simulé.");
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 ai-sheen" />
      <div className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[520px] rounded-full bg-ai/15 blur-3xl" />
      <div className="page-fade relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="grid size-14 place-items-center rounded-2xl bg-sidebar text-sidebar-foreground shadow-panel"><BrainCircuit className="size-7" /></div>
          <h1 className="mt-4 text-2xl font-semibold">ALIZÉ INTERNATIONAL</h1>
          <p className="mt-1 text-sm text-muted-foreground">Plateforme de Prospection Événementielle IA</p>
        </div>
        <form onSubmit={submit} noValidate className="rounded-2xl border bg-card p-6 shadow-panel">
          <h2 className="text-lg font-semibold">Connexion</h2>
          <p className="mb-5 text-sm text-muted-foreground">Accédez à votre espace de prospection.</p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Adresse email</Label>
              <div className="relative mt-1.5"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="prenom@alize-demo.com" className="pl-9" aria-invalid={Boolean(errors.email)} /></div>
              {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email}</p> : null}
            </div>
            <div>
              <div className="flex items-center justify-between"><Label htmlFor="password">Mot de passe</Label><button type="button" onClick={() => { setForgotOpen(true); setForgotDone(false); setForgotEmail(email); }} className="text-xs font-medium text-primary hover:underline">Mot de passe oublié ?</button></div>
              <div className="relative mt-1.5"><Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9" aria-invalid={Boolean(errors.password)} /></div>
              {errors.password ? <p className="mt-1 text-xs text-destructive">{errors.password}</p> : null}
            </div>
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={remember} onCheckedChange={(v) => setRemember(v === true)} />Se souvenir de moi</label>
            {errors.form ? <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.form}</div> : null}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? <><Loader2 className="animate-spin" />Connexion en cours...</> : "Se connecter"}</Button>
          </div>
        </form>
        <div className="mt-4 rounded-2xl border bg-card/80 p-4 backdrop-blur">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"><ShieldCheck className="size-3.5" />Comptes de démonstration</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {initialUsers.filter((u) => u.password).map((u) => (
              <button key={u.id} type="button" onClick={() => { setEmail(u.email); setPassword("demo123"); setErrors({}); }} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-left transition hover:border-primary hover:bg-secondary">
                <UserRound className="size-4 shrink-0 text-primary" />
                <span className="min-w-0"><span className="block truncate text-sm font-semibold">{u.firstName} {u.lastName}</span><span className="block truncate text-xs text-muted-foreground">{u.role}</span></span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Mot de passe : demo123 · Authentification simulée</p>
        </div>
      </div>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Réinitialisation du mot de passe</DialogTitle><DialogDescription>Saisissez votre adresse email pour recevoir un lien de réinitialisation.</DialogDescription></DialogHeader>
          {forgotDone ? <div className="rounded-lg bg-accent p-4 text-sm text-accent-foreground">Un lien de réinitialisation a été simulé pour cette adresse.</div> : (
            <div><Label htmlFor="forgot">Adresse email</Label><Input id="forgot" className="mt-1.5" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />{forgotError ? <p className="mt-1 text-xs text-destructive">{forgotError}</p> : null}</div>
          )}
          <DialogFooter>{forgotDone ? <Button onClick={() => setForgotOpen(false)}>Fermer</Button> : <><Button variant="outline" onClick={() => setForgotOpen(false)}>Annuler</Button><Button onClick={sendReset}>Envoyer le lien</Button></>}</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
