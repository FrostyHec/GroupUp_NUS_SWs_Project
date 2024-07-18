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
import { surveyAcceptOrDenyRequest } from "@/actions/group";
import { useCookies } from "next-client-cookies";
import useUser from "../hooks/useUser";
import { toast } from "sonner";

export const ResponseCard: React.FC<ResponseData> = ({
  id,
  surveyID,
  userAvatar,
  surveyName,
  fromID,
  userName,
  requestText,
  status,
}) => {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const [isSet, setIsSet] = React.useState(status !== 0);
  const { userID } = useUser();
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
        token: token,
        surveyID,
        requestID,
        fromUserID: fromID,
        isAccept: 1,
        userID: userID,
      });
      console.log(res);
      setIsSet(true);
      toast("Approved", { description: "success" });
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
        token: token,
        surveyID,
        requestID,
        fromUserID: userID,
        isAccept: 2,
        userID: userID,
      });
      console.log(res);
      setIsSet(true);
      toast("Rejected", { description: "success" });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="flex flex-col bg-white p-4 shadow-lg rounded-md border border-gray-200 flex items-center space-x-4">
      <CardHeader>
        <Avatar style={{ width: 200, height: 200 }} {...userAvatar} />
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
            className={isSet ? "bg-green-200" : "bg-green-700"}
            disabled={isSet}
          >
            Accept
          </Button>
          <Button
            onClick={() => onReject({ surveyID: surveyID, requestID: id })}
            className={isSet ? "bg-red-200" : "bg-red-700"}
            disabled={isSet}
          >
            Decline
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Badge key="application" variant="default">
          Request
        </Badge>
      </CardFooter>
    </Card>
  );
};
