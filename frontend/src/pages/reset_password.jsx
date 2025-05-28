import { useState, useRef }  from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import TwoMinuteTimer from '../elems/timer2min';
import axios from 'axios';
import vars from '/api.js'


function Log_reset() {

    const recaptchaRef = useRef(null);
    const [ifChel, setIfChel] = useState(false);
    const [captcha, setCaptcha] = useState(null);
    const [confirmation, setConf] = useState(false);
    const [new_password, setNewPassword] = useState(false);
    const [pass_diff, setPassDiff] = useState(false);
    const [timehave, setTimehave] = useState(true);

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  }


  
  if (getCookie('theme') === "dark"){
      if (document.querySelector('body') != null)
          document.querySelector('body').className = "dark_theme";
  }
  else{
      if (document.querySelector('body') != null)
          document.querySelector('body').className = "light_theme";
  }
  
  
  function change_theme() {
      if (document.querySelector('body').className === "dark_theme")
      {
  
          document.querySelector('body').className = "light_theme";
          document.cookie = "theme=light; path=/;max-age=31556926";
          document.getElementById('theme_img').setAttribute("src", `/src/static/img/sunce.png`);
      }
      else
      {
          document.querySelector('body').className = "dark_theme";
          document.cookie = "theme=dark; path=/;max-age=31556926";
          document.getElementById('theme_img').setAttribute("src", `/src/static/img/moon.png`);
      }
  }


    const onChange = (value) => {
      console.log("Captcha value:", value);
      if (value === null){
        setIfChel(false); //strannosti
      }
      setCaptcha(value);
    }


    document.querySelector("title").textContent = "Authentication";

    const [data, setData] = useState({ email: '', password1: '', password2: ''});
    const [data1, setData1] = useState({ code: '', email: data.email});
    const history = useNavigate();

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
              const to_email = await axios.post(`${vars['APIURL']}/email/${data.email}`, data, {
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
            //if (captcha != null)
            //{
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
          //  }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const token = await recaptchaRef.current.executeAsync();
        try {
            //if (captcha != null)
            //{
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
                
          //  }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };



    return (
        <>

{!confirmation && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{  width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
        <h3 id="form-title">Reset password</h3>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                Введите ваш email
              </span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <input
              className="btn login_btn"
              type="submit"
              defaultValue="Login"
            />
          </div>
          
        </form>
{ifChel && <div style={{ zIndex: 150, width: 100, height: 30, }}>podtverdi sto to chelovek</div>}
      </div>
    </div>
  </div>
</div>}

{confirmation && !new_password && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{  width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
        <h3 id="form-title">Confirm</h3>
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
{new_password && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div className="user_card">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
        <h3 id="form-title">New password</h3>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form onSubmit={handleSubmit2}>
          <div className="input-group mb-2">
            <input
              type="password"
              name="password1"
              placeholder="Password"
              className="form-control"
              value={data.password1}
            onChange={handleChange}
            />
          </div>
          <div className="input-group mb-2">
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              className="form-control"
              value={data.password2}
            onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <input
              className="btn login_btn"
              type="submit"
              defaultValue="Register Account"
            />
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <ReCAPTCHA sitekey={vars['KEY']} ref={recaptchaRef} size='invisible' theme='dark'/>
          </div>
        </form>
      </div>
      {pass_diff && <div>passwords are different</div>}
    </div>
  </div>
</div>}



</>

  )
}

export default Log_reset
