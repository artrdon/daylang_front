import { useState, useRef }  from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import TwoMinuteTimer from '../elems/timer2min';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import arrLangLogin from '../../languages/login_translate.js';


function Log() {

    const [ifChel, setIfChel] = useState(null);
    const [confirmation, setConf] = useState(false);
    const [timehave, setTimehave] = useState(true);
    const [emailForCode, setEmailForCode] = useState('');
    const recaptchaRef = useRef(null);
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
    const theme = useState(websocket.theme);

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
    const [data, setData] = useState({ username: '', password: '', captcha: ''});
    const [data1, setData1] = useState({ code: '', username: data.username, password: data.username});
    const [passIncor, setPassIncor] = useState(false);
    const history = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setData1({ ...data1, [e.target.name]: e.target.value });
        setPassIncor(false);
    };

    const handleChange1 = (e) => {
        setData1({ ...data1, [e.target.name]: e.target.value });
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await recaptchaRef.current.executeAsync();
        setData({ ...data, captcha: token });
        try {
          if (token != null)
          {
            const response = await axios.post(`${vars['APIURL']}/log/`, { username: data.username, password: data.password, captcha: token}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log(response.data);
            setEmailForCode(response.data);
            if (response.data != 'username or password is incorrect'){
              setConf(true);
              const to_email = await axios.post(`${vars['APIURL']}/email/`, { username: data.username, password: data.password, captcha: token, email: response.data}, {
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': getCookie('csrftoken'),
                  },
              });

              console.log('Response:', to_email.data);

            }
            else{
              setPassIncor(true);
            }
          }
          else
          {
            setIfChel(false);
          }
        } catch (error) {
          if (error.response?.status === 403){
            window.location.replace('/forbidden/');
            return;
          }
          console.error('There was an error!', error.response.data);
        }
        recaptchaRef.current.reset();
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${vars['APIURL']}/confirm/`, data1, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            if (response.data["if"] === "yes"){
                document.cookie = `lang=${response.data['lang']}; path=/;max-age=31556926`;
                window.location.replace('/');
            }
            console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

      const handleYandexLogin = () => {
          const clientId = '4fc7bce46ef14fcf9ee912093e44fa1c';
          const redirectUri = encodeURIComponent(`${vars['FRONT_URL']}/auth/yandex/callback`);
          const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
          window.location.href = url;
      };


    document.querySelector("title").textContent = arrLangLogin[lang]['log'];

    return (
        <>

{!confirmation && <div style={{ width: "100vw", height: "100svh" }}>
  <div style={{  width: "100vw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div className='reg_log_the_main_header'>
        <h3 id="form-title">{arrLangLogin[lang]['log']}</h3>
      </div>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder={arrLangLogin[lang]['username']}
              pattern="[a-zA-Z0-9]{1,140}"
              className="form-control"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder={arrLangLogin[lang]['password']}
              className="form-control"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="login_container">
            <input
              type="submit"
              defaultValue="Login"
              id='login_button'
              hidden
            />
            <label htmlFor="login_button" className="login_btn">{arrLangLogin[lang]['login']}</label>
          </div>
          <div className="login_container">
            <ReCAPTCHA sitekey={vars['KEY']} ref={recaptchaRef} size='invisible' theme={theme[0]}/>
          </div>
          <button onClick={handleYandexLogin}>
            Войти через Яндекс
          </button>
        </form>
      </div>
      <div className="mt-4">
        {ifChel === false && <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='reg_log_error_text' >{arrLangLogin[lang]['confirm_u_r_human']}</div>
        </div>}
        {passIncor && <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='reg_log_error_text' >{arrLangLogin[lang]['username_or_password_is_incorrect']}</div>
        </div>}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {arrLangLogin[lang]['dont_have_an_account']}
          <Link to="/reg/" className='log_reg_other_links'>
            {arrLangLogin[lang]['sign_up']}
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {arrLangLogin[lang]['forgot_the_password']}
          <Link to="/log/reset/" className='log_reg_other_links'>
            {arrLangLogin[lang]['reset']}
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>}

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
                {arrLangLogin[lang]['email_send_code']} <b>{emailForCode}</b>
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

{/*<script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"></script>*/}

</>
  )
}

export default Log
