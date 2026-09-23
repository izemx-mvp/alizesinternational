import { createFileRoute } from "@tanstack/react-router";
import { OpportunityDetailPage } from "@/components/alize/OpportunityDetail";

export const Route = createFileRoute("/opportunites/")({
  head: () => ({ meta: [
    { title: "Détail opportunité — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Détail d’une opportunité événementielle avec signaux, score, contacts et assistant IA." },
    { property: "og:title", content: "Détail opportunité — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Analyse IA simulée, contacts recommandés et génération de message commercial." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <OpportunityDetailPage id={id} />;
}
