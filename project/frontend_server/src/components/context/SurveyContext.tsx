"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  use,
  useEffect,
  useState,
} from "react";
import {
  userAllOwnSurveys,
  userAuthInfo,
  userAllParticipateSurveys,
} from "@/actions/user";
import { sampleSurvey } from "../data/survey-data";
import useUser from "../hooks/useUser";
import { useCookies } from "next-client-cookies";
import axios from "axios";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";

type SurveyContextType = {
  ownSurveyId: number[];
  setOwnSurveyId: Dispatch<SetStateAction<number[]>>;
  addOwnSurveyId: (surveyId: number) => void;

  participateSurveyId: number[];
  setParticipateSurveyId: Dispatch<SetStateAction<number[]>>;

  currentSurveyId: number;
  setCurrentSurveyId: Dispatch<SetStateAction<number>>;

  role: "owner" | "member" | "unauthorized" | "main";
  setRole: Dispatch<
    SetStateAction<"owner" | "member" | "unauthorized" | "main">
  >;
  setRoleBySurveyId: (surveyId: number) => void;
};

export const SurveyContext = createContext<SurveyContextType | null>(null);

export function SurveyContextProvider({ children }: { children: ReactNode }) {
  const { userID } = useUser();
  const cookies = useCookies();
  const token = cookies.get("token") as string;

  // Define the hooks
  const [isLoading, setIsLoading] = useState(true);
  const [ownSurveyId, setOwnSurveyId] = useState<number[]>([]);
  const [participateSurveyId, setParticipateSurveyId] = useState<number[]>([]);
  const [currentSurveyId, setCurrentSurveyId] = useState<number>(0);
  const [role, setRole] = useState<
    "owner" | "member" | "unauthorized" | "main"
  >("main");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response_participate = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/survey/participate`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page_size: -1, page_no: -1 },
          }
        );
        const response_own = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userID}/survey/own`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page_size: -1, page_no: -1 },
          }
        );
        const result_participate = await response_participate.data;
        const result_own = await response_own.data;
        console.log("Participate:", result_participate);
        console.log("Own: ", result_own);
        setOwnSurveyId(result_own.data.survey_ids);
        setParticipateSurveyId(result_participate.data.survey_ids);
      } catch (error) {
        toast("Failed to fetch survey information", {
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
        <ImSpinner2 className="animate-spin h-12 w-12 items-center justify-center" /> Loading Survey
        Information.
      </div>
    );
  }

  const setRoleBySurveyId = (surveyId: number) => {
    if (surveyId === 0) {
      console.log("main");
      setRole("main");
    } else if (ownSurveyId.indexOf(surveyId) !== -1) {
      console.log("owner");
      setRole("owner");
    } else if (participateSurveyId.indexOf(surveyId) !== -1) {
      console.log("member");
      setRole("member");
    } else {
      console.log("unauthorized");
      setRole("unauthorized");
    }
  };

  const addOwnSurveyId = (surveyId: number) => {
    const ownSurveys = [...ownSurveyId];
    ownSurveys.push(surveyId);
    setOwnSurveyId(ownSurveys);
  };

  return (
    <SurveyContext.Provider
      value={{
        ownSurveyId,
        setOwnSurveyId,
        participateSurveyId,
        setParticipateSurveyId,
        currentSurveyId,
        setCurrentSurveyId,
        role,
        setRole,
        setRoleBySurveyId,
        addOwnSurveyId,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}
