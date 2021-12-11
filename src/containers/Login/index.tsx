import useAsyncEffect from '@src/hooks/useAsyncEffect';
import React, { useEffect, useState } from 'react';

import { getLoginQrKey, getLoginQrCheck, getLoginQrCreate } from '@src/apis/login';
import './index.scss';

const Login: React.FC = () => {

    const [qrUrl, setQrUrl] = useState<string>();

    useAsyncEffect(async () => {
        const { data: keyData } = await getLoginQrKey();
        console.log('key', keyData.unikey );
        const key = keyData.unikey;

        const { data: qrData } = await getLoginQrCreate({ key, qrimg: true, timerstamp: Date.now() });
        console.log('res', qrData, qrData.qrimg);
        const qrUrl = qrData.qrimg;
        setQrUrl(qrUrl);
    }, []);

    return (
        <div>
            这是扫码登录页面
            <img src={qrUrl} />
        </div>
    );
};

export default Login;