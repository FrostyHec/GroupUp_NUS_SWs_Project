"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import FieldForm from "./info-field";
import { getPersonalInfoDefine } from "@/actions/query";
import NiceAvatar, { genConfig } from "react-nice-avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import {
  PersonalInfo,
  PersonalInfoField,
  PersonalInfoInput,
} from "@/schemas/survey";
import { UpdatePersonalInfoDefine } from "@/controller/form";
import { ImSpinner2 } from "react-icons/im";

import { createContext, useReducer } from "react";
import { TbPlaceholder } from "react-icons/tb";
import { Input } from "../ui/input";
import { BiAddToQueue } from "react-icons/bi";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { Label } from "../ui/label";
import FieldList from "./info-personal-info-define-card";
import AddField from "./info-personal-info-add-card";
import { useCookies } from "next-client-cookies";
import useUser from "../hooks/useUser";
import { surveyInfo } from "@/actions/survey";

export const FieldsContext = createContext<PersonalInfoField[]>([]);
export const FieldsDispatchContext = createContext<React.Dispatch<any>>(
  () => {}
);

const ProfileChangeCard: React.FC<{ survey: any }> = ({ survey }) => {
  const config = {
    sex: "man",
    faceColor: "#AC6651",
    earSize: "big",
    eyeStyle: "smile",
    noseStyle: "long",
    mouthStyle: "peace",
    shirtStyle: "polo",
    glassesStyle: "none",
    hairColor: "#000",
    hairStyle: "thick",
    hatStyle: "none",
    hatColor: "#F48150",
    eyeBrowStyle: "up",
    shirtColor: "#77311D",
    bgColor: "linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)",
  };
  const myConfig = genConfig(config);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialFields, setInitialFields] = useState<PersonalInfoField[]>([]);
  const [fields, dispatch] = useReducer(fieldsReducer, initialFields);
  const [fieldValues, setFieldValues] = useState<string[]>([]);

  // These hooks are set for dragging components, please do not modify them.
  const boxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const cookies = useCookies();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (boxRef.current) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - boxRef.current.getBoundingClientRect().left,
        y: e.clientY - boxRef.current.getBoundingClientRect().top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);


  // Handle survey data loading and error
  useEffect(() => {
    dispatch({ type: "set", fields: survey.personal_info.fields });
  }, []);

  const handleInputChange = (index: number, newValue: string) => {
    const newValues = [...fieldValues];
    newValues[index] = newValue;
    setFieldValues(newValues);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let personalInfo: PersonalInfo = {
        fields: fields.map((field: any) => ({
          id: field.id,
          label: field.label,
          placeholder: field.placeholder,
        })),
      };
      await UpdatePersonalInfoDefine(
        cookies.get("token") as string,
        survey.id,
        survey,
        personalInfo
      );
      toast("Success", {
        description: "Your profile has been updated",
      });
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FieldsContext.Provider value={fields}>
      <FieldsDispatchContext.Provider value={dispatch}>
        <Card className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:shadow-slate-400 w-[450px] p-5">
          <CardContent>
            <div className="flex flex-col items-center my-3 space-y-4 h-1/2">
              <NiceAvatar
                style={{ width: "10rem", height: "10rem" }}
                {...myConfig}
              />
              <Button className="text-xs">Randomize an avatar</Button>
            </div>
            <div className="items-center my-3 space-y-4 h-2/3">
              {fields.map((field: any, index: number) => (
                <FieldForm
                  key={index}
                  label={field.label}
                  value={fieldValues[index]}
                  placeholder={field.placeholder}
                  editMode={false}
                  onChange={(newValue) => handleInputChange(index, newValue)}
                />
              ))}
            </div>
            <div className="items-center my-3 space-y-4 h-2/3">
              <Textarea
                placeholder="Tell others about yourself and who you want to group up with!"
                rows={3}
                value={
                  "Tell others about yourself and who you want to group up with!"
                }
                disabled={true}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></Textarea>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              {isSubmitting ? (
                <ImSpinner2 className="animate-spin h-4 w-4" />
              ) : (
                "Save changes"
              )}
            </Button>
          </CardFooter>
        </Card>
        <div
          ref={boxRef}
          onMouseDown={handleMouseDown}
          className="flex items-center justify-center cursor-move absolute"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 1000,
          }}
        >
          <Card className="rounded-2xl overflow-hidden shadow-lg dark:shadow-slate-400 p-5 w-[700ps]">
            <CardHeader>
              <CardTitle>Define the fields!</CardTitle>
              <CardDescription className="text-muted-foreground">
                Members will be able to fill in these fields when they create
                their profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddField />
              <FieldList />
            </CardContent>
          </Card>
        </div>
      </FieldsDispatchContext.Provider>
    </FieldsContext.Provider>
  );
};


function fieldsReducer(fields: PersonalInfoField[], action: any) {
  switch (action.type) {
    case "added": {
      return [
        ...fields,
        {
          id: fields.length + 1,
          label: action.label,
          placeholder: action.placeholder,
        },
      ];
    }
    case "changed": {
      return fields.map((t) => {
        if (t.id === action.field.id) {
          return action.field;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return fields.filter((t) => t.id !== action.id);
    }
    case "set": {
      return action.fields;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default ProfileChangeCard;