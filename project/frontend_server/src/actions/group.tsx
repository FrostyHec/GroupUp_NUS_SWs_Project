"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { create } from "domain";

//查询组队
//GET
//<backend>/survey/{surveyId}/group/{id}
export function useSurveyGroupInfo({
  token,
  surveyID,
  groupID,
}: {
  token: string;
  surveyID: number;
  groupID: number;
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
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
export function useSurveyAllGroups({
  token,
  id,
  pageSize,
  pageNo,
}: {
  token: string;
  id: number;
  pageSize: number;
  pageNo: number;
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${id}/allgroup?page_size=${pageSize}&page_no=${pageNo}`,
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
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/group/requestgroup`,
    {
      from_id: fromUserID,
      to_group: isToGroup,
      to_id: toID,
      create_at: new Date().toISOString(),
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
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/group/requestgroup`,
    {
      headers: { Authorization: "Bearer " + token },
      data: {
        from_id: fromUserID,
        to_group: toGroupID,
        date: new Date().toISOString(),
        message,
      },
    }
  );
}

//确认/拒绝组队邀请
//POST
//<backend>/survey/{id}/group/response
export async function surveyAcceptOrDenyRequest({
  token,
  surveyID,
  requestID,
  fromUserID,
  isAccept,
  userID
}: {
  token: string;
  surveyID: number;
  requestID: number;
  fromUserID: number;
  isAccept: number;
  userID: number;
}) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyID}/group/response`,
    {
      request_id: requestID,
      from_id: fromUserID,
      status: isAccept,
      user_id: userID,
      create_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    },
    { headers: { Authorization: "Bearer " + token } }
  );
}
