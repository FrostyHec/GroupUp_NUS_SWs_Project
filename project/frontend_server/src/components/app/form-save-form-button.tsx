import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { ArrowDownToLine } from 'lucide-react';
import useDesigner from "../hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { Loader } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
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
              startTransition(updateFormContent);
            }}
          >
            <ArrowDownToLine className="h-4 w-4" />
            {loading && <Loader className="animate-spin" />}
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
