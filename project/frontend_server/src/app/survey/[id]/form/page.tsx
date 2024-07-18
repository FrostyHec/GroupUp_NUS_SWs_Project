import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/app/form-form-builder";
import DesignerContextProvider from "@/components/context/DesignerContext";
import React from "react";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  console.log(params);
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }
  return (
    <DesignerContextProvider>
      <FormBuilder form={form} />
    </DesignerContextProvider>
  );
}

export default BuilderPage;
