'use client';

import Link from "next/link";
import { CircleUser, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SurveySwithcer from "@/components/app/nav-survey-swithcer";
import ThemeSwitcher from "./nav-theme-switcher";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { Router } from "next/router";

export function MainNav() {
  const router = usePathname();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <SurveySwithcer />
        <Link
          href="/dashboard"
          className={cn("transition-colors hover:text-foreground",
            router === "/dashboard" ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/inbox"
          className={cn("transition-colors hover:text-foreground",
            router === "/inbox" ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Inbox
        </Link>
      </nav>
      <div className="flex w-full justify-end items-center gap-4 md:gap-2 lg:gap-4">
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
