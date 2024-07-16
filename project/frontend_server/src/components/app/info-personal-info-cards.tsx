"use client";

import React, { useEffect, useState } from "react";
import FieldForm from "./info-field";
import { queryGetById, queryUpdateByUserId } from "@/actions/query";
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
import { UpdatePersonalInfo } from "@/controller/form";
import { ImSpinner2 } from "react-icons/im";
import { useCookies } from "next-client-cookies";
import useUser from "../hooks/useUser";
import { surveyInfo } from "@/actions/survey";

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
  surveyId: number;
  mode: "edit" | "view"; // Personal ID 是本人可以Edit 如果不是本人不能Edit 只能查看信息
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  personalId,
  surveyId,
  mode,
}) => {
  // 预载信息
  const cookies = useCookies();
  const token = cookies.get("token") as string;

  // TODO: Retrieve personal info
  const [profileData, setProfileData] =
    useState<ProfileData>(defaultProfileData); // 用于渲染
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [personalInfoDefine, setPersonalInfoDefine] =
    useState<PersonalInfo | null>(null);
  const [formSubmission, setFormSubmission] = useState<FormSubmission | null>(
    null
  );

  const {
    data: data_survey,
    isLoading: isLoading_survey,
    isError: isError_survey,
  } = surveyInfo({ surveyID: surveyId }); // From @/actions/survey

  const {
    data: data_query,
    isLoading: isLoading_query,
    isError: isError_query,
  } = queryGetById({ token: token, surveyID: surveyId, userID: personalId }); // From @/actions/query

  if (isLoading_survey || isLoading_query) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <LoaderCircle className="animate-spin h-12 w-12" /> User Profile Loading
      </div>
    );
  }

  if (isError_survey || isError_query) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        Error loading
      </div>
    );
  }

  setPersonalInfoDefine(data_survey.personal_info);
  setFormSubmission(data_query);
  let initialProfileData: ProfileData = {
    avatar: formSubmission
      ? formSubmission.personal_info.avatar
      : defaultProfileData.avatar,
    name: formSubmission
      ? formSubmission.personal_info.name
      : defaultProfileData.name,
    self_info: formSubmission
      ? formSubmission.personal_info.self_info
      : defaultProfileData.self_info,
    fields: personalInfoDefine
      ? personalInfoDefine.fields.map((field) => {
          const fieldInput = formSubmission
            ? formSubmission.personal_info.fields.find(
                (input) => input.id === field.id
              )
            : null;
          return {
            id: field.id,
            label: field.label,
            placeholder: field.placeholder,
            input: fieldInput ? fieldInput.input : "",
          };
        })
      : [],
  };
  setProfileData(initialProfileData);

  const [avatar, setAvatar] = useState<AvatarFullConfig>(
    profileData.avatar ? profileData.avatar : genConfig()
  );
  const [selfInfo, setSelfInfo] = useState(profileData.self_info);
  const [fieldValues, setFieldValues] = useState<string[]>(
    profileData.fields.map((field) => field.input)
  );

  useEffect(() => {
    if (!loading) {
      setFieldValues(profileData.fields.map((field) => field.input));
      setAvatar(profileData.avatar ? profileData.avatar : genConfig());
    }
  }, [loading, profileData]);

  const handleInputChange = (index: number, newValue: string) => {
    const newValues = [...fieldValues];
    newValues[index] = newValue;
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
        member_id: personalId,
        name: profileData.name, // TODO: users/useAuthInfo
        self_info: selfInfo,
        fields: fieldValues.map((input, index) => ({
          id: profileData.fields[index].id,
          input: input,
        })),
      };
      let updatedFormSubmission = {
        ...formSubmission,
        personal_info: personalInfoInput,
        update_at: new Date().toISOString(),
      };
      await queryUpdateByUserId({
        token: cookies.get("token") as string,
        surveyID: surveyId,
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <LoaderCircle className="animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <Card className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:shadow-slate-400 w-[450px] p-5">
      <CardContent>
        <div className="flex flex-col items-center my-5 space-y-4 h-1/2">
          <Avatar style={{ width: "10rem", height: "10rem" }} {...avatar} />
          {mode === "edit" && (
            <Button onClick={handleAvatarChange} className="text-xs">
              Randomize an avatar
            </Button>
          )}
        </div>
        <div className="items-center my-3 space-y-4 h-2/3">
          {profileData.fields.map((field, index) => (
            <FieldForm
              key={index}
              label={field.label}
              value={fieldValues[index]}
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
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
