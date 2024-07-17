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
import { surveyInfo, surveyUpdateInfo } from "@/actions/survey";
import useSWR from "swr";
class FormNotFoundErr extends Error {}
class FormSubmissionNotFoundErr extends Error {}

// // 调用Update Query
// export async function UpdatePersonalInfo(
//   token: string,
//   id: number,
//   personal_info: PersonalInfoInput
// ) {
//   console.log("Update personal info by id: ", id);
//   queryUpdateByUserId({ token, surveyID: id, personalInfo: personal_info });
//   if (!formSubmission) {
//     throw new FormSubmissionNotFoundErr();
//   }
//   formSubmission.personal_info = personal_info;
//   formSubmission.update_at = new Date().toISOString();
//   return formSubmission;
// }

// 调用Update Survey
export async function UpdatePersonalInfoDefine(
  token: string,
  surveyID: number,
  surveyInfo: Survey,
  personal_info: PersonalInfo
) {
  console.log("Update personal info define by id: ", surveyID);
  const newSurveyInfo = {
    ...surveyInfo,
    personal_info: personal_info,
  };
  await surveyUpdateInfo({
    token: token,
    surveyID,
    surveyInfo: newSurveyInfo,
  });
}

// 调用Update Query
export async function submitForm(
  token: string,
  id: number,
  userID: number,
  content: any,
  query: any
) {
  console.log("Submit form by id: ", id);
  console.log("Content: ", content);
  const newQuery = {
    ...query,
    questions_answer: content,
    update_at: new Date().toISOString(),
  };
  await queryUpdateByUserId({
    token: token,
    surveyID: id,
    userID: userID,
    query: newQuery,
  });
}

// // 调用Get Query
// export async function GetAvatarConfig(id: number) {
//   const submission = sampleFormSubmission.find(
//     (f) => f.survey_id === id && f.member_id === 1
//   );
//   if (!submission) {
//     console.log("No submission found for survey id: ", id);
//     return null;
//   }
//   const avatarConfig = submission.personal_info.avatar;
//   return avatarConfig;
// }
