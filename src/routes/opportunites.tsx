import { createFileRoute } from "@tanstack/react-router";
import { OpportunitiesPage } from "@/components/alize/Opportunities";

export const Route = createFileRoute("/opportunites")({
  head: () => ({ meta: [
    { title: "Opportunités — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Liste filtrable des opportunités événementielles détectées et scorées par l’agent IA." },
    { property: "og:title", content: "Opportunités — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Consultez, filtrez, priorisez et traitez les opportunités commerciales simulées." },
  ] }),
  component: OpportunitiesPage,
});
