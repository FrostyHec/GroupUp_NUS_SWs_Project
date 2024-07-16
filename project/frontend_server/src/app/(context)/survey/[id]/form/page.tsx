"use client";
import { surveyInfo } from "@/actions/survey";
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
  const { data, isLoading, isError } = surveyInfo({ surveyID: params.id });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <DesignerContextProvider>
      <FormBuilder form={data.data} />
    </DesignerContextProvider>
  );
}

export default BuilderPage;
