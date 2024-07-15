"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";

//查询组队
//GET
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
//GET
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

//修改组队集
//PUT
//<backend>/survey/{id}/allgroup
export async function surveyAllGroupsUpdate({
  token,
  surveyID,
  allGroups,
}: {
  token: string;
  surveyID: number;
  allGroups: any;
}) {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/allgroup`,
    { list: allGroups },
    { headers: { Authorization: "Bearer " + token } }
  );
}

//发起组队
//POST
//<backend>/survey/{id}/requestgroup
export async function surveyGroupRequest({
  token,
  surveyID,
  fromUserID,
  isToGroup,
  toID,
  message,
}: {
  token: string;
  surveyID: number;
  fromUserID: number;
  isToGroup: boolean;
  toID: number;
  message: string;
}) {
  const time = new Date().getTime();
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/requestgroup`,
    {
      from_id: fromUserID,
      to_group: isToGroup,
      to_id: toID,
      create_at: time,
      message,
    },
    { headers: { Authorization: "Bearer " + token } }
  );
}

//脱离组队
//DELETE
//<backend>/survey/{id}/leavegroup
export async function surveyGroupLeave({
  token,
  surveyID,
  fromUserID,
  toGroupID,
  message,
}: {
  token: string;
  surveyID: number;
  fromUserID: number;
  toGroupID: number;
  message: string;
}) {
  const time = new Date().getTime();
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/requestgroup`,
    {
      headers: { Authorization: "Bearer " + token },
      data: {
        from_id: fromUserID,
        to_group: toGroupID,
        date: time,
        message,
      },
    }
  );
}

//确认/拒绝组队邀请
//POST
//<backend>/survey/{id}/group/response
export async function surveyAcceptOrDenyRequest({
  surveyID,
  requestID,
  fromUserID,
  isAccept,
}: {
  surveyID: number;
  requestID: number;
  fromUserID: number;
  isAccept: boolean;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const time = new Date().getTime();
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/group/response`,
    {
      request_id: requestID,
      from_id: fromUserID,
      status: isAccept,
      update_at: time,
    },
    { headers: { Authorization: "Bearer " + token } }
  );
}
