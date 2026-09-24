import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "@/components/alize/Users";

export const Route = createFileRoute("/utilisateurs/")({
  head: () => ({ meta: [
    { title: "Utilisateurs & permissions — ALIZÉS INTERNATIONAL" },
    { name: "description", content: "Gérez les membres de la plateforme et leurs niveaux d’autorisation." },
    { property: "og:title", content: "Utilisateurs & permissions — ALIZÉS INTERNATIONAL" },
    { property: "og:description", content: "Gérez les membres de la plateforme et leurs niveaux d’autorisation." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: UsersPage,
});

