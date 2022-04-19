declare global {
  interface Window {
    setSubscribed?: React.Dispatch<React.SetStateAction<boolean>>;
    isSubscribed?: boolean;
  }
}

export {};
