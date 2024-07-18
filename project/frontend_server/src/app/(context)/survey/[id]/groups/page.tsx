"use client";
import {
  MoreHorizontal,
  PlusCircle,
  User,
  UserPlus,
  UserX,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  surveyGroupAddMember,
  surveyGroupDeleteMember,
} from "@/controller/survey-groups";
import { SurveyUserSearchDialog } from "@/components/app/survey-user-search-dialog";
import { Textarea } from "@/components/ui/textarea";
import { surveyAllGroups } from "@/actions/group";
import { userInfo } from "@/actions/user";
import { useCookies } from "next-client-cookies";
import { userAuthInfo } from "@/actions/user";
import { surveyInfo } from "@/actions/survey";
import ProfileCard from "@/components/app/info-personal-info-cards";
import UserAvatar from "@/components/app/user-avatar";
import FormDemonstrateComponent from "@/components/app/form-demonstrate-component";
import { toast } from "sonner";
import { preGrouping } from "@/actions/recommendation";
import { sendRequest } from "@/controller/survey-match";
import useSurveys from "@/components/hooks/useSurveys";
import useUser from "@/components/hooks/useUser";

function UsernameText({ userID }: { userID: number }) {
  const { data, isLoading, isError } = userInfo({
    userID: userID,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <p className="text-sm font-medium leading-none">{data.data.username}</p>
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

function GroupsTableForMember({
  surveyID,
  groups,
}: {
  surveyID: number;
  groups: any;
}) {
  const cookies = useCookies();
  const { userID } = useUser();
  const { role, ownSurveys, participateSurveys } = useSurveys();
  let surveyInfoData: any = null;
  if (role === "owner") {
    surveyInfoData = ownSurveys.find(
      (survey: any) => survey.id === Number(surveyID)
    );
  } else if (role === "member") {
    surveyInfoData = participateSurveys.find(
      (survey: any) => survey.id === Number(surveyID)
    );
  } else {
    return <div>Unauthorized</div>;
  }
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Groups</CardTitle>
        <CardDescription>Manage Groups.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group: any) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.id}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {group.group_member.map((memberID: number) => (
                      <div
                        key={memberID}
                        className="flex items-center space-x-4 rounded-md border p-4"
                      >
                        <HoverCard>
                          <HoverCardTrigger>
                            <UserAvatar id={memberID} />
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit">
                            <ProfileCard
                              personalId={memberID}
                              survey={surveyInfoData}
                              mode="view"
                            />
                          </HoverCardContent>
                        </HoverCard>
                        <div className="flex-1 space-y-1">
                          <UsernameText userID={memberID} />
                          <p className="text-sm text-muted-foreground">
                            Member
                          </p>
                        </div>
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DialogTrigger asChild>
                                <DropdownMenuItem>
                                  View Submission
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Form Submission</DialogTitle>
                            </DialogHeader>
                            <FormDemonstrateComponent
                              content={surveyInfoData.questions}
                              surveyId={surveyInfoData.id}
                              userID={memberID}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <RequestMessageDialog
                    callback={({ message }) =>
                      sendRequest({
                        token: cookies.get("token") as string,
                        surveyID,
                        fromUserID: userID,
                        isToGroup: true,
                        toID: group.id,
                        message,
                      })
                    }
                  >
                    <Button variant="outline">Request</Button>
                  </RequestMessageDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {groups.length} groups
        </div>
      </CardFooter>
    </Card>
  );
}

function GroupsForMember({
  surveyID,
  groupSize,
}: {
  surveyID: number;
  groupSize: number;
}) {
  const cookies = useCookies();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = surveyAllGroups({
    id: surveyID,
    pageSize: -1,
    pageNo: -1,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const allGroups = data.data.list;
  const fullGroups = allGroups.filter(
    (group: any) => group.group_member.length === groupSize
  );
  const incompleteGroups = allGroups.filter(
    (group: any) => group.group_member.length < groupSize
  );
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="full">Full</TabsTrigger>
              <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                className="h-8 gap-1"
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  preGrouping({
                    token: cookies.get("token") as string,
                    surveyID: surveyID,
                  }).then(() => {
                    toast("PreGrouping Done");
                    setLoading(false);
                  });
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  PreGrouping
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Groups
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <GroupsTableForMember surveyID={surveyID} groups={allGroups} />
          </TabsContent>
          <TabsContent value="full">
            <GroupsTableForMember surveyID={surveyID} groups={fullGroups} />
          </TabsContent>
          <TabsContent value="incomplete">
            <GroupsTableForMember
              surveyID={surveyID}
              groups={incompleteGroups}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function GroupsTable({ surveyID, groups }: { surveyID: number; groups: any }) {
  const cookies = useCookies();
  const { role, ownSurveys, participateSurveys } = useSurveys();
  let surveyInfoData: any = null;
  if (role === "owner") {
    surveyInfoData = ownSurveys.find(
      (survey: any) => survey.id === Number(surveyID)
    );
  } else if (role === "member") {
    surveyInfoData = participateSurveys.find(
      (survey: any) => survey.id === Number(surveyID)
    );
  } else {
    return <div>Unauthorized</div>;
  }
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Groups</CardTitle>
        <CardDescription>Manage Groups.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group: any) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.id}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {group.group_member.map((memberID: number) => (
                      <div
                        key={memberID}
                        className="flex items-center space-x-4 rounded-md border p-4"
                      >
                        <HoverCard>
                          <HoverCardTrigger>
                            <UserAvatar id={memberID} />
                          </HoverCardTrigger>
                          <HoverCardContent className="w-fit">
                            <ProfileCard
                              personalId={memberID}
                              survey={surveyInfoData}
                              mode="view"
                            />
                          </HoverCardContent>
                        </HoverCard>
                        <div className="flex-1 space-y-1">
                          <UsernameText userID={memberID} />
                          <p className="text-sm text-muted-foreground">
                            Member
                          </p>
                        </div>
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DialogTrigger asChild>
                                <DropdownMenuItem>
                                  View Submission
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DropdownMenuItem
                                onClick={() => {
                                  surveyGroupDeleteMember({
                                    token: cookies.get("token") as string,
                                    allGroups: groups,
                                    surveyID,
                                    groupID: group.id,
                                    userID: memberID,
                                  });
                                  toast("Deleted");
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Form Submission</DialogTitle>
                            </DialogHeader>
                            <FormDemonstrateComponent
                              content={surveyInfoData.questions}
                              surveyId={surveyInfoData.id}
                              userID={memberID}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <SurveyUserSearchDialog
                    excludeIDs={groups
                      .map((group: any) => group.group_member)
                      .flat()}
                    callback={({ userID }: { userID: number }) => {
                      surveyGroupAddMember({
                        token: cookies.get("token") as string,
                        allGroups: groups,
                        surveyID,
                        groupID: group.id,
                        userID,
                      });
                    }}
                  >
                    <Button aria-label="Add Member" variant="ghost">
                      <UserPlus />
                    </Button>
                  </SurveyUserSearchDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {groups.length} groups
        </div>
      </CardFooter>
    </Card>
  );
}

function Groups({
  surveyID,
  groupSize,
}: {
  surveyID: number;
  groupSize: number;
}) {
  const cookies = useCookies();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = surveyAllGroups({
    id: surveyID,
    pageSize: -1,
    pageNo: -1,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const allGroups = data.data.list;
  const fullGroups = allGroups.filter(
    (group: any) => group.group_member.length === groupSize
  );
  const incompleteGroups = allGroups.filter(
    (group: any) => group.group_member.length < groupSize
  );
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="full">Full</TabsTrigger>
              <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                className="h-8 gap-1"
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  preGrouping({
                    token: cookies.get("token") as string,
                    surveyID: surveyID,
                  }).then(() => {
                    toast("PreGrouping Done");
                    setLoading(false);
                  });
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  PreGrouping
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Groups
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <GroupsTable surveyID={surveyID} groups={allGroups} />
          </TabsContent>
          <TabsContent value="full">
            <GroupsTable surveyID={surveyID} groups={fullGroups} />
          </TabsContent>
          <TabsContent value="incomplete">
            <GroupsTable surveyID={surveyID} groups={incompleteGroups} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function GroupsAuth({ params }: { params: { id: number } }) {
  const { ownSurveys, participateSurveys, role } = useSurveys();
  let infoData: any = null;
  if (role === "owner") {
    const surveyInfoData = ownSurveys.find(
      (survey) => survey.id === Number(params.id)
    );
    return (
      <Groups
        surveyID={Number(params.id)}
        groupSize={surveyInfoData.group_restriction.group_size}
      />
    );
  } else if (role === "member") {
    const surveyInfoData = participateSurveys.find(
      (survey) => survey.id === Number(params.id)
    );
    return (
      <GroupsForMember
        surveyID={Number(params.id)}
        groupSize={surveyInfoData.group_restriction.group_size}
      />
    );
  } else {
    return <div>Unauthorized</div>;
  }
}
