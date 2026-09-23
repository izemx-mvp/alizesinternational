import { createFileRoute } from "@tanstack/react-router";
import { NewSearchPage } from "@/components/alize/NewSearch";

export const Route = createFileRoute("/nouvelle-recherche")({
  head: () => ({ meta: [
    { title: "Nouvelle prospection — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Définissez un ciblage et lancez une recherche IA simulée d’opportunités événementielles." },
    { property: "og:title", content: "Nouvelle prospection — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Formulaire de ciblage pour identifier des opportunités événementielles prioritaires." },
  ] }),
  component: NewSearchPage,
});
