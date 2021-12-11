export {};
// todo: 注意这是公司代码，绝对不能直接使用
// export type ObserverInstanceCallback = (inView: boolean) => void;
// const ObserverMap = new Map<
// string,
// {
//   id: string;
//   observer: IntersectionObserver;
//   elements: Map<Element, Array<ObserverInstanceCallback>>;
// }
// >();
// const RootIds: WeakMap<Element | Document, string> = new WeakMap();
// let rootId = 0;
// /**
//  * 根据root Element生成唯一ID
//  * @param root
//  */
// function getRootId(root: IntersectionObserverInit['root']): string | undefined {
//   if (!root) {
//     return '0';
//   }
//   if (RootIds.has(root)) {
//     return RootIds.get(root);
//   }
//   rootId += 1;
//   RootIds.set(root, rootId.toString());
//   return RootIds.get(root);
// }
//
// /**
//  * 根据option配置生成ID
//  * 确保在使用相同的配置时，使用同一个观察者，不再需要重新生成
//  * @param options
//  */
// export function optionsToId(options: IntersectionObserverInit): string {
//   return Object.keys(options)
//     .sort()
//     .filter(key => options[key as keyof IntersectionObserverInit] !== undefined)
//     .map(key => `${key}_${key === 'root' ? getRootId(options.root) : options[key as keyof IntersectionObserverInit]}`)
//     .toString();
// }
//
// function createObserver(options: IntersectionObserverInit): {
//   id: string;
//   observer: IntersectionObserver;
//   elements: Map<Element, ObserverInstanceCallback[]>;
// } {
//   // 根据options的字段生成唯一的观察者配置
//   const id = optionsToId(options);
//   let instance = ObserverMap.get(id);
//
//   if (!instance) {
//     // 创建被观察者的MAP
//     const elements = new Map<Element, Array<ObserverInstanceCallback>>();
//     // eslint-disable-next-line prefer-const
//     let thresholds: number[] | readonly number[];
//
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         // 确定是否在视图中
//         const inView = entry.isIntersecting && thresholds.some(threshold => entry.intersectionRatio >= threshold);
//
//         elements.get(entry.target)?.forEach(callback => {
//           callback(inView);
//         });
//       });
//     }, options);
//
//     // 确保我们有一个有效的阈值数组。如果不是，请使用选项中的阈值
//     thresholds =
//       observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
//
//     instance = {
//       id,
//       observer,
//       elements,
//     };
//
//     ObserverMap.set(id, instance);
//   }
//
//   return instance;
// }
//
// /**
//  * @param element - 被观察的DOM
//  * @param callback - inView状态改变时触发的回掉
//  * @param options - IntersectionObserver的options配置
//  * @return Function - 使IntersectionObserver停止监听特定目标元素
//  */
// export function observe(
//   element: Element,
//   callback: ObserverInstanceCallback,
//   options: IntersectionObserverInit = {}
// ): () => void {
//   if (!element) {
//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     return (): void => {};
//   }
//   // 创建一个观察者
//   const { id, observer, elements } = createObserver(options);
//
//   // 注册回调
//   const callbacks = elements.get(element) || [];
//   if (!elements.has(element)) {
//     elements.set(element, callbacks);
//   }
//
//   callbacks.push(callback);
//   observer.observe(element);
//
//   return function unobserve(): void {
//     // 从回掉数组中删除callback
//     callbacks.splice(callbacks.indexOf(callback), 1);
//
//     if (callbacks.length === 0) {
//       // element不存在回掉时，销毁
//       elements.delete(element);
//       observer.unobserve(element);
//     }
//
//     if (elements.size === 0) {
//       // 没有元素被观察时，让IntersectionObserver停止监听工作
//       observer.disconnect();
//       ObserverMap.delete(id);
//     }
//   };
// }
