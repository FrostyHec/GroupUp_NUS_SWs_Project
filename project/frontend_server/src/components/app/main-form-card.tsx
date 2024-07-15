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
  personalInfoInputSchemaType,
  surveySchema,
  personalInfoInputSchema,
  PersonalInfoInput,
  PersonalInfoFieldInput,
} from "@/schemas/survey";
import { userAllOwnSurveys, userName } from "@/actions/user";
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
import { resolve } from "path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateFormSubmission, FormSubmissionExists } from "@/actions/form";
import { useRouter } from "next/navigation";
import Avatar, { AvatarFullConfig, genConfig } from "react-nice-avatar";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
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
    const personalInfoDefine = form.personal_info
      ? form.personal_info
      : { fields: [] };
    const personalInfoRestrictions = form.group_restrictions
      ? form.group_restrictions.customized_restrictions
      : [];
    const personalInfoDefineFilter = personalInfoDefine.fields.filter(
      (field) =>
        personalInfoRestrictions.find(
          (restriction) => restriction.id === field.id
        )?.allowModify === true
    );
  
    const [fieldValues, setFieldValues] = useState<PersonalInfoFieldInput[]>([]);
    const [avatar, setAvatar] = useState<AvatarFullConfig>(genConfig());
  
    const router = useRouter();
  
    const handleButtonClick = async () => {
      const formContent = await FormSubmissionExists(form.id);
      if (formContent || personalInfoDefineFilter.length === 0) {
        router.push(`/survey/${form.id}/dashboard`);
      } else {
        setIsDrawerOpen(true);
      }
    };
  
    const onSubmit = async () => {
      try{
        setIsSubmitting(true);
        let personalInfoInput: PersonalInfoInput = {
          avatar: avatar,
          member_id: userId,
          name: userName, // users/useAuthInfo
          self_info: "",
          fields: fieldValues,
        };
        await CreateFormSubmission(form.id, personalInfoInput);
        toast("Success", {
          description: "Your form has been saved",
        });
        setIsSubmitting(false);
        router.push(`/survey/${form.id}/dashboard`);
      }catch(error){
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
            asChild
            className="w-full mt-2 text-md gap-4"
            onClick={handleButtonClick}
          >
            View Survey <BiRightArrowAlt />
          </Button>
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <DrawerContent>
              <div className="container mx-auto w-5/6">
                <DrawerHeader>
                  <DrawerTitle>Set up your personal info</DrawerTitle>
                  <DrawerDescription>
                    Your personal info is crucial for other users to know you!
                  </DrawerDescription>
                </DrawerHeader>
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
                  {personalInfoDefineFilter.map((field, index) => (
                    <div>
                      <Label className="w-1/4 mr-2">{field.label}</Label>
                      <Input
                        type="text"
                        key={field.id}
                        value={fieldValues[field.id].input}
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
                <DrawerFooter>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                    disabled={isSubmitting}
                    className="w-full mt-4"
                  >
                    {!isSubmitting && <span>Save</span>}
                    {isSubmitting && (
                      <ImSpinner2 className="animate-spin" />
                    )}
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    );
  }