"use client";
import ProfileCard from "@/components/app/info-personal-info-cards";
import ProfileChangeCard from "@/components/app/info-personal-info-change-cards";
import useSurveys from "@/components/hooks/useSurveys";
import useUser from "@/components/hooks/useUser";

export default function InfoPage({ params }: { params: { id: string } }) {
  const { role, ownSurveys, participateSurveys} = useSurveys();
  let infoData: any = null;
  if(role === "owner") {
    infoData = ownSurveys.find((survey) => survey.id === Number(params.id));
  }else if(role === "member") {
    infoData = participateSurveys.find((survey) => survey.id === Number(params.id));
  }else{
    return <div>Unauthorized</div>;
  }

  const { userID } = useUser();
  return (
    <div className="flex items-center justify-center h-screen bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
      {role === "member" && (
        <ProfileCard
          personalId={userID}
          survey={infoData}
          mode={"edit"}
        />
      )}
      {role === "owner" && <ProfileChangeCard survey={infoData} />}
    </div>
  );
}
