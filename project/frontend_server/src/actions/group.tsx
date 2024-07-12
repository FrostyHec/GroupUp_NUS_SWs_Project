//<backend>/survey/{surveyId}/group/{id}
export function surveyGroupInfo({ id }: any) {
  const response = {
    code: "200",
    msg: "success",
    data: {
      group_id: 1,
      member_id: [1, 2, 3],
    },
  };
  return { data: response };
}

//<backend>/survey/{id}/allgroup
export function surveyAllGroups({ id }: { id: number }) {
  const response = {
    code: "200",
    msg: "success",
    data: {
      total_size: 2,
      list: [
        {
          id: 1,
          group_member: [1, 2, 3],
        },
        {
          id: 2,
          group_member: [4, 5, 6],
        },
      ],
    },
  };
  return { data: response };
}

//<backend>/survey/{id}/requestgroup
export function surveyGroupRequest({
  userID,
  groupID,
}: {
  userID: number;
  groupID: number;
}) {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}

//<backend>/survey/{id}/leavegroup
export function surveyGroupLeave({
  userID,
  groupID,
}: {
  userID: number;
  groupID: number;
}) {
  const response = {
    code: "200",
    msg: "success",
    data: {},
  };
  return { data: response };
}
