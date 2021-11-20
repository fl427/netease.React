import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Header: React.FC = () => {
    const navigate = useNavigate();
    // 后退
    const handleGoBack = (): void => {
        navigate(-1);
    }

    // 前进
    const handleGoForward = (): void => {
        navigate(1);
    }

    return (
        <div className={'header'}>
            <div className={'header-route'}>
                <div className={'header-route-back'} onClick={handleGoBack}>
                    <div className={'arrow-icon'}/>
                </div>
                <div className={'header-route-forward'} onClick={handleGoForward}>
                    <div className={'arrow-icon'}/>
                </div>
            </div>
            <div className={'header-options'}>
                <div className={'header-options-btn'}>首页</div>
                <div className={'header-options-btn'}>发现</div>
                <div className={'header-options-btn'}>音乐库</div>
            </div>
            <div className={'header-search'}>
                <div>搜索</div>
            </div>
        </div>
    )
};

export default Header;