"use client";
import { MainNav } from "@/components/app/main-header";
import useSurveys from "@/components/hooks/useSurveys";
import ThemeSwitcher from "@/components/app/nav-theme-switcher";
import SurveySwithcer from "@/components/app/nav-survey-swithcer";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { setCurrentSurveyId, setRoleBySurveyId } = useSurveys();
  setCurrentSurveyId(Number(0));
  setRoleBySurveyId(Number(0));
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <SurveySwithcer />
        <MainNav />
        <ThemeSwitcher />
      </nav>
      {children}
    </div>
  );
}
