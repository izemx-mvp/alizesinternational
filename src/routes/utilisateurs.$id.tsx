import { createFileRoute } from "@tanstack/react-router";
import { UserProfilePage } from "@/components/alize/UserProfile";

export const Route = createFileRoute("/utilisateurs/$id")({
  head: () => ({ meta: [
    { title: "Profil utilisateur — ALIZÉ INTERNATIONAL" },
    { name: "description", content: "Profil, activité et historique d’un membre de l’équipe commerciale." },
    { property: "og:title", content: "Profil utilisateur — ALIZÉ INTERNATIONAL" },
    { property: "og:description", content: "Profil, activité et historique d’un membre de l’équipe commerciale." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProfileRoute,
});
function ProfileRoute() { const { id } = Route.useParams(); return <UserProfilePage id={id} />; }
