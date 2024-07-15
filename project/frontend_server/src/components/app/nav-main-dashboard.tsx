import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const router = usePathname();
  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground",
            router === "/dashboard"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/inbox"
          className={cn(
            "transition-colors hover:text-foreground",
            router === "/inbox" ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Inbox
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="flex shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-foreground",
                router === "/dashboard"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/inbox"
              className={cn(
                "transition-colors hover:text-foreground",
                router === "/inbox"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Inbox
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
