"use client";
import { ComponentProps, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, mails } from "@/components/data/inbox-data";
import { useMail } from "@/actions/message";
import Avatar from "react-nice-avatar";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FeedbackData,
  MessageItem,
  AnnouncementData,
  RequestData,
} from "@/schemas/message";
import {
  userReceivedAnouncements,
  userReceivedFeedback,
  userReceivedRequest,
} from "@/actions/user";
import useUser from "@/components/hooks/useUser";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { surveyAcceptOrDenyRequest } from "@/actions/group";

export default function InboxPage() {
  const { userID, userName } = useUser();

  const {
    data: data_announcement,
    isLoading: loading_announcement,
    isError: error_announcement,
  } = userReceivedAnouncements({ userID: userID, pageSize: -1, pageNo: -1 });
  const {
    data: data_request,
    isLoading: loading_request,
    isError: error_request,
  } = userReceivedRequest({ userID: userID, pageSize: -1, pageNo: -1 });
  const {
    data: data_feedback,
    isLoading: loading_feedback,
    isError: error_feedback,
  } = userReceivedFeedback({ userID: userID, pageSize: -1, pageNo: -1 });

  useEffect(() => {
    if (!data_announcement) return;
    if (!data_request) return;
    if (!data_feedback) return;
  }, [data_announcement, data_request, data_feedback]);

  if (loading_announcement || loading_request || loading_feedback) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner2 className="animate-spin h-10 w-10" /> Loading Inbox Data
      </div>
    );
  }
  // 合并并排序所有数据
  const combinedData = [
    ...data_announcement.map((item : any) => ({ ...item, type: "announcement" })),
    ...data_request.map((item : any) => ({ ...item, type: "request" })),
    ...data_feedback.map((item : any) => ({ ...item, type: "feedback" })),
  ];

  combinedData.sort((a, b) => Number(new Date(b.timestamp)) - Number(new Date(a.timestamp)));

  const onApprove = async (item: MessageItem) => {
    // surveyAcceptOrDenyRequest
    try{
      const res = await surveyAcceptOrDenyRequest({
        surveyID: item.surveyID,
        requestID: item.id,
        fromUserID: userID,
        isAccept: true,
      });
      console.log(res);
    }catch (error) {
      console.error(error);
    }
    console.log("Approve", item);
  }

  const onReject = async (item: MessageItem) => {
    // surveyAcceptOrDenyRequest
    try{
      const res = await surveyAcceptOrDenyRequest({
        surveyID: item.surveyID,
        requestID: item.id,
        fromUserID: userID,
        isAccept: false,
      });
      console.log(res);
    }catch (error) {
      console.error(error);
    }
    console.log("Reject", item);
  }


  return (
    <ScrollArea className="container h-screen lg:w-1/2 rounded-md p-4">
      {combinedData.map((item, index) => {
        if (item.type === "announcement") {
          return <AnnouncementCard key={index} {...item} />;
        }
        if (item.type === "request") {
          return <RequestCard key={index} {...item} onApprove={onApprove} onReject={onReject} />;
        }
        if (item.type === "feedback") {
          return <FeedbackCard key={index} {...item} />;
        }
        return null;
      })}
    </ScrollArea>
  );
}

export const AnnouncementCard: React.FC<AnnouncementData> = ({
  surveyName,
  title,
  content,
}) => {
  return (
    <Card className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{surveyName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-gray-700">{content}</p>{" "}
      </CardContent>
      <CardFooter>
        <Badge key="notification" variant="outline">
          Notification
        </Badge>
      </CardFooter>
    </Card>
  );
};

export const RequestCard: React.FC<RequestData> = ({
  userAvatar,
  surveyName,
  userName,
  requestText,
  onApprove,
  onReject,
}) => {
  return (
    <Card className="bg-white p-4 shadow-lg rounded-md border border-gray-200 flex items-start space-x-4">
      <CardHeader>
        <Avatar style={{ width: 20, height: 20 }} {...userAvatar} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{userName}</h3>
          <p className="text-gray-700 mt-1">{surveyName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mt-2">{requestText}</p>
        <div className="mt-4 flex space-x-2">
          <Button onClick={onApprove} className="bg-green-200">
            Accept
          </Button>
          <Button onClick={onReject} className="bg-red-200">
            Decline
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Badge key="application" variant="default">
          Application
        </Badge>
      </CardFooter>
    </Card>
  );
};

export const FeedbackCard: React.FC<FeedbackData> = ({
  userAvatar,
  surveyName,
  approverName,
  isApproved,
}) => {
  return (
    <Card
      className={`bg-white p-4 shadow-lg rounded-md border border-gray-200 flex items-start space-x-4 ${
        isApproved ? "border-green-500" : "border-red-500"
      }`}
    >
      <CardHeader>
        <Avatar style={{ width: 20, height: 20 }} {...userAvatar} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{approverName}</h3>
          <p className="text-gray-700 mt-1">{surveyName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex-1">
          <p
            className={`mt-2 ${isApproved ? "text-green-500" : "text-red-500"}`}
          >
            {isApproved
              ? `I have accepted your request!`
              : `Sorry, I can't accept your request.`}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Badge key="feedback" variant="secondary">
          Feedback
        </Badge>
      </CardFooter>
    </Card>
  );
};
