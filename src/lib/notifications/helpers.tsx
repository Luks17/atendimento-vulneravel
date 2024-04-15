export type NotificationTypes = "info" | "success" | "warning" | "error";

export interface Notification {
  message: string;
  messageType: NotificationTypes;
}
