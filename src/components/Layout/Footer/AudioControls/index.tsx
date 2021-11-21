import React from "react";
import './index.scss';

interface Props {
    isPlaying: boolean;
    onPlayPauseClick: (arg0: boolean) => void;
    onPrevClick: () => void;
    onNextClick: () => void;
}

const AudioControls: React.FC<Props> = ({
   isPlaying,
   onPlayPauseClick,
   onPrevClick,
   onNextClick
}) => (
    <div className="audio-controls">
        <button
            type="button"
            className="prev"
            aria-label="Previous"
            onClick={onPrevClick}
        >
            {/*<Prev />*/}
        </button>
        {isPlaying ? (
            <button
                type="button"
                className="pause"
                onClick={() => onPlayPauseClick(false)}
                aria-label="Pause"
            >
                {/*<Pause />*/}
            </button>
        ) : (
            <button
                type="button"
                className="play"
                onClick={() => onPlayPauseClick(true)}
                aria-label="Play"
            >
                {/*<Play />*/}
            </button>
        )}
        <button
            type="button"
            className="next"
            aria-label="Next"
            onClick={onNextClick}
        >
            {/*<Next />*/}
        </button>
    </div>
);

export default AudioControls;
