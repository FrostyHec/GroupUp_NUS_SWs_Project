"use client";
import { ComponentProps, useEffect } from "react";
import { formatDistanceToNow, set } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ResponseData,
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
import { Label } from "@/components/ui/label";
import { BsInbox } from "react-icons/bs";

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

  const [combinedData, setCombinedData] = React.useState<MessageItem[]>([]);

  useEffect(() => {
    console.log(data_announcement, data_request, data_feedback);
    // 处理数据
    let announcements: AnnouncementData[] = data_announcement ? data_announcement.data.entities.map(
      (item: any) => ({
        id: item.id,
        surveyID: item.survey_id,
        type: "announcement",
        create_at: item.create_at,
        surveyName: item.survey_name,
        title: item.title,
        description: item.description,
      })
    ) : [];
    let requests: ResponseData[] = data_request ? data_request.data.list.map((item: any) => ({
      id: item.id,
      surveyID: item.survey_id,
      type: "request",
      create_at: item.create_at,
      userAvatar: item.personal_info.avatar,
      surveyName: item.survey_name,
      userName: item.user_name,
      requestText: item.request_text,
    })) : [];
    let feedbacks: FeedbackData[] = data_feedback ? data_feedback.data.list.map((item: any) => ({
      id: item.id,
      surveyID: item.survey_id,
      type: "feedback",
      create_at: item.create_at,
      surveyName: item.survey_name,
      isApproved: item.is_approved,
    })): [];
    let combined = [...announcements, ...requests, ...feedbacks];
    combined.sort(
      (a, b) => Number(new Date(b.create_at)) - Number(new Date(a.create_at))
    );
    setCombinedData(combined);
  }, [data_announcement, data_request, data_feedback]);

  if (loading_announcement || loading_request || loading_feedback) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner2 className="animate-spin h-10 w-10" /> Loading Inbox Data
      </div>
    );
  }

  const onApprove = async ({
    surveyID,
    requestID,
  }: {
    surveyID: number;
    requestID: number;
  }) => {
    // surveyAcceptOrDenyRequest
    try {
      const res = await surveyAcceptOrDenyRequest({
        surveyID,
        requestID,
        fromUserID: userID,
        isAccept: true,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const onReject = async ({
    surveyID,
    requestID,
  }: {
    surveyID: number;
    requestID: number;
  }) => {
    // surveyAcceptOrDenyRequest
    try {
      const res = await surveyAcceptOrDenyRequest({
        surveyID,
        requestID,
        fromUserID: userID,
        isAccept: false,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

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
            return (
              <RequestCard
                key={index}
                {...item}
                onApprove={onApprove}
                onReject={onReject}
              />
            );
          } else if (isFeedbackData(item)) {
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
  description,
}) => {
  return (
    <Card className="bg-white p-4 shadow-lg rounded-md border border-gray-200 h-[200px] overflow-y-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>From {surveyName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-gray-700">{description}</p>{" "}
      </CardContent>
      <CardFooter>
        <Badge key="notification" variant="default">
          Notification
        </Badge>
      </CardFooter>
    </Card>
  );
};

export const RequestCard: React.FC<ResponseData> = ({
  id,
  surveyID,
  userAvatar,
  surveyName,
  userName,
  requestText,
  onApprove,
  onReject,
}) => {
  return (
    <Card className="bg-white p-4 shadow-lg rounded-md border border-gray-200 flex items-center space-x-4">
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
          <Button
            onClick={() => onApprove({ surveyID: surveyID, requestID: id })}
            className="bg-green-200"
          >
            Accept
          </Button>
          <Button
            onClick={() => onReject({ surveyID: surveyID, requestID: id })}
            className="bg-red-200"
          >
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
  surveyName,
  isApproved,
}) => {
  return (
    <Card
      className={`bg-white p-4 shadow-lg rounded-md border border-gray-200 flex items-start space-x-4 ${
        isApproved === 0
          ? "border-gray-500"
          : isApproved === 1
          ? "border-green-500"
          : "border-red-500"
      }`}
    >
      <CardHeader>
        <div className="flex-1">
          <Label
            className={`mt-2 ${
              isApproved === 0
                ? "border-gray-500"
                : isApproved === 1
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            Feedback of your request from survey {surveyName}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex-1">
          <p className={`mt-2 text-gray-800`}>
            {isApproved === 0
              ? `Your request from survey ${surveyName} is yet to be approved`
              : isApproved === 1
              ? `Your request from survey ${surveyName} has been approved`
              : `Your request from survey ${surveyName} has been rejected`}
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
