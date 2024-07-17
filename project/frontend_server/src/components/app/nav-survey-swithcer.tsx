"use client";
import * as React from "react";
import { CirclePlus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useParams, usePathname } from "next/navigation";
import { userAllOwnSurveys, userAllParticipateSurveys } from "@/actions/user";
import { sampleSurvey } from "../data/survey-data";
import useSurveys from "../hooks/useSurveys";
import { MdSettingsBackupRestore } from "react-icons/md";
import { set } from "date-fns";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface WorkspaceSwitcherProps extends PopoverTriggerProps {}

// 1. 获取到当前用户的ID
// 2. 从数据库中获取到当前用户的所有的Survey
// 3. 路由有两种，如果Router当前是在Survey界面，可以获取到当前的Survey ID
// 4. 如果Router在主界面，则回到自己的看板界面
export default function SurveySwitcher() {
  const router = useRouter();
  const params = useParams();
  const {
    ownSurveys,
    participateSurveys,
    currentSurveyId,
    setCurrentSurveyId,
    setRole,
  } = useSurveys();
  const allOwnSurveys = ownSurveys
    .map((survey) => ({
      label: survey.name,
      value: String(survey.id),
    }));
  const allParticipateSurveys = participateSurveys
    .map((survey) => ({
      label: survey.name,
      value: String(survey.id),
    }));

  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent
    bg-clip-text hover:cursor-pointer"
        >
          GroupUp
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search workspace..." />
          <CommandEmpty>No survey found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                key="main"
                onSelect={() => {
                  console.log("Dashboard is selected.");
                  setCurrentSurveyId(0);
                  setOpen(false);
                  setRole("main");
                  router.push("/dashboard");
                }}
                className="text-sm hover:cursor-pointer"
              >
                Dashboard
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentSurveyId === 0 ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Survey you owned">
              {allOwnSurveys.map((survey) => (
                <CommandItem
                  key={survey.value}
                  value={survey.value}
                  onSelect={() => {
                    console.log("One owner survey is selected.");
                    setCurrentSurveyId(Number(survey.value));
                    setOpen(false);
                    setRole("owner");
                    router.push(`/survey/${survey.value}/dashboard`);
                  }}
                  className="text-sm hover:cursor-pointer"
                >
                  {survey.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentSurveyId === Number(survey.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Survey you participated in">
              {allParticipateSurveys.map((survey) => (
                <CommandItem
                  key={survey.value}
                  value={survey.value}
                  onSelect={() => {
                    console.log("One participarted survey is selected.");
                    setCurrentSurveyId(Number(survey.value));
                    setOpen(false);
                    setRole("member");
                    router.push(`/survey/${survey.value}/dashboard`);
                  }}
                  className="text-sm hover:cursor-pointer"
                >
                  {survey.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentSurveyId === Number(survey.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
