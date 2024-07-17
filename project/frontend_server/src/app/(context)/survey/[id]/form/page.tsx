"use client";
import { surveyInfo, surveyStatus } from "@/actions/survey";
import FormBuilder from "@/components/app/form-form-builder";
import DesignerContextProvider from "@/components/context/DesignerContext";
import React from "react";
import useSurveys from "@/components/hooks/useSurveys";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { ownSurveys, participateSurveys, role } = useSurveys();
  let infoData : any = null;
  if(role === "owner") { 
    infoData = ownSurveys.find((survey) => survey.id === Number(params.id));
  }else if(role === "member") {
    infoData = participateSurveys.find((survey) => survey.id === Number(params.id));
  }else {
    return <div>Unauthorized</div>;
  }

  const {
    data: statusData,
    isLoading: statusLoading,
    isError: statusError,
  } = surveyStatus({ surveyID: Number(params.id) });
  if (statusLoading) return <div>Loading...</div>;
  if (statusError) return <div>Error</div>;

  const data = {
    ...infoData,
    status:
      statusData.data.status === 1
        ? "closed"
        : statusData.data.status === 2
        ? "archived"
        : statusData.data.status === 3
        ? "open"
        : "invalid",
  };
  return (
    <DesignerContextProvider>
      <FormBuilder form={data} />
    </DesignerContextProvider>
  );
}

export default BuilderPage;
