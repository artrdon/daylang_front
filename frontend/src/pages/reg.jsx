import { useState, useRef }  from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import TwoMinuteTimer from '../elems/timer2min';
import axios from 'axios';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import arrLangLogin from '../../languages/login_translate.js';
import { useSmartCaptcha } from '../once/useSmartCaptca.jsx';


function Reg() {
  const env = import.meta.env;
    axios.defaults.withCredentials = true;

    const { executeCaptcha, captchaReady } = useSmartCaptcha(env.VITE_KEY);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleEmail, setIsVisibleEmail] = useState(false);
    const [ifChel, setIfChel] = useState(false);
    const [confirmation, setConf] = useState(false);
    const [timehave, setTimehave] = useState(true);
    const [emailForCode, setEmailForCode] = useState('');
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
    const theme = useState(websocket.theme);
    const [isChecked, setIsChecked] = useState(false);
    const [requestWasSended, setRequestWasSended] = useState(false);

    const [data, setData] = useState({ username: '', email: '', password1: '', password2: '', first_name: '', last_name: ''});
    const [data2, setData2] = useState({ code: '', username: '', email: '', password1: '', password2: '', first_name: '', last_name: ''});

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setData2({ ...data2, [e.target.name]: e.target.value });
        setIsVisible(false);
        setIsVisibleEmail(false);
    };


    const handleChange2 = (e) => {
        setData2({ ...data2, [e.target.name]: e.target.value });
    };

    

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            if (!isChecked){
              alert(arrLangLogin[lang]['u_must_agree_with']);
              return;
            }
            const token = await executeCaptcha();
            setData({ ...data, captcha: token });
            if (token != null)
            {
                setRequestWasSended(true);
                const response = await axios.post(`${env.VITE_APIURL}/reg/`, { username: data.username, email: data.email, password1: data.password1, password2: data.password2, first_name: data.first_name, last_name: data.last_name, captcha: token}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                });
                setEmailForCode(response.data);
               // console.log(response.data);
                if (response.data === "ima")
                {
                    setIsVisible(true);
                }
                else if (response.data === "ima_email")
                {
                    setIsVisibleEmail(true);
                }
                else{
                    setConf(true);
                    const email = await axios.post(`${env.VITE_APIURL}/email/`, { username: data.username, email: response.data, password1: data.password1, password2: data.password2, first_name: data.first_name, last_name: data.last_name}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                    });
                }

            }
            else{
                setIfChel(true);
            }
        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
        setRequestWasSended(false);
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
          setRequestWasSended(true);
            const response = await axios.post(`${env.VITE_APIURL}/confirmreg/`, data2, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            if (response.data["if"] === "yes"){
                document.cookie = `lang=${response.data['lang']}; path=/;max-age=31556926`;
                window.location.replace('/'); // Нет возможности вернуться
            }
            console.log('Response:', response.data);

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
        setRequestWasSended(false);
    };
    const handleYandexLogin = () => {
        const clientId = env.VITE_clientId;
        const redirectUri = encodeURIComponent(`${env.VITE_FRONT_URL}/auth/yandex/callback`);
        const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
        window.location.href = url;
    };


    document.querySelector("title").textContent = arrLangLogin[lang]['reg'];

    return (
        <>


<div style={{width: "100vw", height: "100svh", position: "fixed", zIndex: 1, display: "flex", justifyContent: "center"}}>
  <div className='log_reg_text_main_div'>
    <p className='log_reg_before_using'>Перед использованием необходимо войти в аккаунт</p>
  </div>
</div>


{!confirmation && <div style={{ width: "100vw", height: "100svh", position: "fixed", zIndex: 10,  }}>
  <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div className="user_card">
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              pattern="[a-zA-Z0-9]{1,140}"
              placeholder={arrLangLogin[lang]['username']}
              className="form-control"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder={arrLangLogin[lang]['email']}
              className="form-control"
              value={data.login}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password1"
              placeholder={arrLangLogin[lang]['password']}
              className="form-control"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password2"
              placeholder={arrLangLogin[lang]['confirm_password']}
              className="form-control"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="first_name"
              placeholder={arrLangLogin[lang]['first_name']}
              className="form-control"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="last_name"
              placeholder={arrLangLogin[lang]['last_name']}
              className="form-control"
              value={data.second_name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              className='reg_log_agree_with_privacy_checkbox'
              type="checkbox"
              name='checkbox'
              id='i_agree'
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="i_agree" className='reg_log_agree_with_privacy'><span>{arrLangLogin[lang]['i_agree_with']}</span><Link to={'/privacy/'} className='log_reg_other_links' ><span>{arrLangLogin[lang]['privacy']}</span></Link></label>
          </div>
          {isVisible && <div className='reg_log_error_text' >{arrLangLogin[lang]['user_exist']}</div>}
          {isVisibleEmail && <div className='reg_log_error_text' >{arrLangLogin[lang]['email_exist']}</div>}
          {ifChel && <div className='reg_log_error_text' >{arrLangLogin[lang]['confirm_u_r_human']}</div>}
          <div className="login_container">
            <input
              type="submit"
              defaultValue="Register Account"
              id='reg_button'
              hidden
            />
            {!requestWasSended && <label htmlFor="reg_button" className="login_btn">{arrLangLogin[lang]['registration']}</label>}
            {requestWasSended && <div className="login_btn"></div>}
          </div>
          <p className='log_and_reg_text_login_via' >Или войти через:</p>
          <div style={{display: "flex", justifyContent: "center"}}>
            <button onClick={handleYandexLogin} className='log_and_reg_oauth_services'>
              <img src="/src/static/img/yandex.jpg" alt="yandex" style={{width: "100%", height: "100%"}}/>
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {arrLangLogin[lang]['already_have_an_account']}
          <Link to="/log/" className='log_reg_other_links'>
            {arrLangLogin[lang]['log']}
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>}
{confirmation && <div style={{ width: "100vw", height: "100svh", position: "fixed", zIndex: 10,  }}>
  <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div className="form_container">
        <form onSubmit={handleSubmit2}>
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
              value={data2.code}
              onChange={handleChange2}
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
            <div className="login_btn">{arrLangLogin[lang]['confirm']}</div>
          }
        </form>
      </div>
    </div>
  </div>
</div>}
</>
  )
}

export default Reg
