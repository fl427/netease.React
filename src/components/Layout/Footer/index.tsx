import React, { useState, useRef, useEffect } from 'react';
import { Track } from '@src/types';
import './index.scss';
import AudioControls from './AudioControls';

interface Props {
    tracks?: Track[];
}

const Footer: React.FC<Props> = ({
    tracks = [{
        title: '飘扬过海来看你',
        author: '周深',
        album: '',
        audioSrc: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_93477122&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3'
    }]
}) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Destructure for conciseness
    const { title, album, author, audioSrc } = tracks[trackIndex] ?? {};

    // Refs
    const audioRef = useRef(new Audio(audioSrc));
    /**
     * TypeScript 是运行在 Nodejs 环境下的，TS 编译之后的代码是运行在浏览器环境下的
     * Nodejs 和浏览器中的window 他们各自实现了一套自己的 setInterval，
     * 原来代码是 this.timer = setInterval( ... )
     * 这里的 setInterval 是 Nodejs 定义的 setInterval
     * 代码应该修改成：this.timer = window.setInterval( ... )
     * 建议使用 useRef 来创建 timer，让 timer.current = window.setInterval( ... )，
     * 这样其他地方也可以方便获取到 timer
     */
    const intervalRef = useRef<number>();
    const isReady = useRef(false);

    // Destructure for conciseness
    const { duration } = audioRef.current;

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
        -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [trackIndex]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    const onScrub = (value: string) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = Number(value);
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    };

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    }

    return (
        <div className={'footer'}>
            <input
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                className={'footer-progress'}
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
                style={{ background: trackStyling }}
            />
            <div className={'footer-music'}>
                <div className={'footer-music-album'} />
                <div className={'footer-music-info'}>
                    <div className={'footer-music-info-title'}>飘扬过海来看你</div>
                    <div className={'footer-music-info-author'}>周深</div>
                </div>
                <div className={'footer-music-like'} />
            </div>
            <div className={'footer-control'}>
                {/*<div className={'footer-control-prev'} />*/}
                {/*<div className={'footer-control-play'} />*/}
                {/*<div className={'footer-control-next'} />*/}
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
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