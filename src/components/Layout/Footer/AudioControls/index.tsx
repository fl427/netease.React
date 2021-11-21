import React from "react";
import {
    StepBackwardOutlined,
    StepForwardOutlined,
    CaretRightOutlined,
    PauseOutlined
} from '@ant-design/icons';
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
        <StepBackwardOutlined
            className="audio-controls-prev"
            aria-label="Previous"
            onClick={onPrevClick}
        />
        {isPlaying ? (
            <PauseOutlined
                className="audio-controls-pause"
                aria-label="Pause"
                onClick={() => onPlayPauseClick(false)}
            />
        ) : (
            <CaretRightOutlined
                className="audio-controls-play"
                aria-label="Play"
                onClick={() => onPlayPauseClick(true)}
            />
        )}
        <StepForwardOutlined
            className="audio-controls-next"
            aria-label="Next"
            onClick={onNextClick}
        />
    </div>
);

export default AudioControls;
