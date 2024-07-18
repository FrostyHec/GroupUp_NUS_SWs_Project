"use client";

import React, {
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { FormElementInstance, FormElements } from "../../schemas/form";
import { Button } from "../ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { submitForm } from "@/controller/form";
import { Edit2Icon } from "lucide-react";
import {
  queryGetByUserId,
  queryGetStatus,
  queryUpdateStatus,
} from "@/actions/query";
import useUser from "../hooks/useUser";
import { useCookies } from "next-client-cookies";
import { formatDistanceStrict } from "date-fns";

function FormSubmitComponent({
  content,
  surveyId,
}: {
  content: FormElementInstance[];
  surveyId: number;
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().toISOString());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

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

  const { userID } = useUser();
  const cookies = useCookies();

  const { data, isLoading, isError } = queryGetByUserId({
    token: cookies.get("token") as string,
    surveyID: surveyId,
    userID: userID,
  });

  const {
    data: statusData,
    isLoading: statusLoading,
    isError: statusError,
  } = queryGetStatus({
    token: cookies.get("token") as string,
    surveyID: surveyId,
    userID: userID,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const formData = data.data;
    Object.keys(formData.questions_answer).forEach((key) => {
      formValues.current[key] = formData.questions_answer[key];
    });
    setLoading(false);
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (!statusData) {
      return;
    }
    setStatus(statusData.data.status);
  }, [statusData, statusLoading, statusError]);

  if (isLoading || loading || statusLoading ) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <ImSpinner2 className="animate-spin" />
      </div>
    );
  }

  const submitFormData = async () => {
    console.log("submitting form");
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().toISOString());
      toast("Error", {
        description: "please check the form for errors",
      });
      return;
    }

    try {
      await submitForm(
        cookies.get("token") as string,
        surveyId,
        userID,
        formValues.current,
        data.data
      );
      await queryUpdateStatus({
        token: cookies.get("token") as string,
        surveyID: surveyId,
        userID: userID,
        status: "done",
      });
      setSubmitted(true);
      toast("Success", {
        description: "Form submitted successfully",
      });
    } catch (error) {
      toast("Submit Error", {
        description: String(error),
      });
    }
  };

  const updateFormData = async () => {
    try {
      await queryUpdateStatus({
        token: cookies.get("token") as string,
        surveyID: surveyId,
        userID: userID,
        status: "edit",
      });
      setSubmitted(false);
      toast("Success", {
        description: "Form status updated",
      });
    } catch (error) {
      toast("Update Error", {
        description: String(error),
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
              startTransition(updateFormData);
            }}
            disabled={pending}
          >
            {!pending && <>
              <Edit2Icon className="mr-2 size-3" />
              Edit
            </>}
            {pending && <ImSpinner2 className="animate-spin" />}
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
            startTransition(submitFormData);
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
