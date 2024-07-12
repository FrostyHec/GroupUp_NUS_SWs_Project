import { surveyInfo } from "@/actions/survey";
import { usersInfo } from "@/actions/user";

export function surveyAllMembersInfo({ surveyID: id }: { surveyID: number }) {
  const survey = surveyInfo({ id: id });
  const ownerIDs = survey.data.data.info.owners;
  const memberIDs = survey.data.data.info.members;
  const ownerUsernames = usersInfo(ownerIDs).data.data.users;
  const memberUsernames = usersInfo(memberIDs).data.data.users;
  const owners = ownerUsernames.map((ownerUsername, index) => ({
    id: ownerIDs[index],
    username: ownerUsername.username,
  }));
  const members = memberUsernames.map((memberUsername, index) => ({
    id: memberIDs[index],
    username: memberUsername.username,
  }));
  return {
    owners: owners,
    members: members,
  };
}
