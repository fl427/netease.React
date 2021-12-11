// https://overreacted.io/zh-hans/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef } from 'react';

const useInterval = (callback: (...args: any[]) => any, delay = 0, immediate = false): void => {
  const savedCallback = useRef<(...args: any[]) => any>();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    const tick = (): void => {
      savedCallback.current && savedCallback.current();
    };
    if (immediate) {
      tick();
    }
    const id: number = window.setInterval(tick, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

export default useInterval;
