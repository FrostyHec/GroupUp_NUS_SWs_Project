import { surveyInfo } from "@/actions/survey";

export function isUserOwner({ id }: { id: number }) {
  const survey = surveyInfo({ surveyID: id });
  const ownerIDs = survey.data.data.owners;
  const isOwner = ownerIDs.includes(id);
  return isOwner;
}
