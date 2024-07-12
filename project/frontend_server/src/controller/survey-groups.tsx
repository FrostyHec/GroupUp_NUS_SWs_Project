import { surveyAllGroups } from "@/actions/group";
import { usersInfo } from "@/actions/user";

export function surveyAllgroupsMembersInfo({
  surveyID: id,
}: {
  surveyID: number;
}) {
  const groups = surveyAllGroups({ id: id }).data.data.list;
  const groupMembersInfo = groups.map((group) => {
    const usernames = usersInfo(group.group_member).data.data.users;
    const members = usernames.map((username, index) => ({
      id: group.group_member[index],
      username: username.username,
    }));
    return { group_id: group.id, members };
  });
  return groupMembersInfo;
}

export function surveyGroupAddMember({
  surveyID,
  groupID,
  userID,
}: {
  surveyID: number;
  groupID: number;
  userID: number;
}) {}

export function surveyGroupDeleteMember({
  surveyID,
  groupID,
  userID,
}: {
  surveyID: number;
  groupID: number;
  userID: number;
}) {}
