"use client";

import React, { useEffect, useState } from "react";
import FieldForm from "./info-field";
import { ProfileData, GetPersonalInfo } from "@/actions/personal-info";
import Avatar, { genConfig } from "react-nice-avatar";
import { AvatarFullConfig } from "./info-avatar-types";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { PersonalInfoInput } from "@/schemas/survey";
import { userId, userName } from "@/actions/user";
import { UpdatePersonalInfo } from "@/actions/form";
import { ImSpinner2 } from "react-icons/im";

const defaultProfileData: ProfileData = {
  avatar: genConfig(),
  name: "",
  self_info: "",
  fields: [],
};

interface ProfileCardProps {
  personalId: number;
  surveyId: number;
  mode: "edit" | "view";
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  personalId,
  surveyId,
  mode,
}) => {
  // TODO: Retrieve personal info
  const [profileData, setProfileData] =
    useState<ProfileData>(defaultProfileData);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await GetPersonalInfo(personalId, surveyId);
        if (!data) {
          toast("Personal info not found", {
            description: "Please try again later",
          });
          return;
        }
        setProfileData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const [fieldValues, setFieldValues] = useState<string[]>(
    profileData.fields.map((field) => field.input)
  );
  const [avatar, setAvatar] = useState<AvatarFullConfig>(
    profileData.avatar ? profileData.avatar : genConfig()
  );
  const [selfInfo, setSelfInfo] = useState(profileData.self_info);

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
        member_id: userId,
        name: userName, // TODO: users/useAuthInfo
        self_info: selfInfo,
        fields: fieldValues.map((input, index) => ({
          id: profileData.fields[index].id,
          input: input,
        })),
      };
      await UpdatePersonalInfo(surveyId, personalInfoInput);
      console.log(personalInfoInput);
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
