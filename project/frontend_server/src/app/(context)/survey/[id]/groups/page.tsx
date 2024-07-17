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
import { toast } from "sonner";
import { preGrouping } from "@/actions/recommendation";
import { sendRequest } from "@/controller/survey-match";

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
  const { data, isLoading, isError } = userAuthInfo();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
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
                              surveyId={surveyID}
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
                        fromUserID: data.data.user_id,
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
  params,
  groupSize,
}: {
  params: { id: number };
  groupSize: number;
}) {
  const cookies = useCookies();
  const { data, isLoading, isError } = surveyAllGroups({
    id: params.id,
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
          </div>
          <TabsContent value="all">
            <GroupsTableForMember surveyID={params.id} groups={allGroups} />
          </TabsContent>
          <TabsContent value="full">
            <GroupsTableForMember surveyID={params.id} groups={fullGroups} />
          </TabsContent>
          <TabsContent value="incomplete">
            <GroupsTableForMember
              surveyID={params.id}
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
                              surveyId={surveyID}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
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
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <SurveyUserSearchDialog
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
  params,
  groupSize,
}: {
  params: { id: number };
  groupSize: number;
}) {
  const cookies = useCookies();
  const { data, isLoading, isError } = surveyAllGroups({
    id: params.id,
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
                onClick={() =>
                  preGrouping({
                    token: cookies.get("token") as string,
                    surveyID: params.id,
                  })
                }
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
            <GroupsTable surveyID={params.id} groups={allGroups} />
          </TabsContent>
          <TabsContent value="full">
            <GroupsTable surveyID={params.id} groups={fullGroups} />
          </TabsContent>
          <TabsContent value="incomplete">
            <GroupsTable surveyID={params.id} groups={incompleteGroups} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function GroupsAuth({
  params,
  authData,
}: {
  params: { id: number };
  authData: any;
}) {
  const { data, isLoading, isError } = surveyInfo({ surveyID: params.id });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (data.data.owners.includes(authData.data.user_id)) {
    return (
      <Groups
        params={params}
        groupSize={data.data.group_restriction.group_size}
      />
    );
  } else if (data.data.members.includes(authData.data.user_id)) {
    return (
      <GroupsForMember
        params={params}
        groupSize={data.data.group_restriction.group_size}
      />
    );
  } else {
    return <div>Unauthorized</div>;
  }
}

export default function GroupsAuthProvider({
  params,
}: {
  params: { id: number };
}) {
  const { data, isLoading, isError } = userAuthInfo();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <GroupsAuth params={params} authData={data} />;
}
