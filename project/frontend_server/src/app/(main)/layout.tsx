import { MainNav } from '@/components/app/main-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      {children}
    </div>
  );
}
