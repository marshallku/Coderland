import create from "zustand";

const useNotificationStateStore = create<NotificationStore>((set) => ({
  hasNewNotification: false,
  setNotificationState: (state: boolean) => {
    set((x) => ({ ...x, hasNewNotification: state }));
  },
}));

export default useNotificationStateStore;
