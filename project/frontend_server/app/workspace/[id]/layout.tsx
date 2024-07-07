import { WorkspaceNav } from '@/components/app/workspace-nav';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <WorkspaceNav />
      {children}
    </div>
  );
}
