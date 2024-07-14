import { sampleSurvey } from "@/components/data/survey-data";
import { sampleFormSubmission } from "@/components/data/query-data";
import { AvatarFullConfig, genConfig } from "react-nice-avatar";
import { isFirstDayOfMonth } from "date-fns";

export type Field = {
  id: number;
  label: string;
  value: string;
  placeHolder: string;
};

export type ProfileData = {
  name: string;
  avatar: AvatarFullConfig;
  fields: Field[];
};

export async function getPersonalInfo(
  personId: number,
  surveyId: number
): Promise<ProfileData> {
  const currentSurvey = sampleSurvey.filter((survey) => survey.id === surveyId);
  if (!currentSurvey) {
    throw new Error("Survey not found");
  }
  let personalInfo = currentSurvey[0].personal_info;
  const currentUserFormSubmission = sampleFormSubmission.filter(
    (submission) =>
      submission.member_id === personId && submission.survey_id === surveyId
  );
  if (!currentUserFormSubmission) {
    throw new Error("Submission not found");
  }
  const personalInfoInput = currentUserFormSubmission[0].personal_info;
  const defaultAvatar = genConfig();
  if (personalInfo === null || personalInfoInput === null) {
    return {
      name: "",
      avatar: defaultAvatar,
      fields: [],
    };
  }

  const fields: Field[] = personalInfo.fields.map((field) => {
    const input = personalInfoInput.fields.find(
      (input) => input.id === field.id
    );
    return {
      id: field.id,
      label: field.label,
      value: input ? input.input : "",
      placeHolder: field.placeholder,
    };
  });
  return {
    name: personalInfoInput.name,
    avatar: defaultAvatar,
    fields,
  };
}
