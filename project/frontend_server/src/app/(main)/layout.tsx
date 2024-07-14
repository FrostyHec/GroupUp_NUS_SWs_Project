"use client";
import { MainNav } from "@/components/app/main-header";
import useSurveys from "@/components/hooks/useSurveys";
import ThemeSwitcher from "@/components/app/nav-theme-switcher";
import SurveySwithcer from "@/components/app/nav-survey-swithcer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NiceAvatar from "react-nice-avatar";

import { defaultConfig } from "@/components/data/survey-data";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCurrentSurveyId, setRoleBySurveyId } = useSurveys();

  setCurrentSurveyId(Number(0));
  setRoleBySurveyId(Number(0));
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <SurveySwithcer />
        <MainNav />
        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <ThemeSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <NiceAvatar
                  style={{ width: "3rem", height: "3rem" }}
                  {...defaultConfig}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Password Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {children}
    </div>
  );
}
