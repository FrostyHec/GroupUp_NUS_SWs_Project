import { surveyUpdateInfo } from "@/actions/survey";

export function surveyAddMember({
  token,
  surveyID,
  surveyInfo,
  userID,
}: {
  token: string;
  surveyID: number;
  surveyInfo: any;
  userID: number;
}) {
  surveyUpdateInfo({
    token,
    surveyID,
    surveyInfo: {
      ...surveyInfo,
      members: [...surveyInfo.members, userID],
    },
  });
}

export function surveyDeleteMember({
  token,
  surveyID,
  surveyInfo,
  userID,
}: {
  token: string;
  surveyID: number;
  surveyInfo: any;
  userID: number;
}) {
  const newSurveyMembers = surveyInfo.members.filter(
    (memberID: any) => memberID !== userID
  );
  surveyUpdateInfo({
    token,
    surveyID,
    surveyInfo: {
      ...surveyInfo,
      members: newSurveyMembers,
    },
  });
}
