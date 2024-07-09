import { SurveyOwnerNav } from '@/components/app/survey-owner-nav';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Define different layout based on whether the user is owner or a member.
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SurveyOwnerNav />
      {children}
    </div>
  );
}
