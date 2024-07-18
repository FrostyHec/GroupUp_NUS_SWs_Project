import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import CreateFormBtn from "@/components/app/form-create-form-button";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { GetForms, Form } from "@/actions/form";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4">
        <Tabs defaultValue="owner" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="owner" className="truncate">
              Survey you created
            </TabsTrigger>
            <TabsTrigger value="member" className="truncate">
              Survey you participated in
            </TabsTrigger>
          </TabsList>
          <TabsContent value="owner">
            <Card>
              <CardHeader>
                <CardTitle>Survey you created</CardTitle>
                <CardDescription>
                  You can create a survey here and share it within an large
                  group.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateFormBtn />
                <Suspense
                  fallback={[1, 2, 3, 4].map((el) => (
                    <FormCardSkeleton key={el} />
                  ))}
                >
                  <FormCards />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="member">
            <Card>
              <CardHeader>
                <CardTitle>Survey you participated in</CardTitle>
                <CardDescription>
                  These are the surveys you participated in, you can enter and
                  group up based on the survey!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Suspense
                  fallback={[1, 2, 3, 4].map((el) => (
                    <FormCardSkeleton key={el} />
                  ))}
                >
                  <FormCards />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

async function FormCards() {
  // TODO: Implement two separate functions for owner role and member role.
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
