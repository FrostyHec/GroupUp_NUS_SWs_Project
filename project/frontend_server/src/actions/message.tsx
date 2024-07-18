'use client';
import { atom, useAtom } from "jotai";

import { Mail, mails } from "@/components/data/inbox-data";
import { Notification } from "@/components/data/inbox-data";

type Config = {
  selected: Mail["id"] | null;
};

type NotificationConfig = {
  selected: Notification["id"] | null;
};

const configAtom = atom<Config>({
  selected: mails[0].id,
});

const notificationAtom = atom<NotificationConfig>({
  selected: mails[0].id,
});

export function useMail() {
  return useAtom(configAtom);
}

export function useNotification() {
  return useAtom(notificationAtom);
}
