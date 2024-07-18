"use client";
import { useSurveyStatus } from "@/actions/survey";
import FormBuilder from "@/components/app/form-form-builder";
import DesignerContextProvider from "@/components/context/DesignerContext";
import React from "react";
import useSurveys from "@/components/hooks/useSurveys";
import {useCookies} from "next-client-cookies";
export default function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { ownSurveys, participateSurveys, role } = useSurveys();
  const cookies = useCookies();
  const {
    data: statusData,
    isLoading: statusLoading,
    isError: statusError,
  } = useSurveyStatus({
    token: cookies.get("token") as string,
    surveyID: Number(params.id) });

  let infoData : any = null;
  if(role === "owner") {
    infoData = ownSurveys.find((survey) => survey.id === Number(params.id));
  }else if(role === "member") {
    infoData = participateSurveys.find((survey) => survey.id === Number(params.id));
  }else {
    return <div>Unauthorized</div>;
  }
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
