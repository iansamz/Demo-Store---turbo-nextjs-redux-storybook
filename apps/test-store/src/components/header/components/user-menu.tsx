"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@lib/store/hooks";
import { logout } from "@lib/store/slices/auth-slice";

interface UserMenuProps {
  isUserLoggedIn: boolean;
}

export const UserMenu = ({ isUserLoggedIn }: UserMenuProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLogin = () => {
    router.push("/auth/login");
  };

  const onGoToProfile = () => {
    router.push("/profile");
  };

  const onLogout = () => {
    dispatch(logout());
  };

  if (!isUserLoggedIn) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={onLogin}
      >
        <User className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onGoToProfile}>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Settings</DropdownMenuItem>
        <DropdownMenuItem disabled>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
