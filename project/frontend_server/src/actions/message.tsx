"use client";
import { atom, useAtom } from "jotai";

import { Mail, mails } from "@/components/data/inbox-data";
import { MessageItem } from "@/schemas/message";

type Config = {
  selected: MessageItem["id"] | null;
};

export function useMail() {
  const configAtom = atom<Config>({
    selected: mails[0].id,
  });
  return useAtom(configAtom);
}

export function sendMessage(
  senderId: number,
  receiverId: number,
  content: string
) {
  fetch(`http://localhost:7078/api/v1/msg_push`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message_id: null,
      from_id: senderId,
      to_id: receiverId,
      type: 1,
      required_ack: false,
      body: content,
    }),
  });
}

export let messagesList : MessageItem [] = [];

export function receiveMessages(id: number) {
  const eventSource = new EventSource(`/api/v1/sse/register/${id}`); // User ID

  eventSource.onmessage = function (event) {
    const message = JSON.parse(event.data);
    const newMessage = document.createElement("li"); // 明确创建的元素类型
    newMessage.textContent = JSON.stringify(message); // 将JSON对象转换为字符串
    messagesList.push(newMessage); // 追加到列表中
  };

  eventSource.onerror = function (event) {
    console.error("Error receiving messages", event);
    eventSource.close();
  };
}
