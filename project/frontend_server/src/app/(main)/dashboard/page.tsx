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
import { Survey } from "@/schemas/survey";
import { userAllOwnSurveys } from "@/actions/user";
import { userAllParticipateSurveys } from "@/actions/user";
import { userId } from "@/actions/user";
import { sampleSurvey } from "@/components/data/survey-data";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
                  <OwnFormCards />
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
              <CardContent className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Suspense
                  fallback={[1, 2, 3, 4].map((el) => (
                    <FormCardSkeleton key={el} />
                  ))}
                >
                  <MemFormCards />
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

function OwnFormCards() {
  // const forms = userAllOwnSurveys(-1, -1);
  const forms = sampleSurvey.filter((survey) => survey.owners.includes(userId));
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Survey }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.status === "open" && <Badge>Published</Badge>}
          {form.status === "closed" && (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
          {form.status === "archived" && (
            <Badge variant={"outline"}>Archived</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.create_at, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full mt-2 text-md gap-4">
          <Link href={`/survey/${form.id}/dashboard`}>
            View Survey <BiRightArrowAlt />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function MemFormCards() {
  // const forms = userAllParticipateSurveys();
  const forms = sampleSurvey.filter((survey) =>
    survey.members.includes(userId)
  );
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
