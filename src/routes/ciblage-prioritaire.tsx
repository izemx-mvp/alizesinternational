import { createFileRoute } from "@tanstack/react-router";
import { TargetingPage } from "@/components/alize/Targeting";

export const Route = createFileRoute("/ciblage-prioritaire")({
  head: () => ({ meta: [
    { title: "Ciblage prioritaire — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Paramétrage local des pays, villes, secteurs et tailles prioritaires." },
    { property: "og:title", content: "Ciblage prioritaire — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Ajustez les critères prioritaires utilisés dans la démonstration de prospection IA." },
  ] }),
  component: TargetingPage,
});
