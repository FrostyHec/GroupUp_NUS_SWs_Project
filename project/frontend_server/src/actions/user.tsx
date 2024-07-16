"use client";
import useSWR from "swr";
import axios from "axios";
import { useCookies } from "next-client-cookies";

//用户注册
//POST
//<backend>/user/public/register
export async function userSignUp({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/public/register`,
    {
      username,
      password,
    }
  );
}

//用户登录
//POST
//<backend>/user/public/login
export async function userLogIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/public/login`,
    {
      username,
      password,
    }
  );
}

//查询用户信息
//GET
//<backend>/user/public/query
export function userUsernameSearch({ findUsername }: { findUsername: string }) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/public/query?find_username=${findUsername}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询用户own的问卷
//GET
//<backend>/user/{id}/survey/own
export function userAllOwnSurveys({
  userID,
  pageSize,
  pageNo,
}: {
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
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/survey/own?page_size=${pageSize}&page_no=${pageNo}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询用户participate的问卷
//GET
//<backend>/user/{id}/survey/participate
export function userAllParticipateSurveys({
  userID,
  pageSize,
  pageNo,
}: {
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
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/survey/participate?page_size=${pageSize}&page_no=${pageNo}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询用户[收到]的所有公告
//GET
//<backend>/user/{id}/announcement/received
export function userReceivedAnouncements({
  userID,
  pageSize,
  pageNo,
}: {
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
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/announcement/received?page_size=${pageSize}&page_no=${pageNo}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询用户[发起]的所有组队的结果
//GET
//<backend>/user/{id}/sendrequest
export function userSentRequest({
  userID,
  pageSize,
  pageNo,
}: {
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
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/sendrequest?page_size=${pageSize}&page_no=${pageNo}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询用户[收到]的所有组队请求
//GET
//<backend>/user/{id}/receivedrequest
export function userReceivedRequest({
  userID,
  pageSize,
  pageNo,
}: {
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
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/receivedrequest?page_size=${pageSize}&page_no=${pageNo}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询用户公开信息
//GET
//<backend>/queryuserout
export function userInfo({ userID }: { userID: number }) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/queryuserout?user_id=${userID}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询Auth对应用户
//GET
//<backend>/user/getbyauth
export function userAuthInfo() {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getbyauth`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}
