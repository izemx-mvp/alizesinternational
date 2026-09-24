import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/alize/Login";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Connexion — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Connectez-vous à la plateforme de prospection événementielle IA." },
    { property: "og:title", content: "Connexion — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Connectez-vous à la plateforme de prospection événementielle IA." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LoginPage,
});

