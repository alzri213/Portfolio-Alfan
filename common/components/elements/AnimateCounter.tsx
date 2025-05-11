import { HTMLProps, useEffect, useRef } from "react";
import { useMotionValue, animate } from "framer-motion";

interface AnimateCounterProps extends HTMLProps<HTMLSpanElement> {
  total: number;
}

const AnimateCounter = ({ total, ...rest }: AnimateCounterProps) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, total, {
      duration: 1,
      onUpdate: (value) => {
        if (countRef.current) {
          countRef.current.textContent = Math.floor(value).toString();
        }
      },
    });

    return () => controls.stop();
  }, [total, motionValue]);

  return <span {...rest} ref={countRef} />;
};

export default AnimateCounter;