"use client";

import React, { useEffect, useState } from "react";
import FieldForm from "./info-field";
import EditButton from "./info-edit-button";
import { getPersonalInfo } from "@/actions/personal-info";
import { useRouter } from "next/router";
import { Field, ProfileData } from "@/actions/personal-info";
import Avatar, { genConfig } from "react-nice-avatar";
import { AvatarFullConfig } from "./info-avatar-types";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { LoaderCircle } from "lucide-react";

const defaultProfileData: ProfileData = {
  name: "",
  gender: "male",
  avatar: genConfig(),
  fields: [],
};

interface ProfileCardProps {
  personalId: number;
  surveyId: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ personalId, surveyId }) => {
  // Retrieve personal info
  const [profileData, setProfileData] =
    useState<ProfileData>(defaultProfileData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPersonalInfo(personalId, surveyId);
        setProfileData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [personalId, surveyId]);

  // Initialize fieldValues state
  const [fieldValues, setFieldValues] = useState<string[]>([]);

  // Initialize avatar state
  const [avatar, setAvatar] = useState<AvatarFullConfig>(genConfig());

  useEffect(() => {
    if (!loading) {
      setFieldValues(profileData.fields.map((field: Field) => field.value));
      setAvatar(profileData.avatar);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <LoaderCircle className="animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-sm rounded overflow-hidden shadow-lg dark:shadow-slate-400">
        <CardContent>
          <div className="flex flex-col items-center my-7 space-y-4">
            <Avatar style={{ width: "10rem", height: "10rem" }} {...avatar} />
            <Button onClick={handleAvatarChange} className="text-xs">
              Randomize an avatar
            </Button>
          </div>

          {profileData.fields.map((field, index) => (
            <FieldForm
              key={index}
              label={field.label}
              value={fieldValues[index]}
              placeholder={field.placeHolder}
              editMode={false}
              onChange={(newValue) => handleInputChange(index, newValue)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
