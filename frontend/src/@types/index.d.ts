declare global {
  interface Window {
    setHasNewNotification?: React.Dispatch<React.SetStateAction<boolean>>;
    setSubscribed?: React.Dispatch<React.SetStateAction<boolean>>;
    isSubscribed?: boolean;
  }
}

export {};
