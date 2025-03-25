import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { Routes, Route, Link } from 'react-router-dom'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Message_comp from '/src/elems/message_comp.jsx'
import axios from 'axios';

function ChatCreate() {
    let params = useParams();

    const [count, setCount] = useState(0)

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');



    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setData1] = useState({username: params.username, offer_name: params.offer_name, offer_id: params.id});
    const isSent = useRef(false);

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;


useEffect(() => {
    console.log('useEffect executed');
    if (isSent.current) return; // Если запрос уже отправлен, выходим
        isSent.current = true; // Устанавливаем флаг

    const sendpost = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/create_chat/', message,{
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);
            if (response.data === "unauthenticated_ttt")
            {
                window.location.replace(`/log/`);
                return;
            }
            if (response.data[0] === "serializer.data")
            {
                window.location.replace(`/message_list/${response.data[1]}/${response.data[2]}/`);
            }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
        return 0;
    };

    sendpost();
  }, []);



    return (
        <>
        <AppLoad lang={langua}/>

    <div className="find_panel" style={{ width: "100%", height: "calc(100% - 70px)", }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="panel_of_messages">
          <div className="panel_of_header">
            <div className="goback_but" >
              <img
                src="/src/static/img/gobackblack.png"
                alt=""
                style={{ height: 50, width: 70 }}
              />
            </div>
            <div className="positing_of_micro_chel">
            </div>
          </div>
          <div className="place_of_mess">
              <div
                id="mesfield"
                style={{
                  display: "block",
                  overflow: "auto",
                  height: "100%",
                  position: "absolute",
                  width: "100%",
                  top: 0,
                  marginTop: 70
                }}
              >
            </div>
          </div>
          <div className="inviz_panel_of_writing">
            <div className="jos_inviz_panel">
              <div className="centering_of_mess_panel">
                <div className="some_vizible_part">
                  <button className="delete_mess_button">
                    <img
                      src="/src/static/img/delete.png"
                      alt=""
                      className="img_delete"
                    />
                  </button>
                  <div
                    translate="no"
                    id="mess"
                    data-text="Message"
                    contentEditable="true"
                    className="input_panel"
                    name="text"
                    style={{ borderRadius: 0,  }}
                  />
                  <div className="clear_and_send_buttons_pos">
                    <button className="extra_mess_button" >
                      <img
                        src="/src/static/img/delete.png"
                        alt=""
                        className="img_delete"
                      />
                    </button>
                    <button className="sending_button" >
                      <img src="/src/static/img/send.png" alt="" className="img_send" />
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

export default ChatCreate
