interface SubscriptionStateStore {
  subscribed: boolean;
  setSubscribed: (state: boolean) => void;
}
