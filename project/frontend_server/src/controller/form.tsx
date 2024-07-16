import { FormElementInstance } from "@/schemas/form";
import {
  FormSubmission,
  PersonalInfo,
  PersonalInfoField,
  PersonalInfoFieldInput,
  PersonalInfoInput,
  Survey,
  surveySchema,
  surveySchemaType,
} from "@/schemas/survey";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { queryGetByUserId } from "@/actions/query";
import { surveyInfo } from "@/actions/survey";
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

export function GetAllSurveysByIDLists({survey_ids} : {survey_ids: number[]}) {
  let surveys: any[] = [];
  survey_ids.forEach((id) => {
    const { data, isLoading, isError } = surveyInfo({ surveyID: id });
    if (data) {
      surveys.push(data.data.info);
    }
  });
  return surveys;
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
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    personal_info: personal_info,
    survey_id: id,
    member_id: 1,
    status: "edit", // Updated the status property to be of type "edit" | "done"
    questions_answer: JSON.stringify([]), // TODO: 可能可以改成 FormElementInstance[]
  };
  sampleFormSubmission.push(submission);
  return submission;
}

export async function UpdatePersonalInfo(
  id: number,
  personal_info: PersonalInfoInput
) {
  console.log("Update personal info by id: ", id);
  let formSubmission = sampleFormSubmission.find(
    (f) => f.survey_id === id && f.member_id === 1
  );
  if (!formSubmission) {
    throw new FormSubmissionNotFoundErr();
  }
  formSubmission.personal_info = personal_info;
  formSubmission.update_at = String(new Date());
  return formSubmission;
}

export async function UpdatePersonalInfoDefine(
  id: number,
  personal_info: PersonalInfo
) {
  console.log("Update personal info define by id: ", id);
  let formContent = sampleSurvey.find((f) => f.id === id);
  if (!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.personal_info = personal_info;
  formContent.update_at = String(new Date());
  return formContent;
}

export async function SubmitForm(id: number, content: string) {
  console.log("Submit form by id: ", id);
  console.log("Content: ", content);
  let formSubmission = sampleFormSubmission.find(
    (f) => f.survey_id === id && f.member_id === 1
  );
  if (!formSubmission) {
    throw new FormSubmissionNotFoundErr();
  }
  formSubmission.questions_answer = content;
  formSubmission.update_at = String(new Date());
  formSubmission.status = "done";
  return formSubmission;
}

export async function GetAvatarConfig(id: number) {
  const submission = sampleFormSubmission.find(
    (f) => f.survey_id === id && f.member_id === 1
  );
  if (!submission) {
    console.log("No submission found for survey id: ", id);
    return null;
  }
  const avatarConfig = submission.personal_info.avatar;
  return avatarConfig;
}

export async function GetSurveyStatus(id: number) {
  console.log("Get survey status by id: ", id);
  let formContent = sampleSurvey.find((f) => f.id === id);
  if (!formContent) {
    throw new FormNotFoundErr();
  }
  return formContent.status;
}

export async function UpdateSurveyStatus(
  id: number,
  status: "open" | "closed" | "archived"
) {
  console.log("Update survey status by id: ", id);
  let formContent = sampleSurvey.find((f) => f.id === id);
  if (!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.status = status;
  return formContent;
}
