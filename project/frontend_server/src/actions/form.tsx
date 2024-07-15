import { FormElementInstance } from "@/schemas/form";
import { sampleSurvey } from "@/components/data/survey-data";
import { sampleFormSubmission } from "@/components/data/query-data";
import {
  FormSubmission,
  PersonalInfoFieldInput,
  PersonalInfoInput,
  Survey,
} from "@/schemas/survey";
import { surveySchema, surveySchemaType } from "@/schemas/survey";
import { userId } from "@/actions/user";
import { useState } from "react";
import axios from "axios";
// import prisma from "@/lib/prisma"; // Orginally the data is stored using prisma
// import { currentUser } from "@clerk/nextjs"; // Orginally the user data is managed by clerk

class FormNotFoundErr extends Error {}
class FormSubmissionNotFoundErr extends Error {}

export async function GetFormStats() {
  const visits = 0;
  const submissions = 0;
  const submissionRate = 0;
  const bounceRate = 0;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateSurvey(token: string, data: surveySchemaType) {
  const validation = surveySchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }
  const { name, description } = data;
  const survey: Survey = {
    id: sampleSurvey.length + 1,
    name: name ? name : "Untitled",
    description: description ? description : "No description",
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    published: false,
    personal_info: null,
    owners: [userId],
    members: [],
    content: "",
    status: "closed",
    group_restrictions: null,
  };
  sampleSurvey.push(survey);
  //console.log("Created survey: ", survey);
  const body = {
    name: survey.name,
    description: survey.description,
    create_at: survey.create_at,
    update_at: survey.update_at,
    personal_info: survey.personal_info,
    owners: survey.owners,
    members: survey.members,
    questions: survey.content,
    group_restriction: survey.group_restrictions,
  };
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/survey`, body, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function GetSurveys() {
  console.log("Get forms");
  return sampleSurvey;
}

export async function GetSurveyById(id: number) {
  console.log("Get form by id: ", id);
  console.log("sampleSurvey: ", sampleSurvey);
  let formContent = sampleSurvey.find((f) => f.id === id);
  return formContent;
}

export async function UpdateSurveyContent(id: number, jsonContent: string) {
  console.log("Update form content id: ", id);
  let formContent = sampleSurvey.find((f) => f.id === id);
  if (!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.content = jsonContent;
  formContent.update_at = String(new Date());
  return formContent;
}

export async function PublishForm(id: number) {
  console.log("Published form id: ", id);
  let formContent = sampleSurvey.find((f) => f.id === id);
  if (!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.status = "open";
  return formContent;
}

export async function FormSubmissionExists(id: number) {
  console.log("Check form submission exists by id: ", id);
  let formSubmission = sampleFormSubmission.find(
    (f) => f.survey_id === id && f.member_id === userId
  );
  return formSubmission;
}

export async function CreateFormSubmission(
  id: number,
  personal_info: PersonalInfoInput
) {
  console.log("Create form submission by id: ", id);
  let formContent = sampleSurvey.find((f) => f.id === id);
  if (!formContent) {
    throw new FormNotFoundErr();
  }
  let submission: FormSubmission = {
    id: sampleFormSubmission.length + 1,
    create_at: String(new Date()),
    update_at: String(new Date()),
    personal_info: personal_info,
    survey_id: id,
    member_id: userId,
    status: "edit", // Updated the status property to be of type "edit" | "done"
    content: "",
  };
  sampleFormSubmission.push(submission);
  return submission;
}

export async function SubmitForm(id: number, content: string) {
  console.log("Submit form by id: ", id);
  console.log("Content: ", content);
  let formSubmission = sampleFormSubmission.find(
    (f) => f.survey_id === id && f.member_id === userId
  );
  if (!formSubmission) {
    throw new FormSubmissionNotFoundErr();
  }
  formSubmission.content = content;
  formSubmission.update_at = String(new Date());
  formSubmission.status = "done";
  return formSubmission;
}
