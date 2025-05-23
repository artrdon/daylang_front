import { useState, useEffect, useRef, React, Fragment } from 'react';
import { useParams } from "react-router";
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery, } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import arrLangMessage from '/languages/message.js'
import EmojiPicker from 'emoji-picker-react';
import Calendar from 'react-calendar';
import AppMess from '/src/AppMess.jsx'
import AppMessLoad from '/src/AppMessLoad.jsx'
import Message_comp from '/src/elems/message_comp.jsx'
import MessageChange from '/src/elems/change_mess.jsx'
import Bye_and_call from '/src/elems/bye_and_call_button.jsx'
import DoBye from '/src/elems/do_bye.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';


function Message_load() {
  const params = useParams();
  const navigate = useNavigate();

const [text, setText] = useState(null);
const [messId, setMessId] = useState(null);

  const [webmessage, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);


  const [ifBye, setBye] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [changeMess, setMessChanger] = useState(false);
  const [groups, setGroup] = useState([]);
  const [infoForHeader, setHeader] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMeTyping, setIsMeTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [components, setComponents] = useState([]);
  const [componentsMess, setComponentsMess] = useState([]);

  // Функция, которая будет вызываться при нажатии на кнопку
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Меняем состояние на противоположное
  };
  
  const goback = () => {
      window.history.back();
  }


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
  
    const [theme, setTheme] = useState(getCookie('theme'));

    const csrfToken = getCookie('csrftoken');
    const lang = getCookie('lang');
    


    document.querySelector("title").textContent = `Message`;

    const [date7, setDate7] = useState(new Date());
    const [message, setData1] = useState({text: '', id: params.id});

    return (
        <>
    <div className="message_find_panel">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="panel_of_messages">
          <div className="panel_of_header">
            <div className="goback_but" onClick={goback}>
              <img
                src="/src/static/img/gobackblack.png"
                alt="toback"
                className='message_goback_img'
              />
            </div>
            <div className="positing_of_micro_chel">

            </div>
          </div>
          <div className="place_of_mess">
              <div id="mesfield" className="message_mess_block" >


              
            </div>
          </div>
          <div className="inviz_panel_of_writing">
            <div className="jos_inviz_panel">
              <div className="centering_of_mess_panel">
                <div className="some_vizible_part">
                  <button className="delete_mess_button">
                    <img
                      src="/src/static/img/delete.png"
                      alt="delete"
                      className="img_delete"
                    />
                  </button>
                  <div
                    translate="no"
                    id="mess"
                    data-text={arrLangMessage[lang]['message']}
                    className="input_panel"
                    name="text"
                    style={{ borderRadius: 0,  }}
                  />
                  <div className="clear_and_send_buttons_pos">
                    <button className="extra_mess_button">
                      <img
                        src="/src/static/img/delete.png"
                        alt="open emoji"
                        className="img_delete"
                      />
                    </button>
                    
                    <button className="sending_button">
                      <img src="/src/static/img/send.png" alt="send" className="img_send" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</>

  )
}

export default Message_load
