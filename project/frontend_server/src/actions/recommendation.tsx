"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";

//推荐已组队
//GET
//<backend>/survey/{id}/recommend/group
export function surveyRecommendGroup({
  surveyID,
  userID,
  pageSize,
  pageNo,
}: {
  surveyID: number;
  userID: number;
  pageSize: number;
  pageNo: number;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/recommend/group?page_size=${pageSize}&page_no=${pageNo}&user_id=${userID}`,
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
export function surveyRecommendUngrouped({
  surveyID,
  userID,
  pageSize,
  pageNo,
}: {
  surveyID: number;
  userID: number;
  pageSize: number;
  pageNo: number;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/recommend/ungrouped?page_size=${pageSize}&page_no=${pageNo}&user_id=${userID}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//进行预组队
//POST
//<backend>/survey/{id}/pregrouping
export async function preGrouping({
  token,
  surveyID,
}: {
  token: string;
  surveyID: number;
}) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/pregrouping`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data);
}
