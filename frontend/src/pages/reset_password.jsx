import { useState, useRef }  from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import TwoMinuteTimer from '../elems/timer2min';
import axios from 'axios';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import arrLangLogin from '../../languages/login_translate.js';


function Log_reset() {

    const recaptchaRef = useRef(null);
    const [ifChel, setIfChel] = useState(false);
    const [emailForCode, setEmailForCode] = useState('');
    const [confirmation, setConf] = useState(false);
    const [new_password, setNewPassword] = useState(false);
    const [pass_diff, setPassDiff] = useState(false);
    const [timehave, setTimehave] = useState(true);
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
    const theme = useState(websocket.theme);


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    

    const [data, setData] = useState({ email: '', password1: '', password2: ''});
    const [data1, setData1] = useState({ code: '', email: data.email});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setData1({ ...data1, [e.target.name]: e.target.value });
        setPassDiff(false);
    };

    const handleChange1 = (e) => {
        setData1({ ...data1, [e.target.name]: e.target.value });
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setConf(true);
            const to_email = await axios.post(`${vars['APIURL']}/email/`, { email: data.email, password1: data.password1, password2: data.password2}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', to_email.data);
        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${vars['APIURL']}/forgot_password/`, data1, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            if (response.data["if"] === "yes"){
                setNewPassword(true);
                
            }
            console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const token = await recaptchaRef.current.executeAsync();
        try {
            if (token != null)
            {
                const response = await axios.post(`${vars['APIURL']}/forgot_password_reset/`, { email: data.email, password1: data.password1, password2: data.password2, captcha: token}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                });
                console.log('Response:', response.data);
                if (response.data["if"] === "yes"){
                    window.location.replace('/log/');
                }
                if (response.data["if"] === "passwords are different"){
                    setPassDiff(true);
                }
                
            }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

    document.querySelector("title").textContent = arrLangLogin[lang]['reset_password'];


    return (
        <>

{!confirmation && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div className='reg_log_the_main_header'>
        <h3 id="form-title">{arrLangLogin[lang]['reset_password']}</h3>
      </div>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text">
                {arrLangLogin[lang]['enter_ur_email']}
              </span>
            </div>
            <input
              type="email"
              name="email"
              placeholder={arrLangLogin[lang]['email']}
              className="form-control"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="login_container">
            <input
              className="login_btn"
              type="submit"
              defaultValue="Login"
            />
          </div>
        </form>
        {ifChel && <div className='reg_log_error_text'>{arrLangLogin[lang]['confirm_u_r_human']}</div>}
      </div>
    </div>
  </div>
</div>}

{confirmation && !new_password && <div style={{ width: "100vw", height: "100svh" }}>
  <div style={{  width: "100vw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div className='reg_log_the_main_header'>
        <h3 id="form-title">{arrLangLogin[lang]['reset_password']}</h3>
      </div>
      <div className="form_container">
        <form onSubmit={handleSubmit1}>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text">
                {arrLangLogin[lang]['email_send_code']} <b>{data.email}</b>
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
{new_password && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div className="user_card">
      <div className='reg_log_the_main_header'>
        <h3 id="form-title">{arrLangLogin[lang]['new_password']}</h3>
      </div>
      <div className="form_container">
        <form onSubmit={handleSubmit2}>
          <div className="input-group">
            <input
              type="password"
              name="password1"
              placeholder={arrLangLogin[lang]['password']}
              className="form-control"
              value={data.password1}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password2"
              placeholder={arrLangLogin[lang]['confirm_password']}
              className="form-control"
              value={data.password2}
              onChange={handleChange}
            />
          </div>
          <div className="login_container">
            <input
              className="login_btn"
              type="submit"
            />
          </div>
          <div className="login_container">
            <ReCAPTCHA sitekey={vars['KEY']} ref={recaptchaRef} size='invisible' theme={theme[0]}/>
          </div>
        </form>
      </div>
      {pass_diff && <div>{arrLangLogin[lang]['passwords_are_different']}</div>}
    </div>
  </div>
</div>}

</>

  )
}

export default Log_reset
