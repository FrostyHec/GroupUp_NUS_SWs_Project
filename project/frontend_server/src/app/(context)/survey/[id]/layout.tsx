"use client";
import { SurveyNav } from "@/components/app/main-header";
import ThemeSwitcher from "@/components/app/nav-theme-switcher";
import SurveySwithcer from "@/components/app/nav-survey-swithcer";
import useSurveys from "@/components/hooks/useSurveys";
import { useEffect, useState } from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { role, currentSurveyId, setCurrentSurveyId, setRoleBySurveyId } =
    useSurveys();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentSurveyId(Number(params.id));
    setRoleBySurveyId(Number(params.id));
    console.log("Role", role);
    console.log("Current Survey Id", currentSurveyId);
    setIsLoading(false);
  }, [role, currentSurveyId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
