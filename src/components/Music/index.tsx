import React from "react";
import './index.scss';

const Music: React.FC = () => {
    return (
        <div className={'music'}>
            <div className={'album'}/>
            <div className={'title'}>Happy Hits</div>
            <div className={'author'}>by Apple Music</div>
        </div>
    );
};

export default Music;