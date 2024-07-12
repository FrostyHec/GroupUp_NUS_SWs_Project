import { surveyInfo } from "@/actions/survey";

export function isUserOwner({ id }: { id: number }) {
  const survey = surveyInfo({ id: id });
  const ownerIDs = survey.data.data.info.owners;
  const isOwner = ownerIDs.includes(id);
  return isOwner;
}
