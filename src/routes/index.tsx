import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/alize/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord IA — ALIZÉ INTERNATIONAL" },
      { name: "description", content: "Pilotage des opportunités événementielles détectées par l’agent IA ALIZÉ INTERNATIONAL." },
      { property: "og:title", content: "Tableau de bord IA — ALIZÉ INTERNATIONAL" },
      { property: "og:description", content: "Visualisez les opportunités prioritaires, les signaux et le processus de prospection événementielle IA." },
    ],
  }),
  component: DashboardPage,
});
