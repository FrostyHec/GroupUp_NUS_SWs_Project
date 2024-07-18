"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";

//推荐已组队
//GET
//<backend>/survey/{id}/recommend/group
export function useSurveyRecommendGroup({
  token,
  surveyID,
  userID,
  pageSize,
  pageNo,
  description,
}: {
  token: string;
  surveyID: number;
  userID: number;
  pageSize: number;
  pageNo: number;
  description: string;
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL_REC}/survey/${surveyID}/recommend/group?page_size=${pageSize}&page_no=${pageNo}&user_id=${userID}&description=${description}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//推荐未组队
//GET
//<backend>/survey/{id}/recommend/ungrouped
export function useSurveyRecommendUngrouped({
  token,
  surveyID,
  userID,
  pageSize,
  pageNo,
  description,
}: {
  token: string;
  surveyID: number;
  userID: number;
  pageSize: number;
  pageNo: number;
  description: string;
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL_REC}/survey/${surveyID}/recommend/ungrouped?page_size=${pageSize}&page_no=${pageNo}&user_id=${userID}&description=${description}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//进行预组队
// GET
//<backend>/survey/{id}/recommend/pregrouping
export async function preGrouping({
  token,
  surveyID,
}: {
  token: string;
  surveyID: number;
}) {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL_REC}/survey/${surveyID}/recommend/pregrouping`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => res.data);
}
