import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import ToastItem from '../toastItem/index';
import { ToastInterface } from '../index';
import './index.scss';

export interface RefInterface {
    pushToast: (toastToPush: ToastInterface) => void;
}

// 生成唯一的id
let toastCount = 0;
const getUniqueId = (): string => `toast-container${new Date().getTime()}-${toastCount++}`;

const ToastContainer: React.ForwardRefRenderFunction<RefInterface, {}> = ({}, ref) => {
    const [toastList, setToastList] = useState<ToastInterface[]>([]);

    // 将新的 toast push 到 toastContainer 中
    const pushToast = (toastToPush: ToastInterface): void => {
        console.log('执行ToastContainer.pushToast++++', toastToPush, toastList);
        const { type = 'info', text = '', duration, hintIcon } = toastToPush;
        const toastListAfterPush = [...toastList, { id: getUniqueId(), type, text, duration, hintIcon }];
        // setToastList(toastListAfterPush); //展示所有的提示
        setToastList([{ id: getUniqueId(), type, text, duration, hintIcon }]); // 仅展示最后一个提示
    };

    // 将被销毁的toast剔除
    const popToast = (id?: string): void => {
        if (!id) {
            setToastList([]);
            return;
        }
        const newList = toastList.filter((item: ToastInterface) => item.id !== id);
        setToastList(newList);
    };

    useImperativeHandle(ref, (): any => ({
        pushToast,
    }));

    useEffect(() => {
        console.log('初始');
        return (): void => {
            console.log('卸载');
            setToastList([]);
        };
    }, []);

    return (
        <div className="toast-container">
            {toastList.reverse().map((toast: ToastInterface) => (
                <ToastItem key={toast.id} {...toast} onClose={popToast} />
            ))}
        </div>
    );
};

export default forwardRef(ToastContainer);
