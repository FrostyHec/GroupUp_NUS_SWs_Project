"use client";

import { Survey } from "@/schemas/survey";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./form-preview-dialog-button";
import PublishFormBtn from "./form-publish-form-button";
import SaveFormBtn from "./form-save-form-button";
import Designer from "./form-designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./form-drag-overlay-wrapper";
import useDesigner from "../hooks/useDesigner";
import { LoaderCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import useSurveys from "../hooks/useSurveys";
import FormSubmitComponent from "./form-form-submit-component";
import { FormElementInstance } from "@/schemas/form";

export default function FormBuilder({ form }: { form: Survey }) {
  const { elements, setElements, setSelectedElement } = useDesigner();
  const { role, currentSurveyId } = useSurveys();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    console.log("form builder form", form);
    const elements: FormElementInstance[] = JSON.parse(form.questions);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <LoaderCircle className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (role === "member") {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <FormSubmitComponent content={elements} surveyId={currentSurveyId} />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <DndContext sensors={sensors}>
        <main className="flex flex-col w-full">
          <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Form:</span>
              {form.name}
            </h2>
            <div className="flex items-center gap-2">
              <PreviewDialogBtn />
              {form.status == "closed" && (
                <>
                  <SaveFormBtn id={form.id} />
                  <PublishFormBtn id={form.id} />
                </>
              )}
            </div>
          </nav>
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
            <Designer />
          </div>
        </main>
        <DragOverlayWrapper />
      </DndContext>
    </TooltipProvider>
  );
}
