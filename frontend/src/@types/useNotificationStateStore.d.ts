interface NotificationStore {
  hasNewNotification: boolean;
  setNotificationState: (state: boolean) => void;
}
