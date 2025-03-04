export enum NotificationType {
  SUCCESS,
  WARNING,
  DANGER,
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  created_at: Date;
}