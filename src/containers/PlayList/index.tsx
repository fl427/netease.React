import React from 'react';
import { useLocation } from 'react-router-dom';
import './index.scss';

const PlayList: React.FC = () => {
    const location = useLocation();
    console.log('location,', location.state);
    return (
        <div>
            PlayList
        </div>
    );
};

export default PlayList;