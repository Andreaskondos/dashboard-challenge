import { useEffect, useRef } from "react";

export function useOnClickOutside(closeFn: () => void, listenCapturing = true) {
  const ref = useRef<any>();

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target)) closeFn();
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [closeFn, listenCapturing]
  );

  return ref;
}
