"use client";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import {
  FeedbackData,
  MessageItem,
  AnnouncementData,
  ResponseData,
} from "@/schemas/message";
import {
  useUserReceivedAnnouncements,
  useUserReceivedFeedback,
  useUserReceivedRequest,
} from "@/actions/user";
import useUser from "@/components/hooks/useUser";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { surveyAcceptOrDenyRequest } from "@/actions/group";
import { Label } from "@/components/ui/label";
import { BsInbox } from "react-icons/bs";
import { useCookies } from "next-client-cookies";
import { AnnouncementCard } from "@/components/app/inbox-announcement";
import { ResponseCard } from "@/components/app/inbox-response";
import { FeedbackCard } from "@/components/app/inbox-feedback";

export default function InboxPage() {
  const { userID, userName } = useUser();
  const cookies = useCookies();

  const {
    data: data_announcement,
    isLoading: loading_announcement,
    isError: error_announcement,
  } = useUserReceivedAnnouncements({
    token: cookies.get("token") as string,
    userID: userID,
    pageSize: -1,
    pageNo: -1,
  });
  const {
    data: data_request,
    isLoading: loading_request,
    isError: error_request,
  } = useUserReceivedRequest({
    token: cookies.get("token") as string,
    userID: userID,
    pageSize: -1,
    pageNo: -1,
  });
  const {
    data: data_feedback,
    isLoading: loading_feedback,
    isError: error_feedback,
  } = useUserReceivedFeedback({
    token: cookies.get("token") as string,
    userID: userID,
    pageSize: -1,
    pageNo: -1,
  });

  const [combinedData, setCombinedData] = React.useState<MessageItem[]>([]);

  useEffect(() => {
    console.log(data_announcement, data_request, data_feedback);
    // 处理数据
    let announcements: AnnouncementData[] = data_announcement
      ? data_announcement.data.entities.map((item: any) => ({
          id: item.id,
          surveyID: item.survey_id,
          type: "announcement",
          create_at: item.create_at,
          surveyName: item.survey_name,
          title: item.title,
          description: item.description,
        }))
      : [];
    let requests: ResponseData[] = data_request
      ? data_request.data.list.map((item: any) => ({
          id: item.id,
          surveyID: item.survey_id,
          type: "response",
          create_at: item.create_at,
          userAvatar: item.personal_info.avatar,
          surveyName: item.survey_name,
          fromID: item.from_id,
          userName: item.user_name,
          requestText: item.message,
          status: item.status,
        }))
      : [];
    let feedbacks: FeedbackData[] = data_feedback
      ? data_feedback.data.list.map((item: any) => ({
          id: item.id,
          surveyID: item.survey_id,
          type: "feedback",
          create_at: item.create_at,
          surveyName: item.survey_name,
          isApproved: item.status,
        }))
      : [];
    let combined = [...announcements, ...requests, ...feedbacks];
    combined.sort(
      (a, b) => Number(new Date(b.create_at)) - Number(new Date(a.create_at))
    );
    console.log("Combined Data", combined);
    setCombinedData(combined);
  }, [data_announcement, data_request, data_feedback]);

  if (loading_announcement || loading_request || loading_feedback) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner2 className="animate-spin h-10 w-10" /> Loading Inbox Data
      </div>
    );
  }

  function isAnnouncementData(item: MessageItem): item is AnnouncementData {
    return item.type === "announcement";
  }

  function isResponseData(item: MessageItem): item is ResponseData {
    return item.type === "response";
  }

  function isFeedbackData(item: MessageItem): item is FeedbackData {
    return item.type === "feedback";
  }

  return (
    <ScrollArea className="container h-screen lg:w-1/2 rounded-md p-4">
      {combinedData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <BsInbox className="h-10 w-10" />
          No Messages
        </div>
      )}
      {combinedData.length !== 0 &&
        combinedData.map((item, index) => {
          if (isAnnouncementData(item)) {
            return <AnnouncementCard key={index} {...item} />;
          } else if (isResponseData(item)) {
            return <ResponseCard key={index} {...item} />;
          } else if (isFeedbackData(item)) {
            return <FeedbackCard key={index} {...item} />;
          }
          return null;
        })}
    </ScrollArea>
  );
}
