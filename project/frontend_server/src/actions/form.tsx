"use server";


import { FormElementInstance } from "@/components/app/form-form-elements";
import { formSchema, formSchemaType } from "@/schemas/form";
// import prisma from "@/lib/prisma"; // Orginally the data is stored using prisma
// import { currentUser } from "@clerk/nextjs"; // Orginally the user data is managed by clerk

class UserNotFoundErr extends Error {}
class FormNotFoundErr extends Error {}

export type Form = {
  id: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  name: string;
  description: string;
  content: string;
  visits: number;
  submissions: number;
  shareURL: string;
  FormSubmissions: FormSubmission[];
};

export type FormSubmission = {
  id: number;
  createdAt: Date;
  formId: number;
  form: Form;
  content: string;
};

let forms : Array<Form> = [];

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

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }
  const { name, description } = data;
  const form = {
    id: forms.length + 1,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    name: name ? name : "Untitled Form",
    description: description ? description : "",
    content: "[]",
    visits: 0,
    submissions: 0,
    shareURL: "http://localhost:3000/forms/" + (forms.length + 1),
    FormSubmissions: [],
  };
  forms.push(form);
  console.log("Created form: ", form);
  return form.id;
}

export async function GetForms() {
  console.log("Get forms");
  return forms;
}

export async function GetFormById(id: number) {
  console.log("Get form by id: ", id);
  let formContent = forms.find((f) => f.id === id);
  return formContent;
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  console.log("Update form content id: ", id);

  let formContent = forms.find((f) => f.id === id);
  if(!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.content = jsonContent;
  formContent.updatedAt = new Date();
  return formContent;
}

export async function PublishForm(id: number) {
  console.log("Published form id: ", id)
  let formContent = forms.find((f) => f.id === id);
  if(!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.published = true;
  return formContent;
}

export async function GetFormContentByUrl(formUrl: string) {
  console.log("Get form content by url: ", formUrl);
  let formContent = forms.find((f) => f.shareURL === formUrl && f.content);
  if(!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.visits += 1;
  return formContent;
}

export async function SubmitForm(formUrl: string, content: string) {
  console.log("Submit form by url: ", formUrl);
  console.log("Content: ", content);
  let formContent = forms.find((f) => f.shareURL === formUrl);
  if(!formContent) {
    throw new FormNotFoundErr();
  }
  formContent.submissions += 1;
  formContent.FormSubmissions.push({
    id: formContent.FormSubmissions.length + 1,
    createdAt: new Date(),
    formId: formContent.id,
    form: formContent,
    content,
  });
  return formContent;
}

export async function GetFormWithSubmissions(id: number) {
  console.log("Get form with submissions: ", id);
  let formContent = forms.find((f) => f.id === id);
  if(!formContent) {
    throw new FormNotFoundErr();
  }
  return formContent;
}

