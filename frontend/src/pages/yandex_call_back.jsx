import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import arrLangLogin from '../../languages/login_translate.js';
import TwoMinuteTimer from '../elems/timer2min';
import { useWebSocket } from '../once/web_socket_provider.jsx';

const CallbackHandler = () => {
    const env = import.meta.env;
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            const handleSubmit1 = async (e=null) => {
                if (e !== null)
                    e.preventDefault();
                try {
                    const response = await axios.post(`${env.VITE_APIURL}/auth/yandex/callback/`, { code }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                    });
                    if (response?.status === 200){
                        window.location.href = '/';
                    }
                    
                } catch (error) {
                    console.error('There was an error!', error.response?.status, error.response?.data);
                }
            }
            
            (async () => {
                await handleSubmit1();
            })();
        }
    }, [navigate]);

/*    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${env.VITE_APIURL}/confirm_yandex/`, data1, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            if (response.data["if"] === "yes"){
                document.cookie = `lang=${response.data['lang']}; path=/;max-age=31556926`;
                window.location.replace('/');
            }
            //console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error!', error.response?.data);
        }
    };*/


    return (
        <>
            <div></div>
            <script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"></script>
        </>
    );
};

export default CallbackHandler;