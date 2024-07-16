"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { Survey, surveySchema, surveySchemaType } from "@/schemas/survey";
import { toast } from "sonner";

//问卷查询
//GET
//<backend>/survey/{id}
export function surveyInfo({ surveyID }: { surveyID: number }) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//<backend>/survey
export async function surveyCreate({
  token,
  userId,
  data,
}: {
  token: string;
  userId: number;
  data: surveySchemaType;
}) {
  const validation = surveySchema.safeParse(data);
  if (!validation.success) {
    toast("Survey information invalid", {
      description: "Please check out and try again",
    });
  }
  const { name, description, group_size } = data;
  const body = {
    name: name ? name : "Untitled",
    description: description ? description : "No description",
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    personal_info: null,
    owners: [userId],
    members: [],
    questions: JSON.stringify([]), // TODO: 可能可以改成 FormElementInstance[]
    group_restriction: {
      groupSize: group_size,
    },
  };
  const result = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/survey`, body, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data);
  let newSurvey: Survey = {
    ...body,
    id: result.data.survey_id,
    status: "closed",
  };
  return newSurvey;
}

//<backend>/survey/{id}
export async function surveyUpdateInfo({
  token,
  surveyID,
  surveyInfo,
}: {
  token: string;
  surveyID: number;
  surveyInfo: any;
}) {
  return await axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}`, surveyInfo, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data);
}

//<backend>/survey/{id}/status
// Put
export async function surveyUpdateStatus({
  token,
  surveyID,
  status,
}: {
  token: string;
  surveyID: number;
  status: string;
}) {
  let statusCode: number;
  switch (status) {
    case "closed":
      statusCode = 1;
      break;
    case "archived":
      statusCode = 2;
      break;
    case "open":
      statusCode = 3;
      break;
    default:
      toast("Invalid status", {
        description: "Please check out and try again",
      });
      return null;
  }
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/status`,
      statusCode,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => res.data);
}

//<backend>/survey/{id}/status
// GET
export function surveyStatus({ surveyID }: { surveyID: number }) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/status`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//<backend>/survey/{id}
// Not used
export function surveyDelete() {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}
