import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

function MessageChange({ text, id, finishChange, change }) {

    let params = useParams();

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');

const [message, setData1] = useState({text: text, id: params.id, messId: id});
  const divRef = useRef(null);
const [smileVisible, setSmileVisible] = useState(false);
const [theme, setTheme] = useState(getCookie('theme'));

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

  const change_mess = async (e) => {
      if (message.text != ""){
          message.text = message.text.replace(/\s+/g, ' ').trim();
          if (message.text === " " || message.text === "")
          {
              return;
          }
          else
          {
              change(id, message.text);
              finishChange(id);
          }
      }
    
  };

  const addEmoji = (emoji) => {
    document.getElementById("messChange").innerText += emoji.emoji;
  };
  
  // Функция для переключения видимости элемента
 /* const toggleVisibility = (idd) => {
    if (visibleId === idd) {
      setVisibleId(null); // Если элемент уже видим, скрываем его
    } else {
      setVisibleId(idd); // Иначе показываем элемент с этим id
    }
  };
*/
    return (
            <>
            <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1000, backgroundColor: "#00000030", backdropFilter: "blur(3px)"}} onClick={() => finishChange(id)}/>
         <div className="inviz_panel_of_writing" style={{ zIndex: 1000 }}>
            <div className="jos_inviz_panel">
              <div className="centering_of_mess_panel">
                <div className="some_vizible_part">
                  <button className="delete_mess_button" onClick={clear_mess}>
                    <img
                      src="/src/static/img/delete.png"
                      alt="delete"
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
                    style={{ borderRadius: 0 }}
                  />
                  <div className="clear_and_send_buttons_pos">
                    <button className="extra_mess_button" onClick={smileVisibility}>
                      <img
                        src="/src/static/img/delete.png"
                        alt="emoji"
                        className="img_delete"
                      />
                    </button>
                        {smileVisible && 
                        <div className="emoji_picker" >
                          <EmojiPicker theme={theme} onEmojiClick={addEmoji} width={"100%"}/>
                        </div>}
                    <button className="sending_button" onClick={(e) => change_mess(e)}>
                      <img src="/src/static/img/send.png" alt="send" className="img_send" />
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