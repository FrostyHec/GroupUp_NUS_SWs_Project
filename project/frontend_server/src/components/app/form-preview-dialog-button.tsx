import React from "react";
import { Button } from "../ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "../hooks/useDesigner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import { FormElements } from "../../schemas/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { DialogDescription } from "@radix-ui/react-dialog";

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant={"outline"} className="gap-2">
                <MdPreview className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
            <DialogTitle className="px-4 py-4">
              <p className="text-2xl font-bold text-muted-foreground">
                Form preview
              </p>
            </DialogTitle>
            <DialogDescription className="px-4 py-2 ">
              <p className="text-sm text-muted-foreground">
                This is how your form will look like to your users.
              </p>
            </DialogDescription>
            <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
              <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
                {elements.map((element) => {
                  const FormComponent =
                    FormElements[element.type].formComponent;
                  return (
                    <FormComponent key={element.id} elementInstance={element} />
                  );
                })}
              </div>
            </div>
          </DialogContent>
          <TooltipContent side="top" sideOffset={2}>
            <p className="inline-flex items-center rounded-md bg-gray-50 dark:bg-slate-600 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-50 ring-1 ring-inset ring-gray-500/10">
              Preview
            </p>
          </TooltipContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
}

export default PreviewDialogBtn;
