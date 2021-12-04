import React from 'react';
import ReactDOM from 'react-dom';

import ToastContainer, { RefInterface } from './toastContainer';

export interface ToastInterface {
  id?: string;
  type?: string;
  text: string;
  duration?: number;
  hintIcon?: JSX.Element;
}

interface OuterInputInfo {
  text: string;
  duration?: number;
}

interface OuterInputHint extends OuterInputInfo {
  hintIcon?: JSX.Element;
}

const dispatchToast = (): Record<string, (toast?: ToastInterface) => void> => {
  // 这里用于存放我们的Toast
  const toastContainerWrapper = document.createElement('div');
  document.body.appendChild(toastContainerWrapper);
  // let toastContainer: RefInterface;
  const toastContainerRef: React.RefObject<RefInterface> = React.createRef<RefInterface>();

  ReactDOM.render(<ToastContainer ref={toastContainerRef} />, toastContainerWrapper);

  return {
    push(toast: ToastInterface | undefined): void {
      toast && toastContainerRef.current?.pushToast(toast);
    },
    destroy(): void {
      ReactDOM.unmountComponentAtNode(toastContainerWrapper);
      document.body.removeChild(toastContainerWrapper);
    },
  };
};

let toast: ReturnType<typeof dispatchToast>;
const execute = (newToast: ToastInterface): void => {
  // 这个地方决定了是否新建一个实例，进而决定了toast是叠加态还是顺序向下排
  if (!toast) {
    toast = dispatchToast();
  }
  return toast.push(newToast);
};

export default {
  info(input: OuterInputInfo): void {
    return execute({ ...input, type: 'info' });
  },
  hint(input: OuterInputHint): void {
    return execute({ ...input, type: 'hint' });
  },
};
