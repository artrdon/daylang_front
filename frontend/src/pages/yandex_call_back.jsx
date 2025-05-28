import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import vars from '/api.js'

const CallbackHandler = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            axios.post( `${vars['APIURL']}/auth/yandex/callback/`, { code })
                .then((res) => {
                    localStorage.setItem('token', res.data.access_token);
                    navigate('/');
                })
                .catch((err) => console.error(err));
        }
    }, [navigate]);

    return (
        <>
            <div>Загрузка...</div>
            <script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"></script>
        </>
    );
};

export default CallbackHandler;