"use client";
import ProfileCard from '@/components/app/info-personal-info-cards';

export default function InfoPage({ params }: { params: { id : string } }) {
  return <ProfileCard personalId={1} surveyId={Number(params.id)}/>;
};

