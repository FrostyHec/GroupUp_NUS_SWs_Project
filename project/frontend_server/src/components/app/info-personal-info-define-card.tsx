"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PersonalInfoField, PersonalInfoInput } from "@/schemas/survey";
import { Input } from "../ui/input";
import { BiAddToQueue } from "react-icons/bi";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { Label } from "../ui/label";
import {
  FieldsContext,
  FieldsDispatchContext,
} from "./info-personal-info-change-cards";
import { toast } from "sonner";
import { set } from "date-fns";
import { Switch } from "../ui/switch";

export default function FieldList() {
  const tasks = useContext(FieldsContext);
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Field field={task} />
        </li>
      ))}
    </ul>
  );
}

function Field({ field }: { field: PersonalInfoField }) {
  const [isEditing, setEditing] = useState(false);
  const dispatch = useContext(FieldsDispatchContext);

  const handleSwitch = () => {
    setEditing(!isEditing);
  };

  useEffect(() => {
    console.log("isEditing changed:", isEditing);
  }, [isEditing]);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <div className="flex flex-row items-center m-2">
        <Input
          value={field.label}
          onChange={(e) => {
            dispatch({
              type: "changed",
              field: {
                ...field,
                label: e.target.value,
              },
            });
          }}
          className="w-1/4 mr-2"
        />
        <Input
          value={field.placeholder}
          onChange={(e) => {
            dispatch({
              type: "changed",
              field: {
                ...field,
                placeholder: e.target.value,
              },
            });
          }}
          className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    );
  } else {
    taskContent = (
      <div className="flex flex-row items-center m-2">
        <Label className="w-1/4 mr-2">{field.label}</Label>
        <Input
          placeholder={field.placeholder}
          disabled
          className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center">
      {taskContent}
      <Switch checked={isEditing} onCheckedChange={handleSwitch} />
      <Button
        onClick={() => {
          dispatch({
            type: "deleted",
            id: field.id,
          });
        }}
        className="w-5 h-5 ml-2"
      >
        x
      </Button>
    </div>
  );
}
