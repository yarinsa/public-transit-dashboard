"use client";

import { Tooltip } from "@/components/ui/tooltip";
import auth from "@/lib/auth";
import { Button } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

export const LogoutButton = () => {
  const onLogout = async () => {
    await auth.logout();
    window.location.href = "/";
  };

  return (
    <Tooltip content="Logout">
        <Button variant="ghost" onClick={onLogout}>
          <LuLogOut />
        </Button>
    </Tooltip>
  );
};
