"use client";
import { ComponentProps } from "react";
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
  NotificationData,
  ApplicationData,
  FeedbackData,
  MessageItem
} from "@/schemas/message";

export default function InboxMessageList() {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="container h-screen lg:w-1/2 rounded-md p-4">
        
    </ScrollArea>
  );
}

export const NotificationCard: React.FC<NotificationData> = ({
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

export const ApplicationCard: React.FC<ApplicationData> = ({
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
