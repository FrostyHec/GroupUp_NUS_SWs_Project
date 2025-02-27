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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userLogIn } from "@/actions/user";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";

export default function LogIn() {
  const router = useRouter();
  const cookies = useCookies();
  if (cookies.get("token") && cookies.get("token") !== "undefined") {
    router.push("/dashboard");
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    userLogIn({ username: username, password: password }).then((res) => {
      console.log("Logging in user", res);
      if (res.data.code === 200) {
        toast("Login Success", {
          description: "You have successfully logged in",
        });
        cookies.set("token", res.data.data.token);
        router.push("/dashboard");
      } else if (res.data.code === 401) {
        toast("Login Failed", {
          description: "Invalid username or password",
        });
      } else if (res.data.code === 404) {
        toast("Login Failed", {
          description: "User not found",
        });
      }
    });
  };
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your information below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  placeholder=""
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/passwd"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
