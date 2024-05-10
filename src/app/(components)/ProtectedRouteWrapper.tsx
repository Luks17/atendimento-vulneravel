"use client";

import {
  Notification,
  enqueueNotification,
} from "@/lib/ui/notifications/helpers";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRouteWrapper({
  children,
  hasClearance,
  message,
}: {
  children: ReactNode;
  hasClearance: boolean;
  message: string;
}) {
  const router = useRouter();

  if (!hasClearance) {
    useEffect(() => {
      const notification: Notification = { message, messageType: "warning" };
      enqueueNotification(notification);

      router.back();
    }, []);

    return null;
  } else {
    return children;
  }
}
