declare global {
  interface Window {
    setHasNewNotification?: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

export {};
