import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useSurveys from "../hooks/useSurveys";
import { sampleSurvey } from "../data/survey-data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { surveyStatus } from "@/actions/survey";

export function SurveyOwnerNav() {
  const router = usePathname();
  const { currentSurveyId } = useSurveys();
  console.log(currentSurveyId);
  const { data, isLoading, isError } = surveyStatus({
    surveyID: currentSurveyId,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const status = data.data.status;
  console.log(status);
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
        <Link
          href="form"
          className={cn(
            "text-foreground transition-colors hover:text-foreground",
            router.startsWith("/survey") &&
              router.endsWith("form") &&
              status === "closed"
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
              status === "closed"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Info
        </Link>
        <Link
          href="members"
          className={cn(
            "text-foreground transition-colors hover:text-foreground",
            router.startsWith("/survey") && router.endsWith("members")
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Members
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
                  status === "closed"
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
                  status === "closed"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Info
            </Link>
            <Link
              href="members"
              className={cn(
                "text-foreground transition-colors hover:text-foreground",
                router.startsWith("/survey") && router.endsWith("members")
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Members
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
