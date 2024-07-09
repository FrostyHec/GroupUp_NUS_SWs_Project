import React from "react";
import { FormElement } from "./form-form-elements";
import { Button } from "../ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  // The draggable hook that will be used to drag the element.
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={draggable.setNodeRef}
            variant={"outline"}
            className={cn(
              "flex flex-col gap-2 h-[60px] w-[60px] cursor-grab",
              draggable.isDragging && "ring-2 ring-primary"
            )}
            {...draggable.listeners}
            {...draggable.attributes}
          >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={5}>
          <p className="inline-flex items-center rounded-md bg-gray-50 dark:bg-slate-600 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-50 ring-1 ring-inset ring-gray-500/10">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            className="flex flex-col gap-2 h-[60px] w-[60px] cursor-grab"
          >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={5}>
          <p className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SidebarBtnElement;
