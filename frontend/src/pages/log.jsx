import { useState, useRef }  from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import TwoMinuteTimer from '../elems/timer2min';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';


function Log() {

    const [ifChel, setIfChel] = useState(null);
    const [confirmation, setConf] = useState(false);
    const [timehave, setTimehave] = useState(true);
    const recaptchaRef = useRef(null);
    const websocket = useWebSocket();
    const theme = useState(websocket.theme);

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  }
  

    document.querySelector("title").textContent = "Authentication";

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
                window.location.replace('/'); // Нет возможности вернуться

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

    return (
        <>

{!confirmation && <div style={{ width: "100vw", height: "100svh" }}>
  <div style={{  width: "100vw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
        <h3 id="form-title">LOGIN</h3>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-user" />
              </span>
            </div>
            <input
              type="text"
              name="username"
              placeholder="username"
              pattern="[a-zA-Z0-9]{1,140}"
              className="form-control"
              value={data.username}
            onChange={handleChange}
            />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={data.password}
            onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <input
              
              type="submit"
              defaultValue="Login"
              id='login_button'
              hidden
            />
            <label htmlFor="login_button" className="btn login_btn">Login</label>
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <ReCAPTCHA sitekey={vars['KEY']} ref={recaptchaRef} size='invisible' theme={theme[0]}/>
          </div>
          <button onClick={handleYandexLogin}>
            Войти через Яндекс
        </button>
        </form>


      </div>
      <div className="mt-4">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {ifChel === false && <div style={{ zIndex: 150, width: 100, height: 30, }}>podtverdi sto to chelovek</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {passIncor && <div style={{ zIndex: 150, width: 100, height: 30, }}>username or password is incorrect</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          Don't have an account?{" "}
          <Link to="/reg/" className='log_reg_other_links'>
            Sign Up
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          Forgot the password?{" "}
          <Link to="/log/reset/" className='log_reg_other_links'>
            Reset
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>}

{confirmation && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{  width: "100vw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
        <h3 id="form-title">LOGIN</h3>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form onSubmit={handleSubmit1}>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                Введите код из email
              </span>
            </div>
            <input
              type="number"
              max={999999}
              min={100000}
              name="code"
              placeholder="code from email"
              className="form-control"
              value={data1.code}
            onChange={handleChange1}
            />
          </div>
          <TwoMinuteTimer setTimehave={setTimehave}/>
          {timehave > 0 && <input
              className="btn login_btn"
              type="submit"
              defaultValue="Confirm"
            />}
          
        
        </form>
      </div>
    </div>
  </div>
</div>}

<script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"></script>


</>

  )
}

export default Log
