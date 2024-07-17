"use client";

import React, { Suspense, use, useEffect, useState } from "react";
import FieldForm from "./info-field";
import { queryGetByUserId, queryUpdateByUserId } from "@/actions/query";
import Avatar, { genConfig } from "react-nice-avatar";
import { AvatarFullConfig } from "./info-avatar-types";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import {
  FormSubmission,
  PersonalInfo,
  PersonalInfoInput,
} from "@/schemas/survey";
import { ImSpinner2 } from "react-icons/im";
import { useCookies } from "next-client-cookies";
import { Label } from "../ui/label";

type Field = {
  id: number;
  label: string;
  placeholder: string;
  input: string;
};

type ProfileData = {
  avatar: AvatarFullConfig | null;
  name: string;
  self_info: string;
  fields: Field[];
};

const defaultProfileData: ProfileData = {
  avatar: genConfig(),
  name: "",
  self_info: "",
  fields: [],
};

interface ProfileCardProps {
  personalId: number;
  survey: any;
  mode: "edit" | "view"; // Personal ID 是本人可以Edit 如果不是本人不能Edit 只能查看信息
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  personalId,
  survey,
  mode,
}) => {
  // 预载信息
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [avatar, setAvatar] = useState<AvatarFullConfig | null>(null);
  const [selfInfo, setSelfInfo] = useState<string>("");
  const [fieldValues, setFieldValues] = useState<Field[]>([]);

  const surveyId = survey.id;
  const {
    data: data_query,
    isLoading: isLoading_query,
    isError: isError_query,
  } = queryGetByUserId({
    token: token,
    surveyID: surveyId,
    userID: personalId,
  }); // From @/actions/query
  useEffect(() => {
    if (!data_query) return;
    setFieldValues(
      survey.personal_info.fields.map((field: any) => {
        let result: Field = {
          id: field.id,
          label: field.label,
          placeholder: field.placeholder,
          input: data_query.data.personal_info.fields.find(
            (e: any) => e.id === field.id
          ).input,
        };
        return result;
      })
    );
    setAvatar(data_query.data.personal_info.avatar);
    setSelfInfo(data_query.data.personal_info.self_info);
    setLoading(false);
  }, [data_query]);

  if (isLoading_query) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <LoaderCircle className="animate-spin h-12 w-12" /> User Profile Loading
      </div>
    );
  }

  if (isError_query) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        Error loading
      </div>
    );
  }

  const handleInputChange = (index: number, newValue: string) => {
    const newValues = [...fieldValues];
    newValues[index].input = newValue;
    setFieldValues(newValues);
  };

  const handleAvatarChange = () => {
    setAvatar(genConfig());
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      let personalInfoInput: PersonalInfoInput = {
        avatar: avatar,
        member_id: data_query.data.personal_info.member_id,
        name: data_query.data.personal_info.name,
        self_info: selfInfo,
        fields: fieldValues.map((field, index) => ({
          id: field.id as number,
          input: field.input,
        })),
      };
      console.log("Submitting data: ", personalInfoInput, data_query.data);
      let updatedFormSubmission = {
        ...data_query.data,
        member_id: data_query.data.personal_info.member_id,
        personal_info: personalInfoInput,
        update_at: new Date().toISOString(),
      };
      await queryUpdateByUserId({
        token: cookies.get("token") as string,
        surveyID: surveyId,
        userID: personalId,
        query: updatedFormSubmission,
      });
      console.log(updatedFormSubmission);
      toast("Success", {
        description: "Your personal information has been saved",
      });
      setIsSubmitting(false);
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  return (
    <Card className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:shadow-slate-400 w-[450px] p-5">
      <CardContent>
        <Suspense
          fallback={<LoaderCircle className="animate-spin h-12 w-12" />}
        >
          <div className="flex flex-col items-center my-5 space-y-4 h-1/2">
            <Avatar style={{ width: "10rem", height: "10rem" }} {...avatar} />
            <Label>{data_query.data?.personal_info.name}</Label>
            {mode === "edit" && (
              <Button onClick={handleAvatarChange} className="text-xs">
                Randomize an avatar
              </Button>
            )}
          </div>
          <div className="items-center my-3 space-y-4 h-2/3">
            {data_query.data?.personal_info.fields.map((field:any, index:any) => (
              <FieldForm
                key={index}
                label={field.label}
                value={fieldValues[index].input}
                placeholder={field.placeholder}
                editMode={mode === "edit"}
                onChange={(newValue) => handleInputChange(index, newValue)}
              />
            ))}
          </div>
          <div className="items-center my-3 space-y-4 h-2/3">
            <Textarea
              placeholder="Tell others about yourself and who you want to group up with!"
              rows={3}
              value={selfInfo}
              onChange={(e) => setSelfInfo(e.target.value)}
              disabled={mode !== "edit"}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            ></Textarea>
          </div>
          <div className="items-center my-1 space-y-4 h-2/3">
            {mode === "edit" && (
              <Button
                onClick={() => {
                  onSubmit();
                }}
                disabled={isSubmitting}
                className="w-full mt-4"
              >
                {!isSubmitting && <span>Save</span>}
                {isSubmitting && <ImSpinner2 className="animate-spin" />}
              </Button>
            )}
          </div>
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
