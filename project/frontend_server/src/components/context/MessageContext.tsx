"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";

export const MessageContext = createContext({ messages: [] });

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<any>([]);
  const { userID } = useUser();
  const router = useRouter();

  const eventSource = new EventSource(
    `${process.env.NEXT_PUBLIC_MESSAGE_PUSH_API_URL}/sse/register/${userID}`
  );

  useEffect(() => {
    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages: any) => [...prevMessages, message]);
      if (message.data.push_type === 2 && (message.data.body.unposed.length === 0 && message.data.body.posed.length === 0)) {
        return;
      }
      toast("You have received a message! Please check your inbox!", {
        action: {
          label: "Action",
          onClick: () => handleActionClick(message),
        },
      });
    };

    eventSource.onerror = (event) => {
      console.error("Error receiving messages", event);
      eventSource.close();
    };

    // 清理
    return () => {
      eventSource.close();
    };
  }, [eventSource]);

  const handleActionClick = async (message: any) => {
    // 执行相应操作
    // 发送ACK请求
    console.log("Action clicked for message:", message);
    router.push("/inbox");
  };

  return (
    <MessageContext.Provider value={{ messages }}>
      {children}
    </MessageContext.Provider>
  );
};
