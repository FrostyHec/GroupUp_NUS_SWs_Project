"use client";
import { surveyInfo, surveyStatus } from "@/actions/survey";
import FormBuilder from "@/components/app/form-form-builder";
import DesignerContextProvider from "@/components/context/DesignerContext";
import React from "react";

async function BuilderPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const {
    data: infoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = surveyInfo({ surveyID: params.id });
  const {
    data: statusData,
    isLoading: statusLoading,
    isError: statusError,
  } = surveyStatus({ surveyID: params.id });
  if (infoIsLoading || statusLoading) return <div>Loading...</div>;
  if (infoIsError || statusError) return <div>Error</div>;
  const data = {
    ...infoData.data,
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
