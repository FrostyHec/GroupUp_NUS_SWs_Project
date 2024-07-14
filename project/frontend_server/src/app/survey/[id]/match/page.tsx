"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { surveyGroupInfo } from "@/actions/group";
import { userInfo } from "@/actions/user";
import {
  surveyRecommendGroup,
  surveyRecommendUngrouped,
} from "@/actions/recommendation";
import { userAuthInfo } from "@/actions/user";

function GroupMember({ userID }: { userID: number }) {
  const { data, isLoading, isError } = userInfo({ userID });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <p>{data.data.username}</p>;
}

function GroupMembers({ groupInfo }: { groupInfo: any }) {
  return (
    <div className="flex flex-wrap gap-2">
      {groupInfo.member_id.map((memberID: number) => (
        <GroupMember userID={memberID} />
      ))}
    </div>
  );
}

function MatchCard({
  surveyID,
  id,
  isGroup,
}: {
  surveyID: number;
  id: number;
  isGroup: boolean;
}) {
  const {
    data: groupData,
    isLoading: groupLoading,
    isError: groupError,
  } = surveyGroupInfo({
    surveyID,
    groupID: id,
  });
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = userInfo({
    userID: id,
  });
  if (isGroup) {
    if (groupLoading) return <div>Loading...</div>;
    if (groupError) return <div>Error</div>;
    return (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <GroupMembers groupInfo={groupData.data} />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    );
  } else {
    if (userLoading) return <div>Loading...</div>;
    if (userError) return <div>Error</div>;
    return (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>{userData.data.username}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    );
  }
}

function MatchTable({
  surveyID,
  userID,
}: {
  surveyID: number;
  userID: number;
}) {
  const {
    data: groupData,
    isLoading: groupLoading,
    isError: groupError,
  } = surveyRecommendGroup({
    surveyID,
    userID,
    pageSize: -1,
    pageNo: -1,
  });
  const {
    data: ungroupedData,
    isLoading: ungroupedLoading,
    isError: ungroupedError,
  } = surveyRecommendUngrouped({
    surveyID,
    userID,
    pageSize: -1,
    pageNo: -1,
  });
  if (groupLoading || ungroupedLoading) return <div>Loading...</div>;
  if (groupError || ungroupedError) return <div>Error</div>;
  const grouped = groupData.data.list.map((group: any) => ({
    ...group,
    id: group.group_id,
    isGroup: true,
  }));
  const ungrouped = ungroupedData.data.list.map((user: any) => ({
    ...user,
    id: user.user_id,
    isGroup: false,
  }));
  const allData = [...grouped, ...ungrouped];
  allData.sort((a, b) => a.recommend - b.recommend);
  return (
    <div className="m-4 flex flex-wrap gap-4">
      {allData.map((item: any) => (
        <MatchCard surveyID={surveyID} id={item.id} isGroup={item.isGroup} />
      ))}
    </div>
  );
}

export default function Match({ params }: { params: { id: number } }) {
  const { data, isLoading, isError } = userAuthInfo();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <MatchTable surveyID={params.id} userID={data.data.user_id} />;
}
