import { sampleSurvey } from "@/components/data/survey-data";
import { sampleFormSubmission } from "@/components/data/query-data";
import { AvatarFullConfig, genConfig } from "react-nice-avatar";
import {
  PersonalInfo,
  PersonalInfoField,
  PersonalInfoInput,
} from "@/schemas/survey";
import axios from "axios";
import useSWR from "swr";

// Form Submission Related Methods
// <backend>/survey/{id}/query
// POST
export async function queryCreate({
  token,
  surveyID,
  personalInfo,
}: {
  token: string;
  surveyID: number;
  personalInfo: PersonalInfoInput;
}) {
  let submissions = {
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    personal_info: personalInfo,
    questions_anwswer: JSON.stringify([]),
  };
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/query`,
      submissions,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => res.data);
}

// <backend>/survey/{id}/query/{userId}
// PUT
export async function queryUpdateByUserId({
  token,
  surveyID,
  query,
}: {
  token: string;
  surveyID: number;
  query: any;
}) {
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/query/${query.member_id}`,
      query,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => res.data);
}

// <backend>/survey/{id}/query/{id}
// GET
// Return: query
export function queryGetById({
  token,
  surveyID,
  userID,
}: {
  token: string;
  surveyID: number;
  userID: number;
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/query/${userID}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

// <backend>/survey/{id}/query/user/{id}
// GET
// Return: Query
export function queryGetByUserId({
  token,
  surveyID,
  userID,
}: {
  token: string;
  surveyID: number;
  userID: number;
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/query/user/${userID}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

// <backend>/survey/{id}/query/{id}/status
// PUT
export async function queryUpdateStatus({
  token,
  surveyID,
  queryID,
  status,
}: {
  token: string;
  surveyID: number;
  queryID: number;
  status: string;
}) {
  let statusCode: number;
  switch (status) {
    case "edit":
      statusCode = 1;
      break;
    case "done":
      statusCode = 2;
      break;
    default:
      throw new Error("Invalid status");
  }
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/query/${queryID}/status`,
      statusCode,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => res.data);
}

// <backend>/survey/{id}/query/{id}/status
// GET
export function queryGetStatus({
  token,
  surveyID,
  queryID,
}: {
  token: string;
  surveyID: number;
  queryID: number;
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/query/${queryID}/status`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
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
