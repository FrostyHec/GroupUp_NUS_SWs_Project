"use client";
import { surveyAllGroupsUpdate } from "@/actions/group";

export async function surveyGroupAddMember({
  token,
  allGroups,
  surveyID,
  groupID,
  userID,
}: {
  token: string;
  allGroups: any;
  surveyID: number;
  groupID: number;
  userID: number;
}) {
  const group = allGroups.find((group: any) => (group.id as number) == groupID);
  if (group) {
    const memberIDs = group.group_member;
    if (memberIDs.includes(userID)) {
      return;
    }
    memberIDs.push(userID);
    await surveyAllGroupsUpdate({ token, surveyID, allGroups });
  }
}

export function surveyGroupDeleteMember({
  token,
  allGroups,
  surveyID,
  groupID,
  userID,
}: {
  token: string;
  allGroups: any;
  surveyID: number;
  groupID: number;
  userID: number;
}) {
  const group = allGroups.find((group: any) => (group.id as number) == groupID);
  if (group) {
    const memberIDs = group.group_member;
    const newMemberIDs = memberIDs.filter(
      (memberID: number) => memberID !== userID
    );
    const newGroup = {
      ...group,
      group_member: newMemberIDs,
    };
    const newAllGroups = allGroups.map((group: any) =>
      group.id === groupID ? newGroup : group
    );
    surveyAllGroupsUpdate({ token, surveyID, allGroups: newAllGroups });
  }
}
