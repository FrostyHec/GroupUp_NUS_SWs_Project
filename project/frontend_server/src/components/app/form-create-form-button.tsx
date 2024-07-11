"use client";

import { surveySchema, surveySchemaType } from "@/schemas/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
import { toast } from "../ui/use-toast";
import { CreateForm } from "@/actions/form";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function CreateFormBtn() {
  const router = useRouter();
  const form = useForm<surveySchemaType>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      name: "",
      description: "",
      personalInfo: {
        field1Label: "",
        field1Placeholder: "",
        field1Restriction: "NoRestriction",
        field1AllowModify: true,
        field2Label: "",
        field2Placeholder: "",
        field2Restriction: "NoRestriction",
        field2AllowModify: true,
        field3Label: "",
        field3Placeholder: "",
        field3Restriction: "NoRestriction",
        field3AllowModify: true,
      },
      groupSettings: {
        groupSize: 4,
      },
    },
  });

  async function onSubmit(values: surveySchemaType) {
    try {
      // const formId = await CreateForm(values);
      const formId = "123";
      console.log(values);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      router.push(`/survey/${formId}/dashboard`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
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
            <Carousel>
              <CarouselContent className="mx-auto">
                <CarouselItem>
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
                    </form>
                  </Form>
                </CarouselItem>
                <CarouselItem>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormLabel>
                        Define the fields you want your members to present at
                        their profile.
                      </FormLabel>
                      <FormDescription className="text-muted-foreground">
                        Members will be able to fill in these fields when they
                        create their profile. You can set restrictions on these
                        fields so that members will group up based on these
                        restrictions. If you do not want to allow your members
                        to modify these fields and assign them by owners only,
                        you can uncheck the allow modify checkbox.
                      </FormDescription>
                      <div className="flex columns-3">
                        <div className="m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field1AllowModify"
                            render={({ field }) => {
                              return (
                                <FormItem className="place-items-center p-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="w-1/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field1Label"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} placeholder="Label 1" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-3/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field1Placeholder"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Placeholder for Label 1"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-1/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field1Restriction"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Restriction" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="NoRestriction">
                                      Do not set as restriction
                                    </SelectItem>
                                    <SelectItem value="MustSame">
                                      Members with the same field value can
                                      group together
                                    </SelectItem>
                                    <SelectItem value="MustDifferent">
                                      Members with the different field value can
                                      group together
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex columns-3">
                        <div className="m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field2AllowModify"
                            render={({ field }) => {
                              return (
                                <FormItem className="place-items-center p-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="w-1/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field2Label"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} placeholder="Label 2" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-3/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field2Placeholder"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Placeholder for Label 2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-1/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field2Restriction"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Restriction" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="NoRestriction">
                                      Do not set as restriction
                                    </SelectItem>
                                    <SelectItem value="MustSame">
                                      Members with the same field value can
                                      group together
                                    </SelectItem>
                                    <SelectItem value="MustDifferent">
                                      Members with the different field value can
                                      group together
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex columns-3">
                        <div className="m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field3AllowModify"
                            render={({ field }) => {
                              return (
                                <FormItem className="place-items-center p-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="w-1/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field3Label"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} placeholder="Label 3" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-3/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field3Placeholder"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Placeholder for Label 3"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-1/5 m-1">
                          <FormField
                            control={form.control}
                            name="personalInfo.field3Restriction"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Restriction" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="NoRestriction">
                                      Do not set as restriction
                                    </SelectItem>
                                    <SelectItem value="MustSame">
                                      Members with the same field value can
                                      group together
                                    </SelectItem>
                                    <SelectItem value="MustDifferent">
                                      Members with the different field value can
                                      group together
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </form>
                  </Form>
                </CarouselItem>
                <CarouselItem>...</CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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
