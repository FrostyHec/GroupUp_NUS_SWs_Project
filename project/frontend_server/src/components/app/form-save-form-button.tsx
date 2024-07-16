import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "../hooks/useDesigner";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { surveyInfo, surveyUpdateInfo } from "@/actions/survey";
import { useCookies } from "next-client-cookies";

function SaveFormBtn({ id }: { id: number }) {
  const cookies = useCookies();
  const token = cookies.get("token") as string;

  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      let survey = surveyInfo({ surveyID: id });
      survey.data.content = jsonElements;
      await surveyUpdateInfo({token: token, surveyID: id, surveyInfo: survey.data});
      toast("Success", {
        description: "Your form has been saved",
      });
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            className="gap-2"
            disabled={loading}
            onClick={() => {
              startTransition(updateContent);
            }}
          >
            <HiSaveAs className="h-4 w-4" />
            {loading && <FaSpinner className="animate-spin" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={2}>
          <p className="inline-flex items-center rounded-md bg-gray-50 dark:bg-slate-600 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-50 ring-1 ring-inset ring-gray-500/10">
            Save
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SaveFormBtn;
