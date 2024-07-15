"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { userId } from "@/actions/user";
import { sampleSurvey } from "../data/survey-data";

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
  const ownSurveys = sampleSurvey
    .filter((survey) => survey.owners.includes(userId))
    .map((survey) => survey.id);
  const participateSurveys = sampleSurvey
    .filter((survey) => survey.members.includes(userId))
    .map((survey) => survey.id);
  const [ownSurveyId, setOwnSurveyId] = useState<number[]>(ownSurveys);
  const [participateSurveyId, setParticipateSurveyId] = useState<number[]>(participateSurveys);

  const [currentSurveyId, setCurrentSurveyId] = useState<number>(0);
  const [role, setRole] = useState<
    "owner" | "member" | "unauthorized" | "main"
  >("main");

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
    setOwnSurveyId([...ownSurveyId, surveyId]);
  }

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
