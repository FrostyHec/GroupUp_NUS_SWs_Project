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
  const form = surveyInfo({ surveyID: params.id});
  if (!form) {
    throw new Error("form not found");
  }
  return (
    <DesignerContextProvider>
      <FormBuilder form={form.data} />
    </DesignerContextProvider>
  );
}

export default BuilderPage;
