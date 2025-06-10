import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import arrLangLogin from '../../languages/login_translate.js';
import TwoMinuteTimer from '../elems/timer2min';
import { useWebSocket } from '../once/web_socket_provider.jsx';

const CallbackHandler = () => {
    const env = import.meta.env;
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
    const [confirmation, setConf] = useState(false);
    const [timehave, setTimehave] = useState(true);
    const [emailForCode, setEmailForCode] = useState({username: '', email: '', first_name: '', last_name: ''});
    const [data1, setData1] = useState({ code: '', username: emailForCode.username, email: emailForCode.email, first_name: emailForCode.first_name, last_name: emailForCode.last_name});
    const handleChange1 = (e) => {
        setData1({ ...data1, [e.target.name]: e.target.value });
    }
    const [passIncor, setPassIncor] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            axios.post( `${env.APIURL}/auth/yandex/callback/`, { code })
                .then((res) => {
                    localStorage.setItem('token', res.data.access_token);
                   // navigate('/');
                })
                .catch((err) => console.error(err));

                try {
                    const response = axios.post(`${env.VITE_APIURL}/auth/yandex/callback/`, { code }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                    });
                  //  console.log(response.data);
                    setEmailForCode(response.data);
                    setConf(true);
                    
                } catch (error) {
                    if (error.response?.status === 403){
                        window.location.replace('/forbidden/');
                        return;
                    }
                    console.error('There was an error!', error.response.data);
                }
        }
    }, [navigate]);

    const handleSubmit1 = async (e) => {
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
            console.error('There was an error!', error.response.data);
        }
    };


    return (
        <>
            
        {confirmation && <div style={{ width: "100vw", height: "100vh" }}>
        <div style={{ width: "100vw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="user_card">
            <div className='reg_log_the_main_header'>
                <h3 id="form-title">{arrLangLogin[lang]['log']}</h3>
            </div>
            <div className="form_container">
                <form onSubmit={handleSubmit1}>
                <div className="input-group">
                    <div className="input-group-append">
                    <span className="input-group-text">
                        {arrLangLogin[lang]['email_send_code']} <b>{emailForCode.email}</b>
                    </span>
                    </div>
                    <input
                        type="number"
                        max={999999}
                        min={100000}
                        name="code"
                        placeholder={arrLangLogin[lang]['code_from_email']}
                        className="form-control"
                        value={data1.code}
                        onChange={handleChange1}
                    />
                </div>
                <TwoMinuteTimer setTimehave={setTimehave}/>
                <input
                    type="submit"
                    id='button_to_confirm_email'
                    defaultValue="Confirm"
                    hidden
                    />
                {timehave > 0 && 
                    <label htmlFor='button_to_confirm_email' className="login_btn">{arrLangLogin[lang]['confirm']}</label>
                }
                </form>
            </div>
            </div>
        </div>
        </div>}

            <script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"></script>
        </>
    );
};

export default CallbackHandler;