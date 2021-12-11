export {};
// import React, { useState } from 'react';
//
// import { observe } from './observe';
//
// export interface IntersectionOptions extends IntersectionObserverInit {
//   // 指定根(root)元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为null，则默认为浏览器视窗。
//   root?: Element | null;
//   // 根(root)元素的外边距。类似于 CSS 中的 margin 属性，比如 "10px 20px 30px 40px" (top, right, bottom, left)。如果有指定 root 参数，则 rootMargin 也可以使用百分比来取值。该属性值是用作 root 元素和 target 发生交集时候的计算交集的区域范围，使用该属性可以控制 root 元素每一边的收缩或者扩张。默认值为0。
//   rootMargin?: string;
//   // 可以是单一的 number 也可以是 number 数组，target 元素和 root 元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行。如果你只是想要探测当 target 元素的在 root 元素中的可见性超过50%的时候，你可以指定该属性值为0.5。如果你想要 target 元素在 root 元素的可见程度每多25%就执行一次回调，那么你可以指定一个数组 [0, 0.25, 0.5, 0.75, 1]。默认值是0 (意味着只要有一个 target 像素出现在 root 元素中，回调函数将会被执行)。该值为1.0含义是当 target 完全出现在 root 元素中时候 回调才会被执行。
//   threshold?: number | number[];
//   // 是否只执行一次callback
//   triggerOnce?: boolean;
// }
//
// export type InViewHookResponse = [(node?: Element | null) => void, boolean] & {
//   ref: (node?: Element | null) => void;
//   inView: boolean;
// };
//
// export const useInView = ({
//   root,
//   rootMargin,
//   threshold,
//   triggerOnce,
// }: IntersectionOptions = {}): InViewHookResponse => {
//   const [inView, setInView] = useState(false);
//   const unobserve = React.useRef<() => void>();
//   const thresholdToString = Array.isArray(threshold) ? threshold.toString() : threshold;
//   const setRef = React.useCallback(
//     node => {
//       // 如果node已经绑定观察者，先解绑
//       if (unobserve.current !== undefined) {
//         unobserve.current();
//         unobserve.current = undefined;
//       }
//
//       if (node) {
//         unobserve.current = observe(
//           node,
//           InView => {
//             setInView(InView);
//
//             if (InView && triggerOnce && unobserve.current) {
//               // 执行一次
//               unobserve.current();
//               unobserve.current = undefined;
//             }
//           },
//           {
//             root,
//             rootMargin,
//             threshold,
//           }
//         );
//       }
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [thresholdToString, root, rootMargin, triggerOnce]
//   );
//
//   const result = [setRef, inView] as InViewHookResponse;
//   // eslint-disable-next-line prefer-destructuring
//   result.ref = result[0];
//   // eslint-disable-next-line prefer-destructuring
//   result.inView = result[1];
//   return result;
// };
