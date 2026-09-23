import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BrainCircuit,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  DatabaseZap,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  Radar,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const groups = [
  { title: "Pilotage", links: [{ label: "Tableau de bord", to: "/", icon: LayoutDashboard }] },
  { title: "Prospection", links: [
    { label: "Opportunités", to: "/opportunites", icon: Radar },
    { label: "Prospects", to: "/prospects", icon: Building2 },
    { label: "Nouvelle recherche", to: "/nouvelle-recherche", icon: Search },
  ] },
  { title: "Veille", links: [
    { label: "Sources de veille", to: "/sources-de-veille", icon: DatabaseZap },
    { label: "Mots-clés & typologies", to: "/mots-cles", icon: ClipboardList },
  ] },
  { title: "Configuration", links: [
    { label: "Grille de scoring", to: "/grille-scoring", icon: Gauge },
    { label: "Ciblage prioritaire", to: "/ciblage-prioritaire", icon: Target },
    { label: "Alertes", to: "/alertes", icon: Bell },
  ] },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen bg-background text-foreground lg:flex">
        <aside className={cn("sticky top-0 hidden h-screen shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:flex", collapsed ? "w-[86px]" : "w-72")}>
          <div className="flex h-20 items-center gap-3 px-5">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-sidebar-active text-sidebar-active-foreground shadow-panel">
              <BrainCircuit className="size-5" />
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold">ALIZÉ INTERNATIONAL</p>
                <p className="truncate text-xs text-sidebar-muted">Prospection Événementielle IA</p>
              </div>
            ) : null}
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-2">
            {groups.map((group) => (
              <div key={group.title} className="mb-5">
                {!collapsed ? <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-sidebar-muted">{group.title}</p> : null}
                <div className="space-y-1">
                  {group.links.map((item) => {
                    const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    const Icon = item.icon;
                    const link = (
                      <Link
                        to={item.to}
                        className={cn(
                          "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-sidebar-muted transition hover:bg-sidebar-active/20 hover:text-sidebar-foreground",
                          active && "bg-sidebar-active text-sidebar-active-foreground shadow-panel",
                          collapsed && "justify-center",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        {!collapsed ? <span className="truncate">{item.label}</span> : null}
                      </Link>
                    );
                    return collapsed ? (
                      <Tooltip key={item.to}>
                        <TooltipTrigger asChild>{link}</TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                      </Tooltip>
                    ) : <div key={item.to}>{link}</div>;
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-sidebar-foreground/10 p-4">
            <div className={cn("flex items-center gap-3 rounded-xl bg-sidebar-foreground/5 p-3", collapsed && "justify-center p-2")}>
              <Avatar className="size-10"><AvatarFallback>SM</AvatarFallback></Avatar>
              {!collapsed ? <div className="min-w-0"><p className="truncate text-sm font-semibold">Sophie Martin</p><p className="truncate text-xs text-sidebar-muted">Responsable Commerciale</p></div> : null}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="mt-3 w-full text-sidebar-muted hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground">
              {collapsed ? <ChevronRight /> : <ChevronLeft />}{!collapsed ? "Réduire" : null}
            </Button>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 lg:px-8">
              <div className="flex items-center gap-3 lg:hidden">
                <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Sparkles className="size-4" /></div>
                <div><p className="text-sm font-semibold">ALIZÉ INTERNATIONAL</p><p className="text-xs text-muted-foreground">Prospection IA</p></div>
              </div>
              <div className="hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground lg:flex">
                <span className="size-2 rounded-full bg-success" /> Agent IA actif · Dernière analyse : il y a 12 min
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">MVP DEMO</span>
                <Button variant="outline" size="icon" aria-label="Aide"><LifeBuoy className="size-4" /></Button>
              </div>
            </div>
            <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
              {groups.flatMap((group) => group.links).map((item) => <Link key={item.to} to={item.to} className="whitespace-nowrap rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">{item.label}</Link>)}
            </nav>
          </header>
          <main className="min-w-0 flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
