"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const types = {
  info: {
    alert: "alert-info",
    icon: <InformationCircleIcon className="w-5 h-5" />,
  },
  success: {
    alert: "alert-success",
    icon: <CheckCircleIcon className="w-5 h-5" />,
  },
  warning: {
    alert: "alert-warning",
    icon: <ExclamationCircleIcon className="w-5 h-5" />,
  },
  error: { alert: "alert-error", icon: <XCircleIcon className="w-5 h-5" /> },
};

function Notification({
  message,
  messageType = "info",
}: {
  message: string;
  messageType?: string;
}) {
  const [open, setOpen] = useState(message !== "");

  const alertType = types[messageType as keyof typeof types];

  return !open ? (
    <></>
  ) : (
    <div className="toast">
      <div className={`alert ${alertType.alert}`}>
        <div className="px-2">
          <p className="flex items-center gap-x-2">
            {alertType.icon}
            <span className="text-neutral font-bold">{message}</span>
          </p>
          <progress
            className="progress progress-primary bg-neutral w-full"
            value={40}
            max={100}
          ></progress>
        </div>
      </div>
    </div>
  );
}

export default Notification;
