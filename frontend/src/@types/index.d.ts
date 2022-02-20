declare global {
  interface Window {
    setHasNewNotification?: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    isSubscribed?: boolean;
  }
}

export {};
