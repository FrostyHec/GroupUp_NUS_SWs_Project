import { useCookies } from "next-client-cookies";

//<backend>/survey/{id}
export function surveyInfo({ id }: any) {
  const response = {
    code: "200",
    msg: "success",
    data: {
      info: {
        name: "Customer Feedback Survey",
        description:
          "A survey to gather customer feedback on recent purchases.",
        create_at: "2024-07-09T12:00:00Z",
        update_at: "2024-07-09T12:00:00Z",
        personal_info: {
          avatar: "true",
          name: "false",
          self_info: "true",
          field1: {
            label: "Field 1 Label",
            placeholder: "Enter field 1",
          },
          field2: {
            label: "Field 1 Label",
            placeholder: "Enter field 1",
          },
          field3: {
            label: "Field 1 Label",
            placeholder: "Enter field 1",
          },
        },
        questions: [
          {
            id: 1,
            question: "How satisfied are you with our service?",
            type: "rating",
          },
          {
            id: 2,
            question: "What can we improve?",
            type: "text",
          },
        ],
        group_restriction: {
          group_size: -1,
          customized_restriction: [
            {
              type: "singleRequired",
              addition_code: "MustSame",
              field: 1,
            },
          ],
        },
        owners: [1, 2, 3],
        members: [4, 5, 6],
      },
    },
  };
  return { data: response };
}

//<backend>/survey
export function surveyCreate({ info }: any) {
  const response = {
    code: "200",
    msg: "success",
    data: {
      survey_id: 1,
    },
  };
  return { data: response };
}

//<backend>/survey/{id}
export function surveyUpdateInfo({ info }: any) {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}

//<backend>/survey/{id}/status
export function surveyUpdateStatus() {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}

//<backend>/survey/{id}/status
export function surveyStatus() {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}

//<backend>/survey/{id}
export function surveyDelete() {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}
