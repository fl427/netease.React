import React from 'react';
// import { Track } from '../../../types/index';
import { Track } from '@src/types';
import './index.scss';

interface Props {
    tracks?: any[];
}

const Footer: React.FC<Props> = ({ tracks }) => {

    return (
        <div className={'footer'}>
            <div className={'footer-progress'} />
            <div className={'footer-music'}>
                <div className={'footer-music-album'} />
                <div className={'footer-music-info'}>
                    <div className={'footer-music-info-title'}>飘扬过海来看你</div>
                    <div className={'footer-music-info-author'}>周深</div>
                </div>
                <div className={'footer-music-like'} />
            </div>
            <div className={'footer-control'}>
                <div className={'footer-control-prev'} />
                <div className={'footer-control-play'} />
                <div className={'footer-control-next'} />
            </div>
            <div className={'footer-detail'}>
                <div className={'footer-detail-words'} />
                <div className={'footer-detail-list'} />
                <div className={'footer-detail-loop'} />
                <div className={'footer-detail-random'} />
                <div className={'footer-detail-volumn'}>
                    <div className={'footer-detail-volumn-icon'} />
                    <div className={'footer-detail-volumn-bar'} />
                </div>
                <div className={'footer-detail-expand'} />
            </div>
        </div>
    )
};

export default Footer;