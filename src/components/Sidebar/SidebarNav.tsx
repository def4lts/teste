import { Stack } from "@chakra-ui/react";
import {
  RiArrowLeftRightFill,
  RiBankCard2Line,
  RiBankFill,
  RiShoppingCartFill,
  RiUserHeartFill,
} from "react-icons/ri";

import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";

export function SidebarNav() {
  return (
    <Stack spacing="24" align="flex-start">
      <NavSection title="INÍCIO">
        <NavLink href="/dashboard" icon={RiBankFill}>
          Dashboard
        </NavLink>
        <NavLink href="/sessions" icon={RiUserHeartFill}>
          Sessões
        </NavLink>
        <NavLink href="/groups" icon={RiBankCard2Line}>
          Grupos
        </NavLink>
      </NavSection>

      <NavSection title="PRODUTOS">
        <NavLink href="/dashboard" icon={RiShoppingCartFill}>
          Compras
        </NavLink>
        <NavLink href="/dashboard" icon={RiArrowLeftRightFill}>
          Trocas
        </NavLink>
      </NavSection>
    </Stack>
  );
}
