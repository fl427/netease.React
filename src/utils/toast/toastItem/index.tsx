import React, { useEffect, useMemo } from 'react';
import './index.scss';

interface Props {
    type?: string;
    onClose?: (id?: string) => void;
    id?: string;
    text?: string;
    duration?: number;
    hintIcon?: any;
}

const ToastItem: React.FC<Props> = ({ type, onClose, id, text, duration, hintIcon }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) {
                onClose(id);
            }
        }, duration || 2000);
        return (): void => {
            clearTimeout(timer);
        };
    }, []);

    // 真正的Toast内容
    const Item = useMemo(() => {
        if (type === 'info') {
            return <div className="toast-item-info">{text}</div>;
        } else {
            // type === 'remind' 下方提示
            return (
                <div className="toast-item-hint">
                    {hintIcon}
                    {text}
                </div>
            );
        }
    }, [type, text]);

    return <div className="toast-item">{Item}</div>;
};

export default ToastItem;
