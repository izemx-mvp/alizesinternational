import { createFileRoute } from "@tanstack/react-router";
import { OpportunitiesPage } from "@/components/alize/Opportunities";

export const Route = createFileRoute("/opportunites/")({
  head: () => ({ meta: [
    { title: "Opportunités — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Liste filtrable des opportunités événementielles détectées et scorées par l’agent IA." },
    { property: "og:title", content: "Opportunités — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Consultez, filtrez, priorisez et traitez les opportunités commerciales simulées." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  validateSearch: (search: Record<string, unknown>): { status?: string; country?: string } => ({
    ...(typeof search.status === "string" ? { status: search.status } : {}),
    ...(typeof search.country === "string" ? { country: search.country } : {}),
  }),
  component: OpportunitiesPage,
});
