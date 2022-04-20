import create from "zustand";

const useNotificationStateStore = create<NotificationStore>((set) => ({
  hasNewNotification: false,
  setHasNewNotification: (state: boolean) => {
    set((x) => ({ ...x, hasNewNotification: state }));
  },
}));

export default useNotificationStateStore;
