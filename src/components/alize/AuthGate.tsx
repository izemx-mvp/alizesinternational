import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { BrainCircuit, Loader2, ShieldAlert } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { routePermissions, useAuth } from "@/lib/alize-auth";
import { AppLayout } from "./Layout";

export function AuthGate({ children }: { children: ReactNode }) {
  const { ready, user, can } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isLogin = pathname === "/login";

  useEffect(() => {
    if (!ready) return;
    if (!user && !isLogin) navigate({ to: "/login" });
    if (user && isLogin) navigate({ to: "/" });
  }, [isLogin, navigate, ready, user]);

  if (!ready || (!user && !isLogin) || (user && isLogin)) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="grid size-12 place-items-center rounded-2xl bg-sidebar text-sidebar-foreground"><BrainCircuit className="size-6" /></div>
          <Loader2 className="size-5 animate-spin" />
        </div>
      </div>
    );
  }
  if (isLogin) return <>{children}</>;

  const rule = routePermissions.find((r) => pathname.startsWith(r.prefix));
  const isProfile = pathname.startsWith("/utilisateurs/");
  const allowed = isProfile ? (pathname === `/utilisateurs/${user?.id}` || can("users") || can("reports")) : (!rule || can(rule.perm));
  return (
    <AppLayout>
      {allowed ? children : (
        <div className="page-fade mx-auto mt-16 max-w-md rounded-2xl border bg-card p-8 text-center shadow-card">
          <ShieldAlert className="mx-auto size-10 text-warning" />
          <h1 className="mt-4 text-xl font-semibold">Accès restreint</h1>
          <p className="mt-2 text-sm text-muted-foreground">Vous ne disposez pas des permissions nécessaires pour accéder à cette page avec le rôle « {user?.role} ».</p>
          <Button asChild className="mt-6"><Link to="/">Retour au tableau de bord</Link></Button>
        </div>
      )}
    </AppLayout>
  );
}
