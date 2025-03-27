import { useState, useEffect, state, handleChange, handleSubmit, setState }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import React, { Component } from 'react'
import Log from '/src/pages/log.jsx'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

function Reg() {

   // const [count, setCount] = useState(0)
       axios.defaults.withCredentials = true;

    document.querySelector("title").textContent = "Registration";
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleEmail, setIsVisibleEmail] = useState(false);
    const [ifChel, setIfChel] = useState(false);
    const [captcha, setCaptcha] = useState(null);
    const [confirmation, setConf] = useState(false);



    const [data, setData] = useState({ username: '', email: '', password1: '', password2: '', first_name: '', last_name: '', is_teacher: false });
    const [data2, setData2] = useState({ code: '', username: '', email: '', password1: '', password2: '', first_name: '', last_name: '', is_teacher: false });

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  }


  const theme = getCookie('theme');
  //console.log(getCookie('theme'));
  
  
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


    const csrfToken = getCookie('csrftoken');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setData2({ ...data2, [e.target.name]: e.target.value });
        setIsVisible(false);
        setIsVisibleEmail(false);
        console.log(data);
        console.log(data2);
    };

    const handleChange1 = (e) => {
        const { name, type, checked, value } = e.target;
        // If the input is a checkbox, use the `checked` value, otherwise use `value`
        setData({...data, [name]: type === 'checkbox' ? checked : value, });
        setData2({...data2, [name]: type === 'checkbox' ? checked : value, });
        console.log('Updated data:', data);
    };

    const handleChange2 = (e) => {
        setData2({ ...data2, [e.target.name]: e.target.value });
        console.log(data2);
    };

    const onChange = (value) => {
      console.log("Captcha value:", value);
      if (value === null){
        setIfChel(false);
      }
      setCaptcha(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (captcha != null)
            {
                const response = await axios.post('http://127.0.0.1:8000/reg/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                });

                console.log(response.data);
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
                    const email = await axios.post(`http://127.0.0.1:8000/email/${response.data}`, data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrfToken,
                        },
                    });
                }

                console.log('Response:', response.data);

            }
            else{
                setIfChel(true);
            }
            //window.history.back();

           // tut dolzna bitj avtomaticheskaja login

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/confirmreg/`, data2, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
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

    return (
        <>

{!confirmation && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div className="user_card">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
        <h3 id="form-title">REGISTER ACCOUNT</h3>
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
              placeholder="Username"
              className="form-control"
              value={data.username}
            onChange={handleChange}
            />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-envelope-square" />
              </span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={data.login}
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
              name="password1"
              placeholder="Password"
              className="form-control"
              value={data.password}
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
              name="password2"
              placeholder="Confirm password"
              className="form-control"
              value={data.password}
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
              type="text"
              name="first_name"
              placeholder="First name"
              className="form-control"
              value={data.name}
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
              type="text"
              name="last_name"
              placeholder="Last name"
              className="form-control"
              value={data.second_name}
            onChange={handleChange}
            />

          </div>
          <div>
          <label htmlFor="agree">
  <input type="checkbox" id="agree" name="is_teacher" checked={data.is_teacher} onChange={handleChange1}/> I am teacher </label>
          </div>
          {isVisible && <div style={{ zIndex: 150, width: 100, height: 30, }}>user ima</div>}
          {isVisibleEmail && <div style={{ zIndex: 150, width: 100, height: 30, }}>imail ima</div>}
          {ifChel && <div style={{ zIndex: 150, width: 100, height: 30, }}>podtverdi sto to chelovek</div>}
          <div className="d-flex justify-content-center mt-3 login_container">
            <input
              className="btn login_btn"
              type="submit"
              defaultValue="Register Account"
            />
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <ReCAPTCHA sitekey="6LdGfPgqAAAAAPx1WfbRE6TeQ8gM5KX6tgDheJoH" onChange={onChange}/>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <div style={{ display: "flex", justifyContent: "center" }}>
          Already have an account?{" "}
          <a href="/log/" style={{ marginLeft: 10, color: "white" }}>
            Login
          </a>
        </div>
      </div>
    </div>
  </div>
</div>}

{confirmation && <div style={{ width: "100vw", height: "100vh" }}>
  <div style={{  width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="user_card">
      <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
        <h3 id="form-title">LOGIN</h3>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form onSubmit={handleSubmit2}>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-user" />
              </span>
            </div>
            <input
              type="number"
              max={999999}
              min={100000}
              name="code"
              placeholder="code from email"
              className="form-control"
              value={data2.code}
              onChange={handleChange2}
            />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-key" />
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <input
              className="btn login_btn"
              type="submit"
              defaultValue="Confirm"
            />
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
          </div>
        </form>
      </div>
    </div>
  </div>
</div>}



</>

  )
}

export default Reg
