"use client";
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
import { Suspense, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import CreateFormBtn from "@/components/app/form-create-form-button";
import { Badge } from "@/components/ui/badge";
import { formatDistance, set } from "date-fns";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import {
  Survey,
  PersonalInfoInput,
  PersonalInfoFieldInput,
} from "@/schemas/survey";
import { userId, userName } from "@/actions/user";
import { userAllOwnSurveys } from "@/actions/user";
import { userAllParticipateSurveys } from "@/actions/user";
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

import { CreateFormSubmission, FormSubmissionExists } from "@/actions/form";
import { useRouter } from "next/navigation";
import Avatar, { AvatarFullConfig, genConfig } from "react-nice-avatar";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";


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
  // const forms = userAllOwnSurveys(-1, -1); // TODO: 此处要更改为真实的数据
  const forms = sampleSurvey.filter((survey) => survey.owners.includes(userId));
  return (
    <>
      {forms.map((form) => (
        <OwnFormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function MemFormCards() {
  // const forms = userAllParticipateSurveys(); // TODO：此处要更改为真实的数据
  const forms = sampleSurvey.filter((survey) =>
    survey.members.includes(userId)
  );
  return (
    <>
      {forms.map((form) => (
        <MemFormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function OwnFormCard({ form }: { form: Survey }) {
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

function MemFormCard({ form }: { form: Survey }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const personalInfoDefine = form.personal_info?.fields;

  const [fieldValues, setFieldValues] = useState<PersonalInfoFieldInput[]>([]);
  const [avatar, setAvatar] = useState<AvatarFullConfig>(genConfig());
  const [selfInfo, setSelfInfo] = useState("");

  const router = useRouter();

  const handleButtonClick = async () => {
    const formContent = await FormSubmissionExists(form.id);
    if (formContent) {
      router.push(`/survey/${form.id}/dashboard`);
    } else {
      setIsDrawerOpen(true);
    }
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      let personalInfoInput: PersonalInfoInput = {
        avatar: avatar,
        member_id: userId,
        name: userName, // TODO: users/useAuthInfo
        self_info: selfInfo,
        fields: fieldValues,
      };
      await CreateFormSubmission(form.id, personalInfoInput);
      console.log(personalInfoInput);
      toast("Success", {
        description: "Your personal information has been saved",
      });
      setIsSubmitting(false);
      router.push(`/survey/${form.id}/dashboard`);
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  const handleAvatarChange = () => {
    setAvatar(genConfig());
  };

  const handleInputChange = (
    index: number,
    fieldId: number,
    newValue: string
  ) => {
    const newValues = [...fieldValues];
    newValues[index] = {
      id: fieldId,
      input: newValue,
    };
    setFieldValues(newValues);
  };

  return (
    <>
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
          <Button
            className="w-full mt-2 text-md gap-4"
            onClick={handleButtonClick}
          >
            View Survey <BiRightArrowAlt />
          </Button>
        </CardFooter>
      </Card>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent>
          <div className="container mx-auto w-5/6">
            <DrawerHeader>
              <DrawerTitle>Set up your personal info</DrawerTitle>
              <DrawerDescription>
                Your personal info is crucial for other users to know you!
              </DrawerDescription>
            </DrawerHeader>
            <div>
              <div className="flex flex-col items-center my-7 space-y-4 h-1/2">
                <Avatar
                  style={{ width: "10rem", height: "10rem" }}
                  {...avatar}
                />
                <Button onClick={handleAvatarChange} className="text-xs">
                  Randomize an avatar
                </Button>
              </div>
              <div className="items-center my-7 space-y-4 h-2/3">
                {personalInfoDefine !== undefined && personalInfoDefine.map((field, index) => (
                  <div className="flex flex-row items-center m-2">
                    <Label className="w-1/4 mr-2">{field.label}</Label>
                    <Input
                      type="text"
                      key={index}
                      value={fieldValues[index]?.input}
                      placeholder={field.placeholder}
                      onChange={(newValue) =>
                        handleInputChange(
                          index,
                          field.id,
                          newValue.target.value
                        )
                      }
                      className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="items-center my-7 space-y-4 h-2/3">
                <Textarea
                  placeholder="Tell others about yourself and who you want to group up with!"
                  rows={3}
                  value={selfInfo}
                  onChange={(e) => setSelfInfo(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  disabled={isSubmitting}
                >

                </Textarea>
              </div>
            </div>
            <DrawerFooter>
              <Button
                onClick={() => {
                  onSubmit();
                }}
                disabled={isSubmitting}
                className="w-full mt-4"
              >
                {!isSubmitting && <span>Save</span>}
                {isSubmitting && <ImSpinner2 className="animate-spin" />}
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
