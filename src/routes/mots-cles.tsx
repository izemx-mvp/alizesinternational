import { createFileRoute } from "@tanstack/react-router";
import { KeywordsTypologiesPage } from "@/components/alize/KeywordsTypologies";

export const Route = createFileRoute("/mots-cles")({
  head: () => ({ meta: [
    { title: "Mots-clés et typologies — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Gestion locale des mots-clés et typologies d’événements détectés par l’agent IA." },
    { property: "og:title", content: "Mots-clés et typologies — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Configurez les expressions et catégories événementielles du MVP." },
  ] }),
  component: KeywordsTypologiesPage,
});
