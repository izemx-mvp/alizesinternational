import { createFileRoute } from "@tanstack/react-router";
import { ScoringPage } from "@/components/alize/Scoring";

export const Route = createFileRoute("/grille-scoring")({
  head: () => ({ meta: [
    { title: "Grille de scoring — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Configuration locale des critères de scoring des opportunités événementielles." },
    { property: "og:title", content: "Grille de scoring — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Simulez les pondérations utilisées pour prioriser les opportunités." },
  ] }),
  component: ScoringPage,
});
