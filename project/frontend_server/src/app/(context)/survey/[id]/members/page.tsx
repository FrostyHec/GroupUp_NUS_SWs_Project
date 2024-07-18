"use client";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyUserSearchDialog } from "@/components/app/survey-user-search-dialog";
import { useCookies } from "next-client-cookies";
import { userAuthInfo, userInfo } from "@/actions/user";
import { surveyInfo } from "@/actions/survey";
import {
  surveyAddMember,
  surveyDeleteMember,
} from "@/controller/survey-members";
import useSurveys from "@/components/hooks/useSurveys";
import ProfileCard from "@/components/app/info-personal-info-cards";
import UserAvatar from "@/components/app/user-avatar";
import FormDemonstrateComponent from "@/components/app/form-demonstrate-component";
import { queryGetByUserId } from "@/actions/query";
import { RiProfileFill } from "react-icons/ri";

function UsernameTableCell({ userID }: { userID: number }) {
  const { data, isLoading, isError } = userInfo({
    userID,
  });
  if (isLoading) return <TableCell>Loading...</TableCell>;
  if (isError) return <TableCell>Error</TableCell>;
  return <TableCell className="font-medium">{data.data.username}</TableCell>;
}

function UsernameProfileTableCell({
  userID,
  surveyInfo,
}: {
  userID: number;
  surveyInfo: any;
}) {
  const cookies = useCookies();
  const { data, isLoading, isError } = userInfo({
    userID,
  });
  const {
    data: data_query,
    isLoading: isLoading_query,
    isError: isError_query,
  } = queryGetByUserId({
    token: cookies.get("token") as string,
    surveyID: surveyInfo.id,
    userID,
  });
  if (isLoading || isLoading_query) return <TableCell>Loading...</TableCell>;
  if (isError || isError_query) return <TableCell>Error</TableCell>;
  return (
    <TableCell className="font-medium">
      <HoverCard>
        <HoverCardTrigger>{data.data.username}</HoverCardTrigger>
        <HoverCardContent className="w-fit">
          {data_query?.data && (
            <ProfileCard personalId={userID} survey={surveyInfo} mode="view" />
          )}
          {!data_query?.data && (
            <div className="flex flex-col items-center w-[300px] h-[100px] gap-y-5">
              <RiProfileFill size={40} /> User has not created its profile yet.
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </TableCell>
  );
}

function ActionsDropdown({
  surveyInfo,
  userID,
  userRole,
}: {
  surveyInfo: any;
  userID: number;
  userRole: string;
}) {
  const cookies = useCookies();
  const { data, isLoading, isError } = queryGetByUserId({
    token: cookies.get("token") as string,
    surveyID: surveyInfo.id,
    userID,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger>
            <DropdownMenuItem
              disabled={userRole === "owner" || data.code !== 200}
            >
              View Submission
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            disabled={userRole === "owner"}
            onClick={() => {
              surveyDeleteMember({
                token: cookies.get("token") as string,
                surveyID: surveyInfo.id,
                surveyInfo,
                userID,
              });
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
          content={surveyInfo.questions}
          surveyId={surveyInfo.id}
          userID={userID}
        />
      </DialogContent>
    </Dialog>
  );
}

export function MembersTable({
  surveyID,
  surveyInfo,
  members,
}: {
  surveyID: number;
  surveyInfo: any;
  members: any;
}) {
  const cookies = useCookies();
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Manage members.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.owners.map((memberID: number) => (
              <TableRow key={memberID}>
                <TableCell>{memberID}</TableCell>
                <UsernameTableCell userID={memberID} />
                <TableCell>
                  <Badge variant="outline">Owner</Badge>
                </TableCell>
                <TableCell>
                  <ActionsDropdown
                    surveyInfo={surveyInfo}
                    userID={memberID}
                    userRole="owner"
                  />
                </TableCell>
              </TableRow>
            ))}
            {members.members.map((memberID: number) => (
              <TableRow key={memberID}>
                <TableCell>{memberID}</TableCell>
                <UsernameProfileTableCell
                  userID={memberID}
                  surveyInfo={surveyInfo}
                />
                <TableCell>
                  <Badge variant="outline">Member</Badge>
                </TableCell>
                <TableCell>
                  <ActionsDropdown
                    surveyInfo={surveyInfo}
                    userID={memberID}
                    userRole="member"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {members.owners.length} owners, {members.members.length} members
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Members({ params }: { params: { id: number } }) {
  const cookies = useCookies();
  const { role } = useSurveys();
  if (role !== "owner") return <div>Unauthorized</div>;
  const { data, isLoading, isError } = surveyInfo({ surveyID: params.id });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const allMembers = {
    owners: data.data.owners,
    members: data.data.members,
  };
  const owners = {
    owners: data.data.owners,
    members: [],
  };
  const members = {
    owners: [],
    members: data.data.members,
  };
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="owners">Owners</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <SurveyUserSearchDialog
                excludeIDs={[...data.data.owners, ...data.data.members]}
                callback={({ userID }: { userID: number }) => {
                  surveyAddMember({
                    token: cookies.get("token") as string,
                    surveyID: params.id,
                    surveyInfo: data.data,
                    userID: userID,
                  });
                }}
              >
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Members
                  </span>
                </Button>
              </SurveyUserSearchDialog>
            </div>
          </div>
          <TabsContent value="all">
            <MembersTable
              surveyID={params.id}
              surveyInfo={data.data}
              members={allMembers}
            />
          </TabsContent>
          <TabsContent value="owners">
            <MembersTable
              surveyID={params.id}
              surveyInfo={data.data}
              members={owners}
            />
          </TabsContent>
          <TabsContent value="members">
            <MembersTable
              surveyID={params.id}
              surveyInfo={data.data}
              members={members}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
