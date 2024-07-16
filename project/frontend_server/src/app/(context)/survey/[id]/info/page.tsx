"use client";
import ProfileCard from "@/components/app/info-personal-info-cards";
import ProfileChangeCard from "@/components/app/info-personal-info-change-cards";
import useSurveys from "@/components/hooks/useSurveys";

export default function InfoPage({ params }: { params: { id: string } }) {
  const { role } = useSurveys();
  const userId = 1;
  // 
  return (
    <div className="flex items-center justify-center h-screen bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
      { role === "member" && <ProfileCard personalId={userId} surveyId={Number(params.id)} mode={"edit"}/>}
      { role === "owner" && <ProfileChangeCard surveyId={Number(params.id)} />}
    </div>
  );
}
