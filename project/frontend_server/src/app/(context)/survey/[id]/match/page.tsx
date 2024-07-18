"use client";
import { useEffect, useState } from "react";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { useSurveyGroupInfo } from "@/actions/group";
import {
  useSurveyRecommendGroup,
  useSurveyRecommendUngrouped,
} from "@/actions/recommendation";
import { sendRequest } from "@/controller/survey-match";
import { useCookies } from "next-client-cookies";
import UserAvatar from "@/components/app/user-avatar";
import ProfileCard from "@/components/app/info-personal-info-cards";
import useSurveys from "@/components/hooks/useSurveys";
import useUser from "@/components/hooks/useUser";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { set } from "date-fns";
import { LoaderCircle, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryGetByUserId } from "@/actions/query";
import FormDemonstrateComponent from "@/components/app/form-demonstrate-component";

function Recommend({ recommend }: { recommend: number }) {
  return (
    <p
      className={cn(
        `opacity-${recommend} w-fit bg-blue-500 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded`
      )}
    >
      {Math.round(recommend)}
    </p>
  );
}

function ActionsDropdown({
  surveyInfo,
  userID,
}: {
  surveyInfo: any;
  userID: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">View Submissions</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Form Submission</DialogTitle>
        </DialogHeader>
        <FormDemonstrateComponent
          content={surveyInfo.questions}
          surveyId={surveyInfo.id}
          userID={userID}
        />
      </DialogContent>
    </Dialog>
  );
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

function GroupMembers({
  groupInfo,
  surveyInfo,
}: {
  groupInfo: any;
  surveyInfo: any;
}) {
  return (
    <div className="flex flex-wrap -space-x-3 overflow-hidden">
      {groupInfo.member_id.map((memberID: number) => (
        <HoverCard key={memberID}>
          <HoverCardTrigger>
            <UserAvatar id={memberID} />
          </HoverCardTrigger>
          <HoverCardContent className="w-fit flex flex-col">
            <div className="flex items-center space-x-2 gap-2">
              <ProfileCard
                personalId={memberID}
                survey={surveyInfo}
                mode="view"
              />
              <ActionsDropdown surveyInfo={surveyInfo} userID={memberID} />
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}

function MatchCard({
  surveyID,
  surveyInfo,
  id,
  isGroup,
  recommend,
  fromUserID,
}: {
  surveyID: number;
  surveyInfo: any;
  id: number;
  isGroup: boolean;
  recommend: number;
  fromUserID: number;
}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const {
    data: groupData,
    isLoading: groupLoading,
    isError: groupError,
  } = useSurveyGroupInfo({
    token: token,
    surveyID,
    groupID: id,
  });
  if (isGroup) {
    if (groupLoading) return <div>Loading...</div>;
    if (groupError) return <div>Error</div>;
    return (
      <Card className="w-64">
        <CardHeader>
          <Recommend recommend={recommend} />
        </CardHeader>
        <CardContent>
          <GroupMembers groupInfo={groupData.data} surveyInfo={surveyInfo} />
        </CardContent>
        <CardFooter>
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
    return (
      <Card className="w-64">
        <CardHeader>
          <Recommend recommend={recommend} />
        </CardHeader>
        <CardContent>
          <HoverCard>
            <HoverCardTrigger>
              <UserAvatar id={id} />
            </HoverCardTrigger>
            <HoverCardContent className="w-fit flex flex-col gap-2 my-2">
              <ProfileCard personalId={id} survey={surveyInfo} mode="view" />
              <ActionsDropdown surveyInfo={surveyInfo} userID={id} />
            </HoverCardContent>
          </HoverCard>
        </CardContent>
        <CardFooter>
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

export default function Match({ params }: { params: { id: number } }) {
  const { userID } = useUser();
  const { role, ownSurveys, participateSurveys } = useSurveys();
  const [willing, setWilling] = useState("");
  const [description, setDescription] = useState("");
  const cookies = useCookies();

  const {
    data: groupData,
    isLoading: groupLoading,
    isError: groupError,
  } = useSurveyRecommendGroup({
    token: cookies.get("token") as string,
    surveyID: params.id,
    userID: userID,
    pageSize: -1,
    pageNo: -1,
    description: description,
  });
  const {
    data: ungroupedData,
    isLoading: ungroupedLoading,
    isError: ungroupedError,
  } = useSurveyRecommendUngrouped({
    token: cookies.get("token") as string,
    surveyID: params.id,
    userID: userID,
    pageSize: -1,
    pageNo: -1,
    description: description,
  });

  useEffect(() => {
    if (!groupData || !ungroupedData) return;
    if (
      groupData.code === 400 ||
      ungroupedData.code === 400 ||
      groupError ||
      ungroupedError
    ) {
      toast("Your willing grouping is invalid", {
        description: "Please try again",
      });
      setDescription("");
      setWilling("");
    }
  }, [groupData, ungroupedData]);

  let surveyInfo: any = null;
  if (role === "owner") {
    return <div>Unauthorized</div>;
  } else if (role === "member") {
    surveyInfo = participateSurveys.find(
      (survey: any) => survey.id === Number(params.id)
    );
  } else {
    return <div>Unauthorized</div>;
  }
  if (groupLoading || ungroupedLoading) {
    return (
      <div className="m-4 flex flex-wrap gap-4 w-full justify-center items-center">
        <LoaderCircle className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }
  const grouped = groupData.data
    ? groupData.data.list.map((group: any) => ({
        ...group,
        id: group.group_id,
        isGroup: true,
      }))
    : [];
  const ungrouped = ungroupedData.data
    ? ungroupedData.data.list.map((user: any) => ({
        ...user,
        id: user.user_id,
        isGroup: false,
      }))
    : [];
  const allData = [...grouped, ...ungrouped];
  allData.sort((a, b) => b.recommend - a.recommend);
  return (
    <div className="m-4 flex flex-wrap gap-4 w-full justify-center items-center">
      <div className="m-4 flex flex-wrap gap-4 w-full justify-center items-center">
        <div className="flex w-full">
          <Input
            value={willing}
            placeholder="Enter your willing grouping here"
            onChange={(e) => {
              setWilling(e.target.value);
            }}
            className="w-4/5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <Button
            onClick={() => {
              console.log(willing);
              setDescription(willing);
            }}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="gap-4 mt-4 w-full justify-center grid gric-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {allData.map((item: any) => (
          <MatchCard
            key={item.id}
            surveyID={params.id}
            surveyInfo={surveyInfo}
            id={item.id}
            isGroup={item.isGroup}
            recommend={item.recommend}
            fromUserID={userID}
          />
        ))}
      </div>
    </div>
  );
}
