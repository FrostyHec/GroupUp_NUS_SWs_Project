"use client"

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContext");
  }
  return context;
}

export default useUser;