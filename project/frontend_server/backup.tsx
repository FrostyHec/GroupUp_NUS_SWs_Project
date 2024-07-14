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
<Carousel>
  <CarouselContent className="mx-auto">
    <CarouselItem>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormLabel>
            Define the fields you want your members to present at their profile.
          </FormLabel>
          <FormDescription className="text-muted-foreground">
            Members will be able to fill in these fields when they create their
            profile. You can set restrictions on these fields so that members
            will group up based on these restrictions. If you do not want to
            allow your members to modify these fields and assign them by owners
            only, you can uncheck the allow modify checkbox.
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
                      <Input {...field} placeholder="Placeholder for Label 1" />
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
                          Members with the same field value can group together
                        </SelectItem>
                        <SelectItem value="MustDifferent">
                          Members with the different field value can group
                          together
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
                      <Input {...field} placeholder="Placeholder for Label 2" />
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
                          Members with the same field value can group together
                        </SelectItem>
                        <SelectItem value="MustDifferent">
                          Members with the different field value can group
                          together
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
                      <Input {...field} placeholder="Placeholder for Label 3" />
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
                          Members with the same field value can group together
                        </SelectItem>
                        <SelectItem value="MustDifferent">
                          Members with the different field value can group
                          together
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
</Carousel>;
