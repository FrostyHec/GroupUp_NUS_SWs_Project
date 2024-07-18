"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";

//查询组队
//<backend>/survey/{surveyId}/group/{id}
export function surveyGroupInfo({
  surveyID,
  groupID,
}: {
  surveyID: number;
  groupID: number;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/group/${groupID}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询组队集
//<backend>/survey/{id}/allgroup
export function surveyAllGroups({
  id,
  pageSize,
  pageNo,
}: {
  id: number;
  pageSize: number;
  pageNo: number;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
        params: { page_size: pageSize, page_no: pageNo },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${id}/allgroup`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//发起组队
//<backend>/survey/{id}/requestgroup
export function surveyGroupRequest({
  surveyID,
  fromUserID,
  isToGroup,
  toID,
  message,
}: {
  surveyID: number;
  fromUserID: number;
  isToGroup: boolean;
  toID: number;
  message: string;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const time = new Date().getTime();
  const body = {
    from_id: fromUserID,
    to_group: isToGroup,
    to_id: toID,
    create_at: time,
    message,
  };
  const fetcher = (url: string) =>
    axios
      .post(url, { headers: { Authorization: "Bearer " + token }, data: body })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/requestgroup`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//脱离组队
//<backend>/survey/{id}/leavegroup
export function surveyGroupLeave({
  surveyID,
  fromUserID,
  toGroupID,
  message,
}: {
  surveyID: number;
  fromUserID: number;
  toGroupID: number;
  message: string;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const time = new Date().getTime();
  const body = {
    from_id: fromUserID,
    to_group: toGroupID,
    create_at: time,
    message,
  };
  const fetcher = (url: string) =>
    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + token },
        data: body,
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/requestgroup`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}
