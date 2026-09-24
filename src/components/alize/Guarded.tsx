import type { ReactElement } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth, type Permission } from "@/lib/alize-auth";

export const NO_PERM = "Vous ne disposez pas des permissions nécessaires.";

/** Renders children disabled with a tooltip when the current user lacks the permission. */
export function Guarded({ perm, children }: { perm: Permission; children: ReactElement<{ disabled?: boolean }> }) {
  const { can } = useAuth();
  if (can(perm)) return children;
  return (
    <Tooltip>
      <TooltipTrigger asChild><span tabIndex={0} className="inline-flex cursor-not-allowed">{{ ...children, props: { ...children.props, disabled: true } }}</span></TooltipTrigger>
      <TooltipContent>{NO_PERM}</TooltipContent>
    </Tooltip>
  );
}
