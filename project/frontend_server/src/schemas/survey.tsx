import { z } from "zod";
import { AvatarFullConfig } from "react-nice-avatar";
import { FormElementInstance } from "./form";
import { Avatar } from "@radix-ui/react-avatar";

export type PersonalInfoField = {
  id: number;
  label: string;
  placeholder: string;
};

//Store in survey/form: questions
export type PersonalInfo = {
  fields: PersonalInfoField [];
}

export type PersonalInfoFieldInput = {
  id: number;
  input: string;
};

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
};

export type Survey = {
  id: number;
  name: string;
  description: string;
  create_at: string;
  update_at: string;
  personal_info: PersonalInfo | null;
  owners: number[];
  members: number[];
  questions: string; // TODO: 可能可以改成 FormElementInstance[]
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
  questions_answer: string; // TODO: 可能可以改成 FormElementInstance[]
  personal_info: PersonalInfoInput;
};

export const personalInfoInputSchema = z.object({
  id: z.number(),
  input: z.string().max(20),
});

export const surveySchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  group_size: z.number().min(1).max(10),
});

export type surveySchemaType = z.infer<typeof surveySchema>;
export type personalInfoInputSchemaType = z.infer<typeof personalInfoInputSchema>;