"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";

//问卷查询
//GET
//<backend>/survey/{id}
export function surveyInfo({ surveyID }: { surveyID: number }) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
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
export function surveyCreate({ info }: any) {
  const response = {
    code: "200",
    msg: "success",
    data: {
      survey_id: 1,
    },
  };
  return { data: response };
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
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}`,
      { info: surveyInfo },
      { headers: { Authorization: "Bearer " + token } }
    )
    .then((res) => res.data);
}

//<backend>/survey/{id}/status
export function surveyUpdateStatus() {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}

//<backend>/survey/{id}/status
export function surveyStatus() {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}

//<backend>/survey/{id}
export function surveyDelete() {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}
