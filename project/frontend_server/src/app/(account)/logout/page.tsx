"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCookies } from "next-client-cookies";

export default function LogIn() {
  const router = useRouter();
  const cookies = useCookies();
  if (!cookies.get("token")) {
    router.push("/login");
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    cookies.remove("token");
    router.push("/login");
  };
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Logout</CardTitle>
          <CardDescription>Logout</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Button type="submit" className="w-full">
                Logout
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
