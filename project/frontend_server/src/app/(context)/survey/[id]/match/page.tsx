"use client";
import { useState } from "react";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { surveyGroupInfo } from "@/actions/group";
import { userInfo } from "@/actions/user";
import {
  surveyRecommendGroup,
  surveyRecommendUngrouped,
} from "@/actions/recommendation";
import { userAuthInfo } from "@/actions/user";
import { sendRequest } from "@/controller/survey-match";
import { useCookies } from "next-client-cookies";

function Recommend({ recommend }: { recommend: number }) {
  if (recommend > 80) {
    return (
      <p
        className={`opacity-100 bg-blue-500 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded`}
      >
        {recommend}
      </p>
    );
  } else if (recommend > 60) {
    return (
      <p
        className={`opacity-80 bg-blue-500 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded`}
      >
        {recommend}
      </p>
    );
  } else if (recommend > 40) {
    return (
      <p
        className={`opacity-60 bg-blue-500 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded`}
      >
        {recommend}
      </p>
    );
  } else {
    return (
      <p
        className={`opacity-40 bg-blue-500 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded`}
      >
        {recommend}
      </p>
    );
  }
}

function RequestMessageDialog({
  callback,
  children,
}: {
  callback: ({ message }: { message: string }) => void;
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("Message");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message</DialogTitle>
          <DialogDescription>Message</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Textarea
              id="message"
              placeholder="Type your message here."
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => callback({ message })}>Send</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
  recommend,
  fromUserID,
}: {
  surveyID: number;
  id: number;
  isGroup: boolean;
  recommend: number;
  fromUserID: number;
}) {
  const cookies = useCookies();
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
    console.log(groupData.data);
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
          <Recommend recommend={recommend} />
          <RequestMessageDialog
            callback={({ message }) =>
              sendRequest({
                token: cookies.get("token") as string,
                surveyID,
                fromUserID,
                isToGroup: true,
                toID: id,
                message,
              })
            }
          >
            <Button variant="outline">Request</Button>
          </RequestMessageDialog>
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
          <Recommend recommend={recommend} />
          <RequestMessageDialog
            callback={({ message }) =>
              sendRequest({
                token: cookies.get("token") as string,
                surveyID,
                fromUserID,
                isToGroup: false,
                toID: id,
                message,
              })
            }
          >
            <Button variant="outline">Request</Button>
          </RequestMessageDialog>
        </CardFooter>
      </Card>
    );
  }
}

function MatchTable({
  surveyID,
  fromUserID,
}: {
  surveyID: number;
  fromUserID: number;
}) {
  const {
    data: groupData,
    isLoading: groupLoading,
    isError: groupError,
  } = surveyRecommendGroup({
    surveyID,
    userID: fromUserID,
    pageSize: -1,
    pageNo: -1,
  });
  const {
    data: ungroupedData,
    isLoading: ungroupedLoading,
    isError: ungroupedError,
  } = surveyRecommendUngrouped({
    surveyID,
    userID: fromUserID,
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
  allData.sort((a, b) => b.recommend - a.recommend);
  return (
    <div className="m-4 flex flex-wrap gap-4">
      {allData.map((item: any) => (
        <MatchCard
          surveyID={surveyID}
          id={item.id}
          isGroup={item.isGroup}
          recommend={item.recommend}
          fromUserID={fromUserID}
        />
      ))}
    </div>
  );
}

export default function Match({ params }: { params: { id: number } }) {
  const { data, isLoading, isError } = userAuthInfo();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <MatchTable surveyID={params.id} fromUserID={data.data.user_id} />;
}
