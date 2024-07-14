import { FormSubmission } from "@/schemas/survey";
import { AvatarFullConfig } from "react-nice-avatar";

export const defaultConfig : AvatarFullConfig = {
  "sex": "man",
  "faceColor": "#AC6651",
  "earSize": "big",
  "eyeStyle": "circle",
  "noseStyle": "round",
  "mouthStyle": "peace",
  "shirtStyle": "polo",
  "glassesStyle": "none",
  "hairColor": "#FC909F",
  "hairStyle": "thick",
  "hatStyle": "none",
  "hatColor": "#000",
  "eyeBrowStyle": "up",
  "shirtColor": "#9287FF",
  "bgColor": "#506AF4"
};

export let sampleFormSubmission: FormSubmission[] = [
  {
    id: 1,
    create_at: "2021-09-01T00:00:00.000Z",
    update_at: "2021-09-01T00:00:00.000Z", 
    personal_info: {
      avatar: defaultConfig,
      member_id: 1,
      name: "John Doe",
      self_info: "I am John Doe",
      fields: [
        {
          id: 1,
          input: "Field 1",
        },
        {
          id: 2,
          input: "Field 2",
        },
        {
          id: 3,
          input: "Field 3",
        },
      ],
    },
    survey_id: 1,
    member_id: 1,
    status: "edit",
    content: "Content",
  },
  {
    id: 2,
    create_at: "2021-09-02T00:00:00.000Z",
    update_at: "2021-09-02T00:00:00.000Z",
    personal_info: {
      avatar: defaultConfig,
      member_id: 2,
      name: "Jane Doe",
      self_info: "I am Jane Doe",
      fields: [
        {
          id: 1,
          input: "Field 1",
        },
        {
          id: 2,
          input: "Field 2",
        },
        {
          id: 3,
          input: "Field 3",
        },
      ],
    },
    survey_id: 1,
    member_id: 2,
    status: "edit",
    content: "Content",
  },
  {
    id: 3,
    create_at: "2021-09-03T00:00:00.000Z",
    update_at: "2021-09-03T00:00:00.000Z",
    personal_info: {
      avatar: defaultConfig,
      member_id: 3,
      name: "Jack Doe",
      self_info: "I am Jack Doe",
      fields: [
        {
          id: 1,
          input: "Field 1",
        },
        {
          id: 2,
          input: "Field 2",
        },
        {
          id: 3,
          input: "Field 3",
        },
      ],
    },
    survey_id: 1,
    member_id: 3,
    status: "edit",
    content: "Content",
  },
  {
    id: 4,
    create_at: "2021-09-04T00:00:00.000Z",
    update_at: "2021-09-04T00:00:00.000Z",
    personal_info: {
      avatar: defaultConfig,
      member_id: 4,
      name: "Jill Doe",
      self_info: "I am Jill Doe",
      fields: [
        {
          id: 1,
          input: "Field 1",
        },
        {
          id: 2,
          input: "Field 2",
        },
        {
          id: 3,
          input: "Field 3",
        },
      ],
    },
    survey_id: 1,
    member_id: 4,
    status: "edit",
    content: "Content",
  }
];
