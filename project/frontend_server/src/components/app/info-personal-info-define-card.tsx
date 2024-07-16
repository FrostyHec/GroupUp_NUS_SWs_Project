"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PersonalInfoField, PersonalInfoInput } from "@/schemas/survey";
import { Input } from "../ui/input";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { Label } from "../ui/label";
import {
  FieldsContext,
  FieldsDispatchContext,
} from "./info-personal-info-change-cards";
import { toast } from "sonner";
import { set } from "date-fns";
import { Switch } from "../ui/switch";
import { Toggle } from "../ui/toggle";
import { DeleteIcon } from "lucide-react";
import { LuDelete } from "react-icons/lu";

export default function FieldList() {
  const tasks = useContext(FieldsContext);
  return (
    <>
      {tasks.map((task) => (
        <Field key={task.id} field={task} />
      ))}
    </>
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
          className="mr-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    );
  } else {
    taskContent = (
      <div className="flex flex-row items-center m-2">
        <Label className="w-1/2 mr-2">{field.label}</Label>
        <Input
          placeholder={field.placeholder}
          disabled
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center">
      {taskContent}
      <div className="flex flex-row items-center m-2">
        <Toggle pressed={isEditing} onPressedChange={handleSwitch} className="w-1/2 mr-2">
          <BiEdit />
        </Toggle>
        <Button
          onClick={() => {
            dispatch({
              type: "deleted",
              id: field.id,
            });
          }}
          variant="destructive"
          size="icon"
        >
          <LuDelete size={15} />
        </Button>
      </div>
    </div>
  );
}
