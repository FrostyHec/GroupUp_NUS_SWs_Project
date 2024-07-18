import { z } from "zod";

const personalInfoDefineSchema = z.object({
  field1Label: z.string(),
  field1Placeholder: z.string().max(15).optional(),
  field1Restriction: z.string(),
  field1AllowModify: z.boolean(),
  field2Label: z.string(),
  field2Placeholder: z.string().max(15).optional(),
  field2Restriction: z.string(),
  field2AllowModify: z.boolean(),
  field3Label: z.string(),
  field3Placeholder: z.string().max(15).optional(),
  field3Restriction: z.string(),
  field3AllowModify: z.boolean(),
});

const groupSettingsSchema = z.object({
  groupSize: z.number().int().min(1).max(10),
});

export const surveySchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  personalInfo: personalInfoDefineSchema,
  groupSettings: groupSettingsSchema,
});

export const personalInfoSchema = z.object({
  name : z.string(),
  personId: z.number(),
  field1Input: z.string(),
  field2Input: z.string(),
  field3Input: z.string(),
  selfIntroduction: z.string().max(100)
});

export type surveySchemaType = z.infer<typeof surveySchema>;
export type personalInfoSchemaType = z.infer<typeof personalInfoSchema>;
