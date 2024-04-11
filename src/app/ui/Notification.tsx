"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

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
  const container = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(message !== "");
  const [progress, setProgress] = useState(100);

  const alertType = types[messageType as keyof typeof types];

  // always check if open is true, otherwise a memory leak may happen
  useEffect(() => {
    if (open && progress > 0) {
      const interval = setTimeout(() => {
        setProgress((old) => old - 1);
      }, 50);

      return () => clearTimeout(interval);
    } else if (open && progress <= 0) {
      setOpen(false);

      setTimeout(() => container.current!.classList.add("hidden"), 300);
    }
  }, [open, progress]);

  useEffect(() => {
    if (message !== "") {
      setOpen(true);
    }
  }, [message]);

  return (
    <div
      ref={container}
      className={`toast transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
    >
      <div className={`alert relative ${alertType.alert}`}>
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3"
        >
          <XMarkIcon className="opacity-50 hover:opacity-100 transition-opacity duration-300 w-5 h-5" />
        </button>
        <div className="px-2">
          <p className="flex items-center gap-x-2">
            {alertType.icon}
            <span className="text-neutral font-bold">{message}</span>
          </p>
          <progress
            className="progress progress-primary bg-neutral w-full"
            value={progress}
            max={100}
          ></progress>
        </div>
      </div>
    </div>
  );
}

export default Notification;
