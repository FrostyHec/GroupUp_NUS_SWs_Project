import { SurveyContextProvider } from "@/components/context/SurveyContext";
import { UserProvider } from "@/components/context/UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SurveyContextProvider>{children}</SurveyContextProvider>
    </UserProvider>
  );
}
