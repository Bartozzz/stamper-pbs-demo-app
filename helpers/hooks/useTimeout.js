import React from "react";

export default function useTimeout(callback, delay) {
  const refCallback = React.useRef();
  const refTimer = React.useRef();

  React.useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    refTimer.current = setTimeout(refCallback.current, delay);

    return () => clearTimeout(refTimer.current);
  }, [delay]);
}
