"use client";
import { NavBar } from "./nav-main-dashboard";
import useSurveys from "../hooks/useSurveys";
import { SurveyOwnerNav } from "./nav-survey-owner";
import { SurveyMemberNav } from "./nav-survey-member";

export function MainNav() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <NavBar />
    </header>
  );
}

export function SurveyNav() {
  const { role } = useSurveys();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {role === "owner" && <SurveyOwnerNav /> }
      {role === "member" && <SurveyMemberNav /> }
    </header>
  );
}
