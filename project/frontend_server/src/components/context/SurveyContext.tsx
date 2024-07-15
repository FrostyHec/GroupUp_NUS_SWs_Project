"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  userAllOwnSurveys,
  userAuthInfo,
  userAllParticipateSurveys,
} from "@/actions/user";
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
  const { data, isLoading, isError } = userAuthInfo();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <SurveyContextProvider1
      children={children}
      userID={data.data.user_id}
    ></SurveyContextProvider1>
  );
}

export function SurveyContextProvider1({
  children,
  userID,
}: {
  children: ReactNode;
  userID: number;
}) {
  const userId = userID;
  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
  } = userAllOwnSurveys({
    userID: userId,
    pageSize: -1,
    pageNo: -1,
  });
  if (isLoading1) return <div>Loading...</div>;
  if (isError1) return <div>Error</div>;
  const ownSurveys = data1.data.survey_ids;
  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = userAllParticipateSurveys({
    userID: userId,
    pageSize: -1,
    pageNo: -1,
  });
  if (isLoading2) return <div>Loading...</div>;
  if (isError2) return <div>Error</div>;
  const participateSurveys = data2.data.survey_ids;
  const [ownSurveyId, setOwnSurveyId] = useState<number[]>(ownSurveys);
  const [participateSurveyId, setParticipateSurveyId] =
    useState<number[]>(participateSurveys);

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
