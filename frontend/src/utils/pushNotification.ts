import { useSubscriptionStateStore } from "../store";

export const SUPPORTS_SERVICE_WORKER = "serviceWorker" in navigator;
export const SUPPORTS_PUSH_MANAGER = "PushManager" in window;

export default function initializeSubscription(): void {
  const { setSubscribed } = useSubscriptionStateStore.getState();

  window.addEventListener(
    "load",
    async () => {
      if (!SUPPORTS_SERVICE_WORKER) {
        return;
      }

      const swRegistration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );

      if (!SUPPORTS_PUSH_MANAGER) {
        return;
      }

      const subscription = await swRegistration.pushManager.getSubscription();

      if (!subscription) {
        return;
      }

      setSubscribed(true);
    },
    { once: true, passive: true }
  );
}
