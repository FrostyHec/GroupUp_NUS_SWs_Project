"use client"

import { useContext } from "react";
import { SurveyContext } from "../context/SurveyContext";

function useSurveys() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurveys must be used within a SurveyContext");
  }
  return context;
}

export default useSurveys;