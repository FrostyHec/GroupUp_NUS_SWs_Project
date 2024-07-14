import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavBar() {
  const router = usePathname();
  return (
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
  );
}
