"use client";
import { getFormStats } from "@/actions/survey";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { ImMakeGroup } from "react-icons/im";
import { FaWpforms } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { Separator } from "@/components/ui/separator";
import { useCookies } from "next-client-cookies";

export default function DashboardPage({params}: {params: {id: string}}) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const {data, isLoading, isError} = getFormStats({token, id: Number(params.id)});

  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper data={data} />
      </Suspense>
    </div>
  );
}

async function CardStatsWrapper({data} : {data: any}) {
  return <StatsCards loading={false} data={data} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Members"
        icon={<FaPeopleGroup  className="text-blue-600" />}
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

export function StatsCard({
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
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
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
