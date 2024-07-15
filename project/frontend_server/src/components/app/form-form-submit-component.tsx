"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "../../schemas/form";
import { Button } from "../ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";
import { useParams } from "next/navigation";
import { Edit2Icon } from "lucide-react";

function FormSubmitComponent({
  content,
  surveyId,
}: {
  content: FormElementInstance[];
  surveyId: number;
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    console.log("submitting form");
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast("Error", {
        description: "please check the form for errors",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(surveyId, jsonContent);
      setSubmitted(true);
      toast("Success", {
        description: "Form submitted successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded-2xl">
          {content.map((element) => {
            const FormElement = FormElements[element.type].formComponent;
            return (
              <FormElement
                key={element.id}
                elementInstance={element}
                submitValue={submitValue}
                isInvalid={false}
                defaultValue={formValues.current[element.id]}
                disabled={true}
              />
            );
          })}
          <Button
            className="mt-8"
            onClick={() => {
              setSubmitted(false);
            }}
            disabled={pending}
          >
            <>
              <Edit2Icon className="mr-2 size-3" />
              Edit
            </>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded-2xl"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
              disabled={pending}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
