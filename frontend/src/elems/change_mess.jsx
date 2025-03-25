import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';

function MessageChange({ text, id, finishChange, change }) {

    let params = useParams();

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');

const [visibleId, setVisibleId] = useState(null); // Состояние для хранения id видимого элемента
const [confirm, setIsVisible] = useState(false);
const [message, setData1] = useState({text: text, id: params.id, messId: id});
  const divRef = useRef(null);
const [smileVisible, setSmileVisible] = useState(false);

 useEffect(() => {
    if (divRef.current) {
      divRef.current.textContent = message.text;
    }
  }, [message.text]);

  const smileVisibility = () => {
    setSmileVisible(!smileVisible); // Меняем состояние на противоположное
  };


 const handleInput = (e) => {
    setData1({ ...message, text: e.target.innerText });
  };

  const change_mess = async (e, idd) => {
      if (message.text != ""){
            message.text = message.text.replace(/\s+/g, ' ').trim();
            if (message.text === " " || message.text === "")
            {
                finishChange(id);
                return;
            }
        }
      change(id, message.text);
      finishChange(id);
  };


  // Функция для переключения видимости элемента
  const toggleVisibility = (idd) => {
    if (visibleId === idd) {
      setVisibleId(null); // Если элемент уже видим, скрываем его
    } else {
      setVisibleId(idd); // Иначе показываем элемент с этим id
    }
  };

    return (
            <>
            <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,  opacity: 0.5, zIndex: 1000, backgroundColor: "black"}} onClick={() => finishChange(id)}/>
         <div className="inviz_panel_of_writing" style={{ zIndex:1000 }}>
            <div className="jos_inviz_panel">
              <div className="centering_of_mess_panel">
                <div className="some_vizible_part">
                  <button className="delete_mess_button" onClick={clear_mess}>
                    <img
                      src="/src/static/img/delete.png"
                      alt=""
                      className="img_delete"
                    />
                  </button>
                  <div
                    translate="no"
                    id="messChange"
                    contentEditable="true"
                    className="input_panel"
                    name="text"
                    ref={divRef}
                    onInput={handleInput}
                    style={{ borderRadius: 0,  }}
                  />
                  <div className="clear_and_send_buttons_pos">
                    <button className="extra_mess_button" onClick={smileVisibility}>
                      <img
                        src="/src/static/img/delete.png"
                        alt=""
                        className="img_delete"
                      />
                    </button>
                        {smileVisible && <div className="extra_mess">
                            <div style={{ overflow: "auto" }}>
                                <button style={{width: 30, height: 30, backgroundColor: "white", margin: 10,}} onClick={() => add_smile(1)}>

                                </button>
                                <button style={{width: 30, height: 30, backgroundColor: "white", margin: 10,}} onClick={() => add_smile(1)}>

                                </button>
                                <button style={{width: 30, height: 30, backgroundColor: "white", margin: 10,}} onClick={() => add_smile(1)}>

                                </button>
                                <button style={{width: 30, height: 30, backgroundColor: "white", margin: 10,}} onClick={() => add_smile(1)}>

                                </button>
                            </div>

                        </div>}
                    <button className="sending_button" onClick={(e) => change_mess(e, 1)}>
                      <img src="/src/static/img/send.png" alt="" className="img_send" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </>
    )
}

export default MessageChange