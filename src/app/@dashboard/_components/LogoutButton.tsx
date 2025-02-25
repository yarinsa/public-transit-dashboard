'use client';

import auth from "@/lib/auth";
import { Button } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

export const LogoutButton = () => {
    const onLogout = async () => {
        await auth.logout();
        window.location.href = '/';
      }
    return <Button variant="outline" onClick={onLogout}>
      <LuArrowRight />
      Logout
    </Button>
}