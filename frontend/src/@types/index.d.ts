declare global {
  interface Window {
    setHasNewNotification?: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    setSubscribed?: React.Dispatch<React.SetStateAction<boolean>>;
    isSubscribed?: boolean;
  }
}

export {};
