import { addPushEndPoint, removePushPoint } from "../api";
import { useSubscriptionStateStore } from "../store";
import useApi from "../hooks/api";
import formatClassName from "../utils/formatClassName";
import toast from "../utils/toast";
import "./SubscribeButton.css";

export default function SubscribeButton() {
  const { subscribed, setSubscribed } = useSubscriptionStateStore();

  const updateSubscribe = async () => {
    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.getSubscription();

    if (subscription) {
      // Unsubscribe
      const { endpoint } = subscription;
      const apiResponse = await useApi(removePushPoint(endpoint));

      if (!apiResponse) {
        return;
      }

      subscription.unsubscribe();
      setSubscribed(false);

      return;
    }

    // Subscribe
    try {
      const newSubscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_APPLICATION_SERVER_KEY,
      });

      const apiResponse = await useApi(addPushEndPoint(newSubscription));

      if (!apiResponse) {
        navigator.serviceWorker.ready.then((worker) => {
          worker.pushManager.getSubscription().then((sub) => {
            sub?.unsubscribe();
          });
        });

        return;
      }

      setSubscribed(true);
    } catch (error) {
      toast("구독에 실패했습니다. 알림 권한을 확인해주세요.");
    }
  };

  return (
    <button
      type="button"
      className={formatClassName(
        "subscribe-button",
        subscribed && "subscribe-button--subscribed"
      )}
      onClick={updateSubscribe}
    >
      <i
        className={`icon-notifications_${subscribed ? "on" : "off"}`}
        role="img"
        aria-label={subscribed ? "구독 취소" : "구독"}
      />
    </button>
  );
}
