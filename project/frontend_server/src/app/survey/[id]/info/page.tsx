"use client";
import ProfileCard from "@/components/app/info-personal-info-cards";

export default function InfoPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-center justify-center h-screen bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
      <ProfileCard personalId={1} surveyId={Number(params.id)} />
    </div>
  );
}
