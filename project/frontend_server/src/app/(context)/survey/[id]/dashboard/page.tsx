"use client";
import { useFormStats } from "@/actions/survey";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { ImMakeGroup } from "react-icons/im";
import { FaWpforms } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { Separator } from "@/components/ui/separator";
import { useCookies } from "next-client-cookies";
import { AnnouncementCard } from "@/components/app/inbox-announcement";
import { createAnnouncement, useReceiveAnnouncements } from "@/actions/message";
import useSurveys from "@/components/hooks/useSurveys";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
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
import { set, sub } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage({ params }: { params: { id: string } }) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const { data, isLoading, isError } = useFormStats({
    token,
    id: Number(params.id),
  });
  const { role } = useSurveys();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [announcements, setAnnouncements] = useState<any>(null);

  const {
    data: announcementData,
    isLoading: announcementLoading,
    isError: announcementError,
  } = useReceiveAnnouncements({
    token,
    page_size: -1,
    page_no: -1,
    surveyId: Number(params.id),
  });

  useEffect(() => {
    if (!announcementData) return;
    console.log("Getting Announcement Data", announcementData);
    setAnnouncements(announcementData.data.announcements);
  }, [announcementData, isLoading, isError]);

  const openCreate = () => {
    setOpen(true);
  };

  const createButton = async () => {
    try {
      setSubmitting(true);
      await createAnnouncement({
        token: token,
        surveyId: Number(params.id),
        title: title,
        content: content,
        emergency: 0,
      });
      setOpen(false);
      setSubmitting(false);
      toast("Announcement created successfully", {
        description: "Your announcement has been created successfully",
      });
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <p>Error loading data</p>
      </div>
    );
  }

  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper data={data} />
        <Separator />
        <Card className="container flex flex-col w-auto h-[700px] rounded-2xl m-10 overflow-y-auto">
          <CardHeader>
            <div className="flex flex-row items-center gap-4">
              <CardTitle>Announcements</CardTitle>
              {role === "owner" && (
                <Button onClick={openCreate} className="btn btn-primary">
                  Create Announcement
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex flex-col">
            {announcements?.map((announcement: any) => (
              <AnnouncementCard key={announcement.id} {...announcement} />
            ))}
          </CardContent>
        </Card>
      </Suspense>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>
              You can create an announcement here.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            disabled={submitting}
            placeholder="Please enter your title!"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            disabled={submitting}
            placeholder="Please enter your content!"
            onChange={(e) => setContent(e.target.value)}
          />
          <DialogFooter>
            <Button className="btn btn-primary" onClick={createButton}>
              {submitting && <Loader2 className="animate-spin" />}
              {!submitting && "Create Announcement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

async function CardStatsWrapper({ data }: { data: any }) {
  return <StatsCards loading={false} data={data} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof useFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Members"
        icon={<FaPeopleGroup className="text-blue-600" />}
        helperText="The number of members."
        value={data?.data.members_count.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total Groups"
        icon={<ImMakeGroup className="text-yellow-600" />}
        helperText="The number of groups."
        value={data?.data.groups_count.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-green-600" />}
        helperText="The number of submissions."
        value={data?.data.answered_member_count.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Total Grouped Members"
        icon={<GoNumber className="text-red-600" />}
        helperText="The number of grouped members."
        value={data?.data.grouped_member_count.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
