import { useCookies } from "next-client-cookies";

export function userSignUp({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const request = {
    username: username,
    password: password,
  };
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return response;
}

export function userLogIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const request = {
    username: username,
    password: password,
  };
  const response = {
    code: "200",
    msg: "success",
    data: {
      id: 1,
      token: "example_token",
    },
  };
  return response;
}

export function userUsernameSearch({
  find_username,
}: {
  find_username: string;
}) {
  const request = {
    find_username: find_username,
  };
  const response = {
    code: "200",
    msg: "success",
    data: {
      users: [
        {
          id: 1,
          username: "Jacob",
        },
        {
          id: 2,
          username: "Jason",
        },
      ],
    },
  };
  return response;
}
export function userAllOwnSurveys({
  page_size,
  page_no,
}: {
  page_size: number;
  page_no: number;
}) {
  const request = {
    page_size: page_size,
    page_no: page_no,
  };
  const response = {
    code: "200",
    msg: "success",
    data: {
      survey_ids: [1, 2, 3],
    },
  };
  return response;
}

export function userAllParticipateSurveys({
  page_size,
  page_no,
}: {
  page_size: number;
  page_no: number;
}) {
  const request = {
    page_size: page_size,
    page_no: page_no,
  };
  const response = {
    code: "200",
    msg: "success",
    data: {
      survey_ids: [4, 5, 6],
    },
  };
  return response;
}

export function userReceivedAnouncements({
  page_size,
  page_no,
}: {
  page_size: number;
  page_no: number;
}) {
  const request = {
    page_size: page_size,
    page_no: page_no,
  };
  const response = {
    code: "200",
    msg: "success",
    data: {
      ids: [1, 2, 3],
    },
  };
  return response;
}
