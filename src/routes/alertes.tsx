import { createFileRoute } from "@tanstack/react-router";
import { AlertsPage } from "@/components/alize/Alerts";

export const Route = createFileRoute("/alertes")({
  head: () => ({ meta: [
    { title: "Alertes — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Règles d’alertes fictives pour les opportunités événementielles prioritaires." },
    { property: "og:title", content: "Alertes — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Créez et activez des alertes simulées pour le suivi commercial." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AlertsPage,
});
