import { useState, useRef, useEffect, useCallback }  from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios';
import TwoMinuteTimer from '../elems/timer2min';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import arrLangLogin from '../../languages/login_translate.js';
import { useNavigate } from 'react-router-dom';
import { useSmartCaptcha } from '../once/useSmartCaptca.jsx';
import arrLangErrors from '../../languages/errors.js';
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha'


function ForbiddenTries() {



return (
    <>
<div className="not_found_all_container_404_positing" >
    <div className='not_found_all_container_404'>
        <div className='not_found_font_404'>
            <p>403</p>
              <div style={{display: "flex", justifyContent: 'center'}}>
                <div className='notfound_link_for_404'>
                  Закончился лимит попыток, приходите через 1 час
                </div>
              </div>
        </div>
    </div>
</div>
</>
)
}

function Log() {
    const env = import.meta.env;
    const { executeCaptcha, captchaReady } = useSmartCaptcha(env.VITE_KEY);
    const [if403, setIf403] = useState(false);
    const [ifChel, setIfChel] = useState(null);
    const [confirmation, setConf] = useState(false);
    const [timehave, setTimehave] = useState(true);
    const [emailForCode, setEmailForCode] = useState('');
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
    const theme = useState(websocket.theme);
    const [requestWasSended, setRequestWasSended] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const [token, setToken] = useState('');  
    const [visible, setVisible] = useState(false);  
    const handleChallengeHidden = useCallback(() => setVisible(false),);  
    

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

  
    const [data, setData] = useState({ email: '', password: '', captcha: ''});
    const [data1, setData1] = useState({ code: '', email: data.email, password: data.password});
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

    const onSuccess = (token) => {
      setToken(token);
      console.log("success", token);
      setVisible(false);
      //handleSubmit(e);
    }
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
      
        e.preventDefault();
        if (!token){
          setVisible(!visible);
          console.log(visible);
          window.smartCaptcha.execute();
          return;
        }
        //const token = await executeCaptcha();
        try {
            console.log(token);
            setRequestWasSended(true);
            const response = await axios.post(`${env.VITE_APIURL}/log/`, { email: data.email, password: data.password, captcha: token}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            //console.log(response.data);
            if (response.data === "user_with_email_has_another_account"){
              alert(arrLangErrors[lang]["user_with_email_has_another_account"]);
              setRequestWasSended(false);
              return;
            }
            setEmailForCode(response.data);
            
            if (response.data != 'username or password is incorrect' && response.data != "user_with_email_has_another_account"){
              setConf(true);
              const to_email = await axios.post(`${env.VITE_APIURL}/email/`, { password: data.password, captcha: token, email: response.data}, {
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': getCookie('csrftoken'),
                  },
              });

            }
            else{
              setPassIncor(true);
            }
          
        } catch (error) {
          if (error.response?.status === 403){
            setIf403(true);
            setRequestWasSended(false);
            document.cookie = `many_tries=yes; path=/;max-age=3600`;
            return;
          }
          console.error('There was an error!', error.response.data);
        }
        setRequestWasSended(false);
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            setRequestWasSended(true);
            const response = await axios.post(`${env.VITE_APIURL}/confirm/`, data1, {
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
            setRequestWasSended(false);
        }
        setRequestWasSended(false);
    };

      const handleYandexLogin = () => {
          const clientId = env.VITE_clientId;
          const redirectUri = encodeURIComponent(`${env.VITE_FRONT_URL}/auth/yandex/callback`);
          const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
          window.location.href = url;

      };

    useEffect(() => {
      if (getCookie('many_tries') === 'yes'){
        setIf403(true);
      }
  
      if (error){
        alert(arrLangErrors[lang][error]);
      }
    }, []);
      

    document.querySelector("title").textContent = arrLangLogin[lang]['log'];

    return (
        <>

{if403 && 
  <ForbiddenTries />
}

{!if403 && 
  <div style={{width: "100vw", height: "100svh", position: "fixed", zIndex: 1, display: "flex", justifyContent: "center"}}>
    <div className='log_reg_text_main_div'>
      <p className='log_reg_before_using'>Перед использованием необходимо войти в аккаунт</p>
    </div>
  </div>
}

{!confirmation && !if403 &&
<>
  <div style={{ width: "100vw", height: "100svh", position: "fixed", zIndex: 10 }}>
    <div style={{  width: "100vw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="user_card">
        <div className="form_container">
          <form onSubmit={handleSubmit} id='form_to_captcha_submit'>
            <div className="input-group">
              <input
                type="text"
                name="email"
                placeholder={arrLangLogin[lang]['email']}
                className="form-control"
                value={data.email}
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
            <div className="input-group">
              <input
                type="submit"
                defaultValue="Login"
                id='login_button'
                hidden
              />
              {!requestWasSended && <label htmlFor="login_button" className="login_btn">{arrLangLogin[lang]['login']}</label>}
              {requestWasSended && <div className="login_btn"><div className='loading-spinnerButton'></div></div>}
            </div>
            <p className='log_and_reg_text_login_via' >Или войти через:</p>
            <div style={{display: "flex", justifyContent: "center"}}>
              <button onClick={handleYandexLogin} className='log_and_reg_oauth_services'>
                <img src="/src/static/img/yandex.jpg" alt="yandex" style={{width: "100%", height: "100%"}}/>
              </button>
            </div>
            <InvisibleSmartCaptcha sitekey={env.VITE_KEY} onSuccess={onSuccess} onChallengeHidden={handleChallengeHidden} visible={visible} style={{zIndex:100}}/>  
  
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
        </div>
      </div>
    </div>
  </div>
</>}
{confirmation && !if403 && <div style={{ width: "100vw", height: "100svh", position: "fixed", zIndex: 10 }}>
  <div style={{ width: "100vw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
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
          <TwoMinuteTimer setTimehave={setTimehave} handleSubmit={handleSubmit}/>
          <input
              type="submit"
              id='button_to_confirm_email'
              defaultValue="Confirm"
              hidden
            />
          {timehave > 0 && !requestWasSended &&
            <label htmlFor='button_to_confirm_email' className="login_btn">{arrLangLogin[lang]['confirm']}</label>
          }
          {timehave > 0 && requestWasSended &&
            <div className="login_btn"><div className='loading-spinnerButton'></div></div>
          }
        </form>
      </div>
    </div>
  </div>
</div>}
<script src="https://smartcaptcha.yandexcloud.net/captcha.js" defer></script>
{/*<script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"></script>*/}

</>
  )
}

export default Log
