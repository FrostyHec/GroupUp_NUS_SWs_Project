"use client";
import React, {
  ReactNode,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { Wallet2Icon } from "lucide-react";

export const MessageContext = createContext<any>(null);

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const { userID } = useUser();
  const router = useRouter();

  useEffect(() => {
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_MESSAGE_PUSH_API_URL}/sse/register/${userID}`
    );
    es.onmessage = (event : any) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      if (
        message.data.push_type === 2 &&
        message.data.body.unposed.length === 0 &&
        message.data.body.unacked.length === 0
      ) {
        return;
      }
      toast("You have received a message! Please check your inbox!", {
        action: {
          label: "Inbox",
          onClick: () => handleActionClick(message),
        },
      });
    };
    es.onerror = (event) => {
      console.error("Error receiving messages", event);
    };
    setEventSource(es);
    return;
  }, []);

  useEffect(() => {
    if (eventSource) {
      eventSource.onmessage = (event : any) => {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);
        if (
          message.data.push_type === 2 &&
          message.data.body.unposed.length === 0 &&
          message.data.body.unacked.length === 0
        ) {
          return;
        }
        toast("You have received a message! Please check your inbox!", {
          action: {
            label: "Inbox",
            onClick: () => handleActionClick(message),
          },
        });
      };
    }
  }, [eventSource]);

  const handleActionClick = async (message: any) => {
    // 执行相应操作
    // 发送ACK请求
    console.log("Action clicked for message:", message);
    router.push("/inbox");
  };

  return (
    <MessageContext.Provider value={{ eventSource }}>
      {children}
    </MessageContext.Provider>
  );
};
