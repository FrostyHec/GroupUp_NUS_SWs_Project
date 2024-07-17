"use client";
import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "../../schemas/form";
import { ImSpinner2 } from "react-icons/im";
import { queryGetByUserId } from "@/actions/query";
import { useCookies } from "next-client-cookies";

function FormDemonstrateComponent({
  content,
  surveyId,
  userID,
}: {
  content: FormElementInstance[];
  surveyId: number;
  userID: number;
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);
  const cookies = useCookies();

  const { data, isLoading, isError } = queryGetByUserId({
    token: cookies.get("token") as string,
    surveyID: surveyId,
    userID: userID,
  });

  useEffect(() => {
    if (data) {
      const formData = data.data;
      Object.keys(formData.questions_answer).forEach((key) => {
        formValues.current[key] = formData.questions_answer[key];
      });
      setLoading(false);
    }
  }, [data]);
  
  if (isLoading || loading){ return (
    <div className="flex items-center justify-center w-full h-screen">
      <ImSpinner2 className="animate-spin" />
    </div>
  )};

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
        </div>
      </div>
  );
}

export default FormDemonstrateComponent;
