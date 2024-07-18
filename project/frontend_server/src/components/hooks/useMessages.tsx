"use client";

import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageContext");
  }

  return context;
}

export default useMessages;
