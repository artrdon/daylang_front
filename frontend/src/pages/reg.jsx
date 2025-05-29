import { useState, useRef }  from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import TwoMinuteTimer from '../elems/timer2min';
import axios from 'axios';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';


function Reg() {

    axios.defaults.withCredentials = true;

    document.querySelector("title").textContent = "Registration";
    const recaptchaRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleEmail, setIsVisibleEmail] = useState(false);
    const [ifChel, setIfChel] = useState(false);
    const [confirmation, setConf] = useState(false);
    const [timehave, setTimehave] = useState(true);
    const websocket = useWebSocket();
    const theme = useState(websocket.theme);


    const [data, setData] = useState({ username: '', email: '', password1: '', password2: '', first_name: '', last_name: '', checkbox: false});
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
            if (!data.checkbox){
              alert("Вы должны согласиться на обработку персональных данных, нажав на флажок");
              return;
            }
            const token = await recaptchaRef.current.executeAsync();
            setData({ ...data, captcha: token });
            if (token != null)
            {
                const response = await axios.post(`${vars['APIURL']}/reg/`, { username: data.username, email: data.email, password1: data.password1, password2: data.password2, first_name: data.first_name, last_name: data.last_name, captcha: token}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
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
                    const email = await axios.post(`${vars['APIURL']}/email/${response.data}`, data, {
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
            //window.history.back();

           // tut dolzna bitj avtomaticheskaja login

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${vars['APIURL']}/confirmreg/`, data2, {
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
          <div className="input-group">
            
            <input
              type="text"
              name="username"
              pattern="[a-zA-Z0-9]{1,140}"
              placeholder="Username"
              className="form-control"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={data.login}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            
            <input
              type="password"
              name="password1"
              placeholder="Password"
              className="form-control"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              className="form-control"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              className="form-control"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              className="form-control"
              value={data.second_name}
              onChange={handleChange}
            />

          </div>
          <div className="input-group">
            
            <input
              type="checkbox"
              name='checkbox'
              id='i_agree'
              value={data.checkbox}
              onChange={handleChange}
            />
            <label htmlFor="i_agree">Я даю согласие на обработку моих персональных данных 
            в соответствии с <Link to={'/privacy/'} className='cookie_main_child_link' >политикой обработки персональных данных</Link></label>

          </div>
          {isVisible && <div style={{ zIndex: 150, width: 100, height: 30, }}>user ima</div>}
          {isVisibleEmail && <div style={{ zIndex: 150, width: 100, height: 30, }}>imail ima</div>}
          {ifChel && <div style={{ zIndex: 150, width: 100, height: 30, }}>podtverdi sto to chelovek</div>}
          <div className="d-flex justify-content-center mt-3 login_container">
            <input
              type="submit"
              defaultValue="Register Account"
              id='reg_button'
              hidden
            />
            <label htmlFor="reg_button" className="btn login_btn">Registration</label>
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <ReCAPTCHA sitekey={vars['KEY']} ref={recaptchaRef} size='invisible' theme={theme}/>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <div style={{ display: "flex", justifyContent: "center" }}>
          Already have an account?{" "}
          <Link to="/log/" className='log_reg_other_links'>
            Login
          </Link>
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
          <div className="input-group">
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
              value={data2.code}
              onChange={handleChange2}
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



</>

  )
}

export default Reg
