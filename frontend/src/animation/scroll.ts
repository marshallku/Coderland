export function scrollTo(
  target: HTMLElement | number | null,
  duration = 500,
  recursive = 0
): void {
  if (
    target === null ||
    document.documentElement.classList.contains("scrolling")
  )
    return;

  const to = typeof target === "number" ? target : target.offsetTop - 60;
  const from = window.scrollY;
  const transition = (x: number): number => Math.sqrt(1 - (x - 1) ** 2);
  const startTime = performance.now();

  document.documentElement.classList.add("scrolling");

  const animation = () => {
    const now = (performance.now() - startTime) / duration;
    const progress = transition(now);

    if (now < 1) {
      window.requestAnimationFrame(animation);
      window.scrollTo(0, from + (to - from) * progress);
    } else {
      const { scrollY } = window;

      if (typeof target !== "number") {
        const { offsetTop } = target;

        if (scrollY < offsetTop - 100 || scrollY > offsetTop + 100) {
          window.scrollTo(0, to);
          document.documentElement.classList.remove("scrolling");

          if (recursive <= 3) {
            scrollTo(target, duration, recursive + 1);
          }
        }
        document.documentElement.classList.remove("scrolling");
      } else {
        window.scrollTo(0, to);
        document.documentElement.classList.remove("scrolling");
      }
    }
  };

  animation();
}

export function scrollToAsync(
  target: number,
  duration = 500
): Promise<void> | undefined {
  if (
    target === null ||
    document.documentElement.classList.contains("scrolling")
  )
    return;

  // eslint-disable-next-line consistent-return
  return new Promise((resolve) => {
    const from = window.scrollY;
    const transition = (x: number): number => Math.sqrt(1 - (x - 1) ** 2);
    const startTime = performance.now();

    document.documentElement.classList.add("scrolling");

    const animation = () => {
      const now = (performance.now() - startTime) / duration;
      const progress = transition(now);

      if (now < 1) {
        window.requestAnimationFrame(animation);
        window.scrollTo(0, from + (target - from) * progress);
      } else {
        window.scrollTo(0, target);
        document.documentElement.classList.remove("scrolling");
        resolve();
      }
    };

    animation();
  });
}
