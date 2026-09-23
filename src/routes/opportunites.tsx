import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/opportunites")({
  component: OpportunitesLayout,
});

function OpportunitesLayout() {
  return <Outlet />;
}
