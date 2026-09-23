import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { OpportunityStatus } from "@/lib/alize-data";

export function PageHeader({ title, subtitle, action, eyebrow }: { title: string; subtitle: string; action?: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</div> : null}
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function Surface({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-xl border bg-card p-5 shadow-card", className)}>{children}</section>;
}

export function StatCard({ label, value, detail, icon: Icon, delay = 0 }: { label: string; value: string; detail?: string; icon: React.ElementType; delay?: number }) {
  const [shown, setShown] = useState("0");
  useEffect(() => {
    const numeric = Number(value.replace(/[^0-9]/g, ""));
    if (!numeric) {
      setShown(value);
      return;
    }
    let frame = 0;
    const total = 26;
    const timeout = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        frame += 1;
        const next = Math.round((numeric * frame) / total);
        setShown(value.includes("%") ? `${next} %` : String(next));
        if (frame >= total) window.clearInterval(interval);
      }, 28);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [delay, value]);

  return (
    <Surface className="hover-lift animate-fade-in p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold text-foreground">{shown}</p>
          {detail ? <p className="mt-2 text-xs font-medium text-success">{detail}</p> : null}
        </div>
        <div className="rounded-lg bg-secondary p-2 text-primary"><Icon className="size-5" /></div>
      </div>
    </Surface>
  );
}

export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  const steps = [
    ["Ciblage", compact ? "Critères définis" : "1 248 entreprises analysées"],
    ["Recherche IA", compact ? "Matching marché" : "163 entreprises retenues"],
    ["Analyse", compact ? "Signaux détectés" : "74 signaux détectés"],
    ["Qualification", compact ? "Opportunités" : "48 opportunités"],
    ["Scoring", compact ? "Priorités" : "12 opportunités A"],
    ["Prospection", compact ? "Messages" : "Messages prêts"],
  ];
  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-[900px] grid-cols-6 gap-3">
        {steps.map(([title, text], index) => (
          <div key={title} className="relative rounded-xl border bg-card p-4 shadow-card">
            {index < steps.length - 1 ? <ChevronRight className="absolute -right-5 top-1/2 z-10 size-6 -translate-y-1/2 rounded-full bg-background p-1 text-primary" /> : null}
            <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              {index < 5 ? <CheckCircle2 className="size-5" /> : <Sparkles className="size-5" />}
            </div>
            <p className="font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
            <div className="mt-4 h-1.5 rounded-full bg-secondary">
              <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.min(100, 28 + index * 14)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: OpportunityStatus | string }) {
  const cls = status === "Priorité A"
    ? "bg-success text-success-foreground border-transparent"
    : status === "Priorité B" || status === "À contacter" || status === "En cours"
      ? "bg-warning text-warning-foreground border-transparent"
      : status === "Archivée"
        ? "bg-neutral-badge text-neutral-badge-foreground border-transparent"
        : "bg-secondary text-secondary-foreground border-transparent";
  return <Badge variant="outline" className={cn("whitespace-nowrap", cls)}>{status}</Badge>;
}

export function ScoreBadge({ score }: { score: number }) {
  const status = score >= 80 ? "Priorité A" : score >= 60 ? "Priorité B" : "À qualifier";
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-foreground">{score}</span>
      <StatusBadge status={status} />
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return <div className="rounded-xl border border-dashed bg-panel-soft p-8 text-center text-sm text-muted-foreground">{label}</div>;
}

export function MultiSelectChips({ options, value, onChange }: { options: string[]; value: string[]; onChange: (value: string[]) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const checked = value.includes(option);
        return (
          <div
            key={option}
            role="button"
            tabIndex={0}
            onClick={() => onChange(checked ? value.filter((item) => item !== option) : [...value, option])}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onChange(checked ? value.filter((item) => item !== option) : [...value, option]);
              }
            }}
            className={cn(
              "cursor-pointer rounded-lg border px-3 py-2 text-left text-sm transition hover:border-primary hover:bg-secondary",
              checked ? "border-primary bg-secondary text-primary" : "bg-card text-foreground",
            )}
          >
            <span className="flex items-center gap-2"><Checkbox checked={checked} aria-hidden tabIndex={-1} />{option}</span>
          </div>
        );
      })}
    </div>
  );
}

export function SkeletonRows() {
  return <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-secondary" />)}</div>;
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
      <Link to="/" className="hover:text-primary">Tableau de bord</Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2"><ChevronRight className="size-3" />{item.to ? <Link to={item.to} className="hover:text-primary">{item.label}</Link> : <span className="text-foreground">{item.label}</span>}</span>
      ))}
    </div>
  );
}

export function LoadingButton({ loading, children }: { loading?: boolean; children: ReactNode }) {
  return <Button disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : null}{children}</Button>;
}

export const tableWrap = "overflow-x-auto rounded-xl border bg-card shadow-card";
export const th = "whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase text-muted-foreground";
export const td = "whitespace-nowrap px-4 py-3 text-sm";

export function useVisibleDelay(delay = 250) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);
  return visible;
}

export function usePageNumbers(total: number, pageSize: number) {
  return useMemo(() => Array.from({ length: Math.max(1, Math.ceil(total / pageSize)) }, (_, index) => index + 1), [pageSize, total]);
}
