"use client";
import axios from "axios";
import useSWR from "swr";

// <backend>/survey/{id}/announcement
// Get
export function receiveAnnouncements({
  token,
  page_size,
  page_no,
  surveyId,
}:{
  token: string,
  page_size: number,
  page_no: number,
  surveyId: number
}) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyId}/announcement?page_size=${page_size}&page_no=${page_no}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}

// <backend>/survey/{id}/announcement 
// Post
export async function createAnnouncement({
  token,
  surveyId,
  title,
  content,
  emergency,
}:{
  token: string,
  surveyId: number,
  title: string,
  content: string,
  emergency: number
}) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyId}/announcement`,
    {
      title: title,
      description: content,
      create_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
      emergency: emergency,
    },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};

// <backend>/survey/{id}/announcement/{id}
// Put
export function updateAnnouncement({
  token,
  surveyId,
  announcementId,
  title,
  content,
  emergency,
}:{
  token: string,
  surveyId: number,
  announcementId: number,
  title: string,
  content: string,
  emergency: number
}) {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyId}/announcement/${announcementId}`,
    {
      title: title,
      description: content,
      update_at: new Date().toISOString(),
      emergency: emergency,
    },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};