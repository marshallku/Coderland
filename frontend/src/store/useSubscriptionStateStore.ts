import create from "zustand";

const useSubscriptionStateStore = create<SubscriptionStateStore>((set) => ({
  subscribed: false,
  setSubscribed: (state: boolean) => {
    set((x) => ({ ...x, subscribed: state }));
  },
}));

export default useSubscriptionStateStore;
