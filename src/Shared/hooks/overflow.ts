import { useState, useEffect } from 'react';

export function useIsOverflowing(ref: { current: HTMLElement | null }): boolean {
  const [isOverflow, setIsOverflow] = useState(false);
  
  useEffect(() => {
    const { current } = ref;
    console.log(ref)
    if (current) {
      const checkOverflow = () => {
        const { scrollHeight, scrollWidth, clientHeight, clientWidth } = current;
        setIsOverflow(scrollHeight > clientHeight || scrollWidth > clientWidth);
      };
      checkOverflow();

      const resizeObserver = new ResizeObserver(checkOverflow);
      resizeObserver.observe(current);

      return () => resizeObserver.disconnect();
    }
  }, [ref]);

  return isOverflow;
}