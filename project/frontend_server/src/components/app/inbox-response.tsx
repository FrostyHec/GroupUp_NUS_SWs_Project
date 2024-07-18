import React from "react";
import { ResponseData } from "@/schemas/message";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Avatar from "react-nice-avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ResponseCard: React.FC<ResponseData> = ({
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
