export {}
// import React, { useEffect, useState } from 'react';
//
// import ImgError from '../../common/imgs/img-error.png';
// // ui
// import VideoIcon from '../../common/svg/video-icon.svg';
// import { IntersectionOptions, useInView } from '../../hooks/use-in-view/useInView';
//
// import './index.scss';
//
// export enum Status {
//   Loading = 'loading',
//   Loaded = 'loaded',
//   Error = 'error'
// }
//
// export interface DefaultSize {
//   width: string;
//   height: string;
// }
//
// export interface lazyImgaeProps {
//   defaultSize: DefaultSize;
//   options?: IntersectionOptions;
//   src: string;
//   style?: React.CSSProperties;
//   errImgStyle?: React.CSSProperties;
//   imgStyle?: React.CSSProperties;
//   needNativeFetch?: boolean;
//   needVideoIcon?: boolean;
//   // 使用xhr加载图片，优点是可以取消请求，缺点是需要走两次network（一次xhr，一次src）。推荐在长列表中开启该功能。
//   needXhrLoad?: boolean;
//   onClick?: () => void;
//   // 图片错误状态触发
//   onError?: () => void;
//   // 图片加载完成触发
//   onComplete?: () => void;
// }
//
// // eslint-disable-next-line max-lines-per-function
// export const LazyImage: React.FC<lazyImgaeProps> = ({
//   options,
//   defaultSize,
//   src,
//   style,
//   errImgStyle,
//   imgStyle,
//   needNativeFetch,
//   needVideoIcon,
//   needXhrLoad,
//   onClick,
//   onError,
//   onComplete,
// }) => {
//   // 距离元素50px的时候触发显示
//   const { rootMargin = '50px 0px 50px 0px' } = options ?? {};
//   const { ref, inView } = useInView({
//     ...options,
//     rootMargin,
//   });
//
//   const [status, setStatus] = useState<Status>(Status.Loading);
//
//   const [realUrl, setRealUrl] = useState<string>('');
//
//   const [imgXhr, setImgXhr] = useState<XMLHttpRequest>();
//
//   const handleLoadImage = () => {
//     // 错误之后src兜底
//     const handleError = () => {
//       setImgXhr(undefined);
//       setRealUrl(src);
//     };
//     if (!needXhrLoad) {
//       setRealUrl(src);
//       return;
//     }
//     if (imgXhr) {
//       return;
//     }
//     const xhr = new XMLHttpRequest();
//     setImgXhr(xhr);
//     xhr.responseType = 'blob';
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           // 得到blob
//           const blobData = xhr?.response;
//           const data = blobData && window.URL.createObjectURL(blobData);
//           if (!data) {
//             handleError();
//             return;
//           }
//           setRealUrl(data);
//         }
//       }
//     };
//     xhr.onabort = function () {
//       setImgXhr(undefined);
//     };
//     xhr.onerror = function () {
//       handleError();
//     };
//     xhr.open('GET', src, true);
//     xhr.send();
//   };
//
//   const nativeFetchImage = async (): Promise<void> => {
//     handleLoadImage();
//     // 此方法有问题，暂时注释
//     // try {
//     //   const res = await bridge.common.fetchImage({ imgUrl: src });
//     //   if (res.code === 1) {
//     //     setRealUrl(res.data.imgData);
//     //     // 暂时不开启map缓存，因为目前base64数据太大。
//     //     return;
//     //   }
//     //   handleLoadImage();
//     // } catch (error) {
//     //   handleLoadImage();
//     // }
//   };
//
//   useEffect(() => {
//     status === Status.Loaded && onComplete?.();
//     status === Status.Error && onError?.();
//   }, [status]);
//
//   useEffect(() => {
//     if (inView && !realUrl) {
//       if (needNativeFetch) {
//         nativeFetchImage().then();
//       } else {
//         handleLoadImage();
//       }
//     }
//     if (!inView) {
//       imgXhr?.abort();
//     }
//   }, [inView]);
//
//   useEffect(
//     () => () => {
//       imgXhr?.abort();
//     },
//     []
//   );
//
//   const handleError = () => (
//     <div
//       className={'img-error'}
//       style={{ ...defaultSize, ...errImgStyle }}
//       onClick={(e): void => {
//         setStatus(Status.Loading);
//         e.stopPropagation();
//         if (needNativeFetch) {
//           nativeFetchImage().then();
//         } else {
//           handleLoadImage();
//         }
//       }}
//     >
//       <img src={ImgError} alt={''} />
//       <div>图片加载失败，点击重试</div>
//     </div>
//   );
//
//   return (
//     <>
//       {status === Status.Error ? (
//         handleError()
//       ) : (
//         <div
//           ref={ref}
//           className={status === Status.Loading ? 'loadContent' : ''}
//           onClick={(): void => {
//             // 加载中也可以点击预览
//             onClick?.();
//           }}
//           style={{
//             position: 'relative',
//             ...defaultSize,
//             height: status === Status.Loaded ? 'auto' : defaultSize.height,
//             ...style,
//           }}
//         >
//           {needVideoIcon ? (
//             <div className="video-icon">
//               <img src={VideoIcon} alt="" />
//             </div>
//           ) : null}
//           {realUrl && (
//             <img
//               src={realUrl}
//               className={'imageBlock'}
//               style={{ ...defaultSize, ...imgStyle }}
//               onLoad={(e): void => {
//                 e.stopPropagation();
//                 setStatus(Status.Loaded);
//               }}
//               onError={(): void => {
//                 setStatus(Status.Error);
//               }}
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// };
