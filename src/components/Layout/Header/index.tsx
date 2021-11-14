import React from 'react';
import './index.scss';

const Header: React.FC = () => {
    return (
        <div className={'header'}>
            <div className={'header-route'}>
                <div>后退</div>
                <div>前进</div>
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