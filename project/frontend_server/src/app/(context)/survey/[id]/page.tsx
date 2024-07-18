"use client";

import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';

export default function Home() { 
  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("token");
  
  if (!token) {
    router.push("/login");
  }
  if (token) {
    router.push("dashboard");
  }

  return (
    <div>
      <h1>Survey Home</h1>
    </div>
  );
}