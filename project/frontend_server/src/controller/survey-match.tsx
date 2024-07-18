import { surveyGroupRequest } from "@/actions/group";

export function sendRequest({
  token,
  surveyID,
  fromUserID,
  isToGroup,
  toID,
  message,
}: {
  token: string;
  surveyID: number;
  fromUserID: number;
  isToGroup: boolean;
  toID: number;
  message: string;
}) {
  surveyGroupRequest({
    token,
    surveyID,
    fromUserID,
    isToGroup,
    toID,
    message,
  });
}
