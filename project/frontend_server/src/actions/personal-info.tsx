import { sampleSurvey } from "@/components/data/survey-data";
import { sampleFormSubmission } from "@/components/data/query-data";
import { AvatarFullConfig, genConfig } from "react-nice-avatar";
import { PersonalInfo, PersonalInfoField } from "@/schemas/survey";

export type Field = {
  id: number;
  label: string;
  placeholder: string;
  input: string;
};

export type ProfileData = {
  avatar: AvatarFullConfig;
  name: string;
  self_info: string;
  fields: Field[];
};

export async function GetPersonalInfo(
  personId: number,
  surveyId: number
): Promise<ProfileData | null> {
  // TODO: Get the current survey
  const currentSurvey = sampleSurvey.filter((survey) => survey.id === surveyId);
  if (!currentSurvey) {
    throw new Error("Survey not found");
  }
  let personalInfo = currentSurvey[0].personal_info; // PersonalInfo | null

  // TODO: Get the current user's form submission
  const currentUserFormSubmission = sampleFormSubmission.filter(
    (submission) =>
      submission.member_id === personId && submission.survey_id === surveyId
  );
  if (!currentUserFormSubmission) {
    throw new Error("Submission not found");
  }
  let personalInfoInput = currentUserFormSubmission[0].personal_info; // PersonalInfoInput

  if (personalInfo === null || personalInfoInput === null) {
    return null;
  }

  const fields : Field[] = personalInfo.fields.map((field) => {
    const fieldInput = personalInfoInput.fields.find(
      (input) => input.id === field.id
    );
    return {
      id: field.id,
      label: field.label,
      placeholder: field.placeholder,
      input: fieldInput ? fieldInput.input : "",
    };
  });

  const profileData: ProfileData = {
    avatar: personalInfoInput.avatar? personalInfoInput.avatar : genConfig(),
    name: personalInfoInput.name,
    self_info: personalInfoInput.self_info,
    fields: fields,
  };

  
  return profileData;
}

export async function GetPersonalInfoDefine(
  surveyId: number
): Promise<PersonalInfoField[]> {
  const currentSurvey = sampleSurvey.filter((survey) => survey.id === surveyId);
  if (!currentSurvey) {
    throw new Error("Survey not found");
  }
  let personalInfo = currentSurvey[0].personal_info; // PersonalInfo | null

  if (personalInfo === null) {
    return [];
  }
  return personalInfo.fields;
}

