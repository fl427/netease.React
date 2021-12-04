import React from "react";
import './index.scss';

interface Props {
    onClick?: () => void;   // 点击封面或题目
    coverImg?: string;      // 封面
    playCount?: number;     // 收听量
    title?: string;         // 题目
    author?: string;        // 作者
}

const Album: React.FC<Props> = ({ onClick, coverImg, playCount, title, author}) => {
    return (
        <div className={'album'}>
            <img className={'cover-img'} src={coverImg} onClick={onClick}/>
            <div className={'play-count'}>{playCount}</div>
            <div className={'title'} onClick={onClick}>{title}</div>
            <div className={'author'}>{author}</div>
        </div>
    );
};

export default Album;