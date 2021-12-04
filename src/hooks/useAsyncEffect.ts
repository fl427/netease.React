import { useEffect } from 'react';

interface CallbackProp {
    callback: () => void | Promise<void>,
    unmount?: () => void;
    deps: [];
}

const useAsyncEffect = (
    callback: () => void | Promise<void> | Promise<() => void>,
    deps?: any[],
) => {
    useEffect(() => {
        let result: void | Promise<void> | (() => void);
        (async () => {
            result = await callback();
        })();
        return () => {
            result && typeof result === 'function' && result();
        }
    }, deps);
};

export function test(a: number, b?: number) {
    if (b) {
        return b;
    }
    return a;
}

export default useAsyncEffect;