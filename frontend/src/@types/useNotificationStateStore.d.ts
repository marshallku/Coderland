interface NotificationStore {
  hasNewNotification: boolean;
  setHasNewNotification: (state: boolean) => void;
}
