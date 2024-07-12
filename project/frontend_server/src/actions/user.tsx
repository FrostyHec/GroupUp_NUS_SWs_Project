"use client";
import useSWR from "swr";
import axios from "axios";
import {useCookies} from "next-client-cookies";

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
  const body = {
    username,
    password,
  };
  // await axios
  //   .post(`${process.env.NEXT_PUBLIC_API_URL}/user/public/register`, body)
  //   .then((res) => {
  //     return res;
  //   });
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/public/register`, body);
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
  const body = {
    username,
    password,
  };
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/user/public/login`, body)
    .then((res) => {
      return res;
    });
}

//查询用户信息
//GET
//<backend>/user/public/query
export function userUsernameSearch({ findUsername }: { findUsername: string }) {
  const cookies = useCookies();
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + cookies.get("token") },
        params: { find_username: findUsername },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/public/query`,
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
        params: { page_size: pageSize, page_no: pageNo },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/survey/own`,
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
        params: { page_size: pageSize, page_no: pageNo },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/survey/participate`,
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
        params: { page_size: pageSize, page_no: pageNo },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/announcement/received`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

//查询用户[收到]的所有组队结果
//GET
//<backend>/user/{id}/sendrequest
export function usersInfo({
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
        params: { page_size: pageSize, page_no: pageNo },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/sendrequest`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}
