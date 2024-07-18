import React from "react";
import { AnnouncementData } from "@/schemas/message";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AnnouncementCard: React.FC<AnnouncementData> = ({
  surveyName,
  title,
  description,
}) => {
  return (
    <Card className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
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
