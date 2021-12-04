import React from "react";
import './index.scss';

interface Props {
    coverImg?: string;  // 封面
    playCount?: number; // 收听量
    title?: string;     // 题目
    author?: string;    // 作者
}

const Album: React.FC<Props> = ({ coverImg, playCount, title, author}) => {
    return (
        <div className={'album'}>
            <img className={'cover-img'} src={coverImg} />
            <div className={'play-count'}>{playCount}</div>
            <div className={'title'}>{title}</div>
            <div className={'author'}>{author}</div>
        </div>
    );
};

export default Album;