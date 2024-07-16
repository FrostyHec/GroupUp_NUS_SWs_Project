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
import { queryGetByUserId, queryUpdateByUserId } from "@/actions/query";
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

// 调用Update Query
export async function UpdatePersonalInfo(
  token: string,
  id: number,
  personal_info: PersonalInfoInput
) {
  console.log("Update personal info by id: ", id);
  queryUpdateByUserId({ token, surveyID: id, personalInfo: personal_info });
  if (!formSubmission) {
    throw new FormSubmissionNotFoundErr();
  }
  formSubmission.personal_info = personal_info;
  formSubmission.update_at = new Date().toISOString();
  return formSubmission;
}

// 调用Update Survey
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

// 调用Update Query
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

// 调用Get Query
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
