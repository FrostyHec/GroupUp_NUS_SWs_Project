// UserContext.js
"use client";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

type UserContextType = {
  userID: number;
  setUserID: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const cookies = useCookies();
  const token = cookies.get("token") as string;
  const [userID, setUserID] = useState(0);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/getbyauth`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await response.json();
        console.log("Getting user info", result);
        setUserID(result.data.user_id);
        setUserName(result.data.username);
        toast("User information fetched", {
          description: "User information has been successfully fetched",
        });
      } catch (error) {
        toast("Failed to fetch user information", {
          description: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <ImSpinner2 className="animate-spin h-12 w-12 items-center justify-center" />{" "}
        Loading User Information.
      </div>
    );
  }
  return (
    <UserContext.Provider value={{ userID, setUserID, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
