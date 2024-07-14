import { z } from "zod";
import { AvatarFullConfig } from "react-nice-avatar";
import { FormElementInstance } from "./form";

//Store in survey/form
export type PersonalInfoField = {
  id: number;
  label: string;
  placeholder: string;
};

//Store in query/formsubmission
export type PersonalInfoFieldInput = {
  id: number;
  input: string;
};

//Store in survey/form
export type PersonalInfoFieldRestriction = {
  id: number;
  restriction: "NoRestriction" | "MustSame" | "MustDifferent";
  allowModify: boolean;
}

//Store in survey/form: questions
export type PersonalInfo = {
  avatar: AvatarFullConfig | null;
  fields: PersonalInfoField [];
}

//Store in query/formsubmission
export type PersonalInfoInput = {
  avatar: AvatarFullConfig | null;
  member_id: number;
  name: string;
  self_info: string;
  fields: PersonalInfoFieldInput[];
};

//Store in survey/form: group_restrictions
export type GroupSettings = {
  groupSize: number;
  customized_restrictions: PersonalInfoFieldRestriction[];
};

export type Survey = {
  id: number;
  name: string;
  description: string;
  create_at: string;
  update_at: string;
  published: boolean;
  personal_info: PersonalInfo | null;
  owners: number[];
  members: number[];
  content: string; // Question for the survey
  status: "closed" | "archived" | "open";
  group_restrictions: GroupSettings | null;
};

export type FormSubmission = {
  id: number;
  create_at: string;
  update_at: string;
  survey_id: number;
  member_id: number;
  status: "edit" | "done";
  content: string; // Answer for the form
  personal_info: PersonalInfoInput;
};

const personalInfoDefineSchema = z.object({
  label: z.string(),
  placeholder: z.string().max(15).optional(),
});

const personalInfoRestrictionSchema = z.object({
  restriction: z.string(),
  allowModify: z.boolean(),
});

export const surveySchema = z.object({
  name: z.string().min(4),
  description: z.string().optional()
});

export type surveySchemaType = z.infer<typeof surveySchema>;
export type personalInfoSchemaType = z.infer<typeof personalInfoDefineSchema>;
export type personalInfoRestrictionSchemaType = z.infer<typeof personalInfoRestrictionSchema>;
