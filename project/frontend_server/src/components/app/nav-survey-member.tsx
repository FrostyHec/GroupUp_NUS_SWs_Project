import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useSurveys from "../hooks/useSurveys";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSurveyStatus } from "@/actions/survey";
import {useCookies} from "next-client-cookies";

export function SurveyMemberNav() {
  const router = usePathname();
  const { currentSurveyId } = useSurveys();
  const cookies = useCookies();
  const { data, isLoading, isError } = useSurveyStatus({
    token: cookies.get("token") as string,
    surveyID: currentSurveyId,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const status = data.data.status;
  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="dashboard"
          className={cn(
            "text-foreground transition-colors hover:text-foreground",
            router.startsWith("/survey") && router.endsWith("dashboard")
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        {status === 3 && <Link
          href="form"
          className={cn(
            "text-foreground transition-colors hover:text-foreground",
            router.startsWith("/survey") &&
              router.endsWith("form") 
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Form
        </Link>}
        {status === 3 && <Link
          href="info"
          className={cn(
            "text-foreground transition-colors hover:text-foreground",
            router.startsWith("/survey") &&
              router.endsWith("info") 
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Info
        </Link>}
        {status === 3 && <Link
          href="match"
          className={cn(
            "text-foreground transition-colors hover:text-foreground",
            router.startsWith("/survey") &&
              router.endsWith("match") 
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Recommendations
        </Link>}
        <Link
          href="groups"
          className={cn(
            "text-foreground transition-colors hover:text-foreground",
            router.startsWith("/survey") && router.endsWith("groups")
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Groups
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="flex shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="dashboard"
              className={cn(
                "text-foreground transition-colors hover:text-foreground",
                router.startsWith("/survey") && router.endsWith("dashboard")
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="form"
              className={cn(
                "text-foreground transition-colors hover:text-foreground",
                router.startsWith("/survey") &&
                  router.endsWith("form") &&
                  status === "open"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Form
            </Link>
            <Link
              href="info"
              className={cn(
                "text-foreground transition-colors hover:text-foreground",
                router.startsWith("/survey") &&
                  router.endsWith("info") &&
                  status === "open"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Info
            </Link>
            <Link
              href="match"
              className={cn(
                "text-foreground transition-colors hover:text-foreground",
                router.startsWith("/survey") &&
                  router.endsWith("match") &&
                  status === "open"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Recommendations
            </Link>
            <Link
              href="groups"
              className={cn(
                "text-foreground transition-colors hover:text-foreground",
                router.startsWith("/survey") && router.endsWith("groups")
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Groups
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
