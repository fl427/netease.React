import React from "react";
import Music from "../Music";
import './index.scss';

interface Props {
    onClick?: () => void;
    title?: string;
}
const Module: React.FC<Props> = ({onClick, title}) => {
    return (
        <div className={'home-module'} onClick={onClick}>
            <div className={'home-module-title'}>{title}</div>
            <div className={'home-module-content'}>
                <Music />
                <Music />
            </div>
        </div>
    );
}

export default Module;