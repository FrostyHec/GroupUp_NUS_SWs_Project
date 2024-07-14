import { Survey } from "../../schemas/survey";
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

export let sampleSurvey: Survey[] = [
  {
    id: 1,
    name: "Survey 1",
    description: "This is survey 1",
    create_at: "2021-09-01T00:00:00.000Z",
    update_at: "2021-09-01T00:00:00.000Z",
    published: true,
    personal_info: {
      avatar: defaultConfig,
      fields: [
        {
          id: 1,
          label: "Field 1",
          placeholder: "Field 1",
        },
        {
          id: 2,
          label: "Field 2",
          placeholder: "Field 2",
        },
        {
          id: 3,
          label: "Field 3",
          placeholder: "Field 3",
        },
      ],
    },
    owners: [1],
    members: [2, 3],
    content:
      '[{"id":"8340","type":"TitleField","extraAttributes":{"title":"Form 1"}},{"id":"8852","type":"SubTitleField","extraAttributes":{"title":"Subtitle"}},{"id":"5321","type":"TextField","extraAttributes":{"label":"填空题","helperText":"哈哈哈","placeHolder":"填空题PlaceHolder","required":false}}]',
    status: "closed",
    group_restrictions: {
      groupSize: 3,
      customized_restrictions: [
        {
          id: 1,
          restriction: "NoRestriction",
          allowModify: true,
        },
        {
          id: 2,
          restriction: "MustSame",
          allowModify: true,
        },
        {
          id: 3,
          restriction: "MustDifferent",
          allowModify: true,
        },
      ],
    },
  },
  {
    id: 2,
    name: "Survey 2",
    description: "This is survey 2",
    create_at: "2021-09-02T00:00:00.000Z",
    update_at: "2021-09-02T00:00:00.000Z",
    published: true,
    personal_info: {
      avatar: defaultConfig,
      fields: [
        {
          id: 1,
          label: "Field 1",
          placeholder: "Field 1",
        },
        {
          id: 2,
          label: "Field 2",
          placeholder: "Field 2",
        },
        {
          id: 3,
          label: "Field 3",
          placeholder: "Field 3",
        },
      ],
    },
    owners: [2],
    members: [1, 3],
    content:
      '[{"id":"6403","type":"ParagraphField","extraAttributes":{"text":"This is a test"}},{"id":"8931","type":"NumberField","extraAttributes":{"label":"数字题","helperText":"142","placeHolder":"0","required":false}}]',
    status: "closed",
    group_restrictions: {
      groupSize: 2,
      customized_restrictions: [
        {
          id: 1,
          restriction: "NoRestriction",
          allowModify: true,
        },
        {
          id: 2,
          restriction: "MustSame",
          allowModify: true,
        },
        {
          id: 3,
          restriction: "MustDifferent",
          allowModify: true,
        },
      ],
    },
  },
  {
    id: 3,
    name: "Survey 3",
    description: "This is survey 3",
    create_at: "2021-09-03T00:00:00.000Z",
    update_at: "2021-09-03T00:00:00.000Z",
    published: true,
    personal_info: {
      avatar: defaultConfig,
      fields: [
        {
          id: 1,
          label: "Field 1",
          placeholder: "Field 1",
        },
        {
          id: 2,
          label: "Field 2",
          placeholder: "Field 2",
        },
        {
          id: 3,
          label: "Field 3",
          placeholder: "Field 3",
        },
      ],
    },
    owners: [3],
    members: [1, 2],
    content:
      '[{"id":"6403","type":"ParagraphField","extraAttributes":{"text":"This is a test"}},{"id":"153","type":"TextAreaField","extraAttributes":{"label":"Text area","helperText":"Helper text","required":false,"placeHolder":"Value here...","rows":3}},{"id":"4751","type":"SelectField","extraAttributes":{"label":"Select field","helperText":"Helper text","placeHolder":"Value here...","required":false,"options":["1","2","3"]}},{"id":"329","type":"CheckboxField","extraAttributes":{"label":"Checkbox field","helperText":"Helper text","required":false}}]',
    status: "open",
    group_restrictions: {
      groupSize: 2,
      customized_restrictions: [
        {
          id: 1,
          restriction: "NoRestriction",
          allowModify: true,
        },
        {
          id: 2,
          restriction: "MustSame",
          allowModify: true,
        },
        {
          id: 3,
          restriction: "MustDifferent",
          allowModify: true,
        },
      ],
    },
  },
];
