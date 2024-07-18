import { sampleData, sampleInfoDefine } from "@/components/data/personal-info-data";
import { AvatarFullConfig, genConfig } from "react-nice-avatar";

export type avatarType = {};

export type personalInfo = {
    name : string;
    personId: number;
    gender: number;
    field1Input: string;
    field2Input: string;
    field3Input: string;
    selfIntroduction: string;
};

export type personalInfoDefine = {
    surveyId: number;
    field1Label: string;
    field1Placeholder: string;
    field1Restriction: string;
    field1AllowModify: boolean;
    field2Label: string;
    field2Placeholder: string;
    field2Restriction: string;
    field2AllowModify: boolean;
    field3Label: string;
    field3Placeholder: string;
    field3Restriction: string;
    field3AllowModify: boolean;
}

export type Field = {
    label: string;
    value: string;
    placeHolder: string;
  };
  
export type ProfileData = {
    name: string;
    gender: "male" | "female";
    avatar: AvatarFullConfig;
    fields: Field[];
};


export async function getPersonalInfo(personId: number, surveyId: number): Promise<ProfileData> {
    const personalInfo = sampleData.find((info) => info.personId === personId);
    const personalInfoDefine = sampleInfoDefine.find((info) => info.surveyId === surveyId);
    if (!personalInfo || !personalInfoDefine) {
        throw new Error("Personal info not found");
    }
    const fields: Field[] = [
        {
            label: personalInfoDefine.field1Label,
            value: personalInfo.field1Input,
            placeHolder: personalInfoDefine.field1Placeholder,
        },
        {
            label: personalInfoDefine.field2Label,
            value: personalInfo.field2Input,
            placeHolder: personalInfoDefine.field2Placeholder,
        },
        {
            label: personalInfoDefine.field3Label,
            value: personalInfo.field3Input,
            placeHolder: personalInfoDefine.field3Placeholder,
        },
    ];
    return {
        name: personalInfo.name,
        gender: personalInfo.gender === 1 ? "male" : "female",
        avatar: genConfig(),
        fields
    };
}
