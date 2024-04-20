"use client";

import { Notification } from "@/lib/ui/notifications/helpers";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import NotificationWidget from "./NotificationWidget";

const NotificationContext = createContext<Notification | null>(null);

const SetNotificationContext = createContext<Dispatch<
  SetStateAction<Notification>
> | null>(null);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification>({
    message: "",
    messageType: "info",
  });

  return (
    <NotificationContext.Provider value={notification}>
      <SetNotificationContext.Provider value={setNotification}>
        {children}
        <NotificationWidget />
      </SetNotificationContext.Provider>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext)!;
export const useSetNotification = () => useContext(SetNotificationContext)!;

export default NotificationProvider;
