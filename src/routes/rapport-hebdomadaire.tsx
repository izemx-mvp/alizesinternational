import { createFileRoute } from "@tanstack/react-router";
import { WeeklyReportPage } from "@/components/alize/WeeklyReport";

export const Route = createFileRoute("/rapport-hebdomadaire")({
  head: () => ({ meta: [
    { title: "Rapport hebdomadaire — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Synthèse hebdomadaire de l’activité de prospection et des opportunités détectées." },
    { property: "og:title", content: "Rapport hebdomadaire — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Synthèse hebdomadaire de l’activité de prospection et des opportunités détectées." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WeeklyReportPage,
});

