import React, { createContext, useState } from "react";
import {
  NotificationData,
  ApplicationData,
  FeedbackData,
  MessageItem,
} from "@/schemas/message";

type MessaegContext = {
    messages: MessageItem[];
    setMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
    addMessage: (message: MessageItem) => void;
};

export const MessageContext = createContext<MessaegContext | null>(null);

export function MessageContextProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<MessageItem[]>([]);

    const addMessage = (message: MessageItem) => {
        setMessages([...messages, message]);
    };

    return (
        <MessageContext.Provider value={{ messages, setMessages, addMessage }}>
            {children}
        </MessageContext.Provider>
    );
}