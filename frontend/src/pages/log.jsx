import { useState, useEffect, state, handleChange, handleSubmit, setStat }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React, { Component } from 'react'
import Reg from '/src/pages/reg.jsx'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';



function Log() {

    const [count, setCount] = useState(0);
    const [ifChel, setIfChel] = useState(false);
    const [captcha, setCaptcha] = useState(null);
    const [confirmation, setConf] = useState(false);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const onChange = (value) => {
      console.log("Captcha value:", value);
      if (value === null){
        setIfChel(false); //strannosti
      }
      setCaptcha(value);
    }

    const csrfToken = getCookie('csrftoken');

    document.querySelector("title").textContent = "Authentication";

    const [data, setData] = useState({ username: '', password: ''});
    const [data1, setData1] = useState({ code: '', username: data.username, password: data.username});
    const history = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setData1({ ...data1, [e.target.name]: e.target.value });
    };

    const handleChange1 = (e) => {
        setData1({ ...data1, [e.target.name]: e.target.value });
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (captcha != null)
            {
                const response = await axios.post('http://api.daylang.ru/log/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                });
                /*if (response.data["if"] === "yes"){
                    document.cookie = `lang=${response.data['lang']}; path=/;max-age=31556926`;
                    window.location.replace('/'); // Нет возможности вернуться

                }*/
                setConf(true);
                const to_email = await axios.post(`http://api.daylang.ru/email/${response.data}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                });
                console.log('Response:', response.data);
            }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            if (captcha != null)
            {
                const response = await axios.post(`http://api.daylang.ru/confirm/`, data1, {
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
            }

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
              className="btn login_btn"
              type="submit"
              defaultValue="Login"
            />
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <ReCAPTCHA sitekey="6LdGfPgqAAAAAPx1WfbRE6TeQ8gM5KX6tgDheJoH" onChange={onChange} style={{ width: 180 }}/>
          </div>
        </form>
{ifChel && <div style={{ zIndex: 150, width: 100, height: 30, }}>podtverdi sto to chelovek</div>}
      </div>
      <div className="mt-4">
        <div style={{ display: "flex", justifyContent: "center" }}>
          Don't have an account?{" "}
          <a href="/reg/" style={{ marginLeft: 10, color: "white" ,}}>
            Sign Up
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          Forgot the password?{" "}
          <a href="/reg/" style={{ marginLeft: 10, color: "white" ,}}>
            Reset
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
        <form onSubmit={handleSubmit1}>
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
              value={data1.code}
            onChange={handleChange1}
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

export default Log
