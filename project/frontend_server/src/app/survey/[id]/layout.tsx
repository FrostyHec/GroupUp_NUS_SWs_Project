"use client";
import { SurveyNav } from "@/components/app/main-header";
import ThemeSwitcher from "@/components/app/nav-theme-switcher";
import SurveySwithcer from "@/components/app/nav-survey-swithcer";
import { SurveyContextProvider } from "@/components/context/SurveyContext";
import useSurveys from "@/components/hooks/useSurveys";
import { use, useEffect } from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { role, currentSurveyId, setCurrentSurveyId, setRoleBySurveyId } =
    useSurveys();

  setCurrentSurveyId(Number(params.id));
  setRoleBySurveyId(Number(params.id));

  useEffect(() => {
    console.log("Role", role);
    console.log("Current Survey Id", currentSurveyId);
  }, [role, currentSurveyId]);

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <SurveySwithcer />
        <SurveyNav />
        <ThemeSwitcher />
      </nav>
      {children}
    </div>
  );
}
