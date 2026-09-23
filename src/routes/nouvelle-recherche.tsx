import { createFileRoute } from "@tanstack/react-router";
import { NewSearchPage } from "@/components/alize/NewSearch";

export const Route = createFileRoute("/nouvelle-recherche")({
  head: () => ({ meta: [
    { title: "Nouvelle prospection — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Définissez un ciblage et lancez une recherche IA simulée d’opportunités événementielles." },
    { property: "og:title", content: "Nouvelle prospection — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Formulaire de ciblage pour identifier des opportunités événementielles prioritaires." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: NewSearchPage,
});
