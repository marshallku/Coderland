const DEFAULT_WAIT = 500;

export function fit(func: () => any): () => void {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        func();
        ticking = false;
      });
    }
  };
}

export function throttle(func: () => any, wait = DEFAULT_WAIT): () => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func();
      }, wait);
    }
  };
}

export function debounce(func: () => any, wait = DEFAULT_WAIT): () => void {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, wait);
  };
}
