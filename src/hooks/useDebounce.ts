import { useRef } from "react";

export default (cb: Function, delay: number) => {
  const timeoutId = useRef<number | null>(null);

  return function (...args: any[]) {
    if (timeoutId.current) {
      // This check is not strictly necessary
      window.clearTimeout(timeoutId.current);
    }
    timeoutId.current = window.setTimeout(() => cb(...args), delay);
  };
};
