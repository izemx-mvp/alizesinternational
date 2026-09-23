import { createFileRoute } from "@tanstack/react-router";
import { WatchSourcesPage } from "@/components/alize/WatchSources";

export const Route = createFileRoute("/sources-de-veille")({
  head: () => ({ meta: [
    { title: "Sources de veille — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Sources simulées de veille commerciale et événementielle pour l’agent IA." },
    { property: "og:title", content: "Sources de veille — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Activez ou désactivez les sources de signaux utilisées dans la démonstration." },
  ] }),
  component: WatchSourcesPage,
});
