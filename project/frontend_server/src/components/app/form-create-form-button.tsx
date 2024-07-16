"use client";

import { surveySchema, surveySchemaType } from "@/schemas/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useSurveys from "../hooks/useSurveys";
import { useCookies } from "next-client-cookies";
import { add } from "date-fns";
import { surveyCreate } from "@/actions/survey";
import { userAuthInfo } from "@/actions/user";
import useUser from "../hooks/useUser";

function CreateFormBtn() {
  const router = useRouter();
  const form = useForm<surveySchemaType>({
    resolver: zodResolver(surveySchema),
  });
  const { setCurrentSurveyId, setRoleBySurveyId, addOwnSurveyId } =
    useSurveys();

  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const {userID} = useUser()

  async function onSubmit(values: surveySchemaType) {
    surveyCreate({token : token, userId: userID, data: values}).then((res) => {
      try {
        addOwnSurveyId(res.data.data.survey_id);
        setCurrentSurveyId(res.data.data.survey_id);
        setRoleBySurveyId(res.data.data.survey_id);
        console.log(values);
        toast("Success", {
          description: "Form created successfully",
        });
        router.push(`/survey/${res.data.data.survey_id}/dashboard`);
      } catch (error) {
        toast("Error", {
          description: "Something went wrong, please try again later",
        });
      }
    });
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new survey
          </p>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="container mx-auto w-5/6">
          <DrawerHeader>
            <DrawerTitle>Create survey</DrawerTitle>
            <DrawerDescription>
              Create a new survey space with the following steps!
            </DrawerDescription>
          </DrawerHeader>
          <div className="mx-5 my-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="group_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Size </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DrawerFooter>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
              className="w-full mt-4"
            >
              {!form.formState.isSubmitting && <span>Save</span>}
              {form.formState.isSubmitting && (
                <ImSpinner2 className="animate-spin" />
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateFormBtn;
