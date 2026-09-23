import { createFileRoute } from "@tanstack/react-router";
import { ProspectsPage } from "@/components/alize/Prospects";

export const Route = createFileRoute("/prospects")({
  head: () => ({ meta: [
    { title: "Prospects — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Base simulée des entreprises surveillées et prospects événementiels potentiels." },
    { property: "og:title", content: "Prospects — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Suivez les entreprises détectées, leurs décideurs et leurs opportunités potentielles." },
  ] }),
  component: ProspectsPage,
});
