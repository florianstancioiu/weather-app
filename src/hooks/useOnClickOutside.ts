import { useEffect } from "react";

export default (
  ref: React.RefObject<HTMLDivElement | null>,
  cb: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (event.target instanceof Node) {
        if (ref.current && !ref.current.contains(event.target)) {
          cb();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
};
