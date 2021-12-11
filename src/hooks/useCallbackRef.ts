export {}
// import { DependencyList, useCallback, useEffect, useRef } from 'react';
//
// export function useCallbackRef<T extends (...args: any[]) => any>(
//   fn: T,
//   deps: DependencyList
// ): React.MutableRefObject<T> {
//   const callback = useCallback(fn, deps);
//   const handle = useRef<T>(callback);
//   useEffect(() => {
//     handle.current = callback;
//   });
//
//   return handle;
// }
