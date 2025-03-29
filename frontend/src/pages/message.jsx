import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Routes, Route, Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import AppMess from '/src/AppMess.jsx'
import AppMessLoad from '/src/AppMessLoad.jsx'
import Message_comp from '/src/elems/message_comp.jsx'
import MessageChange from '/src/elems/change_mess.jsx'
import Bye_and_call from '/src/elems/bye_and_call_button.jsx'
import DoBye from '/src/elems/do_bye.jsx'
import axios from 'axios';

function Message() {
    let params = useParams();

const [text, setText] = useState(null);
const [messId, setMessId] = useState(null);

  const [webmessage, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [ifBye, setBye] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [changeMess, setMessChanger] = useState(false);
  const [groups, setGroup] = useState([0]);
  const [data3, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);


  // Функция, которая будет вызываться при нажатии на кнопку
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Меняем состояние на противоположное
  };

  useEffect(() => {

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        console.log(data);
        if (data.chat_id === params.id)
        {
            if (data.tip === "delete"){
                document.getElementById(`mess${data.id}`).remove();
                return;
            }

            if (data.tip === "change"){
                document.getElementById(data.id).children[0].children[0].firstChild.textContent = data.text;
                document.getElementById(data.id).children[0].children[0].children[0].children[1].innerText = "chan.";
                return;
            }
            setMessage(data.message);
            const newComponent = {
                id: data.id,
                text: data.message,
                sender: data.sender, // Уникальный идентификатор
            };
            setComponents((components) => [...components, newComponent]);

        }
         //   document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [groups]);

  const sendMessage = (gh) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "send", message: gh, id: params.id, sender: data.username }));
    } else {
      console.error('WebSocket is not open');
    }
  };

  const changeMessage = (idd, text) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "change", id: params.id, id_mess: idd, text: text }));
    } else {
      console.error('WebSocket is not open');
    }
  };

  const deleteMessage = (idd) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "delete", id: params.id, id_mess: idd }));
    } else {
      console.error('WebSocket is not open');
    }
  };

const messChange = (idd) => {
    if (changeMess === false) {
       let tex = document.getElementById(`mess${idd}`).children[0].children[0].firstChild.textContent;/////////////////////////////////////////////////////////
      //  console.log(text);
      setText(tex);
      setMessId(`mess${idd}`);
      setMessChanger(true); // Если элемент уже видим, скрываем его
    } else {
      setMessChanger(false); // Иначе показываем элемент с этим id
    }
}

    const [count, setCount] = useState(0)

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
    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

        var arrLang = {
      'English': {
          'message': "Send message",
      },
      'Русский': {
          'message': "Отправить сообщение",
      },
      'Srpski': {
          'message': "Pošaljite poruku",
      },
      'Српски': {
          'message': "Пошаљите поруку",
      },
      'Deutsch': {
          'message': "Nachricht senden",
      },
      'Español': {
          'message': "Enviar mensaje",
      },
      'عربي': {
          'message': "ارسل رسالة",
      }

    }




    document.querySelector("title").textContent = `Message` ;

    const [date7, setDate7] = useState(new Date());
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setData1] = useState({text: '', id: params.id});
    const [components, setComponents] = useState([]);

    const [data2, setData2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);

    const [name_of_chat, setData4] = useState(null);

    const [showComponent, setShowComponent] = useState(false);

    axios.defaults.withCredentials = true;

  const [data12, setData12] = useState(null);
  const [loading12, setLoading12] = useState(true);
  const [error12, setError12] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/userinfo/');
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
            setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://127.0.0.1:8000/offerinfo_bychat/${params.id}/`);
              setData3(response.data);
          } catch (err) {
              setError3(err.message);
          } finally {
              setLoading3(false);
          }
      };

      fetchData();
  }, []);

const ByeButton = () => {
    setBye(true);
}

const removeDataSetter = () => {
    setBye(false);
}



const add_smile = (par) => {
    document.getElementById("mess").innerText += '😀';

    }
 const handleInput = (e) => {
    setData1({ ...message, text: e.target.innerText });
  };


    const handleSubmit = async (e) => {
        if (document.getElementById("mess").innerText != ""){
            message.text = document.getElementById("mess").innerText.replace(/\s+/g, ' ').trim();
            if (message.text === " " || message.text === "")
                return 0;


            const g = document.getElementById("mess").innerText.replace(/\s+/g, ' ').trim();
            //console.log(g);
            sendMessage(g);

            document.getElementById("mess").textContent = "";
        }

    };

useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/getmessagelist/${params.id}/`);
                setData2(response.data);
                /*console.log(1);
                console.log(response.data);
                console.log(2);*/
                if (response.data != null)
                {
                   // console.log(3);
                    if (response.data.length === undefined){
                        /*console.log(4);
                        console.log("lolpre");*/
                        setData4(response.data.chat_name);
                    }
                    else{
                        //console.log(response.data);
                        setData4(response.data[0].chat_name);
                    }
                }

            } catch (err) {
                setError2(err.message);
            } finally {
            setLoading2(false);
            }
        };

        fetchData();
    }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getchatlist/');
        if (response.data != null){
            for (let i = 0; i < response.data[0].length; i++){
                console.log(response.data[0][i].id);
                setGroup((groups) => [...groups, response.data[0][i].id]);
            }
        }
        setData12(response.data);
      } catch (err) {
        setError12(err.message);
      } finally {
        setLoading12(false);
      }
    };

    fetchData();
  }, []);

    if (loading) return (
      <>
      <AppMessLoad lang={langua}/>
</>

  );
    if (error) return <p>Error: {error}</p>;

    if (loading2) return (
      <>
      <AppMessLoad lang={langua}/>
</>

  );
    if (error2) return <p>Error: {error}</p>;


  if (loading12) return (
      <>
      <AppMessLoad lang={langua}/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

//console.log(data2);


    return (
        <>
        <AppMess name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={data12[1]} photo={data.photo} balance={data.balance}/>
    <div className="message_find_panel">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="panel_of_messages">
          <div className="panel_of_header">
            <div className="goback_but" onClick={goback}>
              <img
                src="/src/static/img/gobackblack.png"
                alt=""
                style={{ height: 50, width: 70, marginTop: 10 }}
              />
            </div>
            <div className="positing_of_micro_chel">

    {(() => {
        if (data2.length != undefined) {
            return (<>

            <Link to={`/${data2[0].offerer}/offer/${data2[0].offer_id}/`}>
                <div style={{ position: "relative", cursor: "pointer", paddingLeft: 90, paddingRight: 80, marginTop: 10}}>
                  <img
                    src={data2[0].photo_of_offer}
                    alt="pupil"
                    className="img_of_micro_chel"
                  />
                  {/*(() => {
                      if (data12[0][params.id].me === true) {
                          return (<> <span className="ime" translate="no" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", overflowWrap: "anywhere", width: "calc(100% - 240px)", marginLeft: 10 }}>
                                        {data12[0][params.id].ime} {data12[0][params.id].prezime}
                                    </span> </>)

                      } else{
                          return (<> <span className="ime" translate="no" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", overflowWrap: "anywhere", width: "calc(100% - 240px)", marginLeft: 10 }}>
                                        {name_of_chat}
                                    </span> </>)

                      }


                      })()*/}

                </div>
            </Link>
            </>);
        }
    else{
        return (<>

         <Link to={`/${data2.offerer}/offer/${data2.offer_id}/`}>
                <div style={{ position: "relative", cursor: "pointer", paddingLeft: 90, paddingRight: 80, marginTop: 10 }}>
                  <img
                    src={data2.photo}
                    alt="pupil"
                    className="img_of_micro_chel"
                  />
                  <span className="ime" translate="no" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", overflowWrap: "anywhere", width: "calc(100% - 240px)", marginLeft: 10 }}>
                    {name_of_chat}
                  </span>
                </div>
              </Link>
         </>);
    }
      })()}

            </div>
            <Bye_and_call bye={ByeButton} am_teach={data.i_am_teacher} />
          </div>
          <div className="place_of_mess">
              <div id="mesfield" className="message_mess_block" >


    {(() => {
        if (data2.length != undefined) {
          return (<>

              {data2.map((da) => (
                  <Message_comp int={da.text} key={da.id} id={da.id} click={messChange} delet={deleteMessage} sender={da.sender} me={data.username} readed={da.readed} photo={da.photo} if_teach={da.senderIsTeacher} changed={da.ifChanged}/>
              ))}
              </>);
        }else{
            return (<>
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "gray", height: 200, width:300, borderRadius: 20 }}>
                        <p style={{ color: "black", marginTop: 30, fontWeight: "bold", fontSize: 20, marginLeft: 20, marginRight: 20, textAlign: "center" }}>There are no messages here yet</p>

                    </div>
                </div>

              </>);

        }
      })()}
  {components.map((component) => (
      <Message_comp int={component.text} key={component.id} id={component.id} click={messChange} delet={deleteMessage} sender={component.sender} me={data.username} readed={false}/>
      ))}

            </div>
          </div>
          <div className="inviz_panel_of_writing">
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
                    id="mess"
                    data-text={arrLang[lang]['message']}
                    contentEditable="true"
                    className="input_panel"
                    name="text"
                    value={message.text}
                    onInput={handleInput}
                    style={{ borderRadius: 0,  }}
                  />
                  <div className="clear_and_send_buttons_pos">
                    <button className="extra_mess_button" onClick={toggleVisibility}>
                      <img
                        src="/src/static/img/delete.png"
                        alt=""
                        className="img_delete"
                      />
                    </button>
                        {isVisible && <div className="extra_mess">
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
                    <button className="sending_button" onClick={handleSubmit}>
                      <img src="/src/static/img/send.png" alt="" className="img_send" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {changeMess && <MessageChange text={text} id={messId} finishChange={messChange} change={changeMessage}/>}
        </div>
      </div>
    </div>

      {ifBye && <DoBye setdate={setDate7} date={date7} removeDataSetter={removeDataSetter} am_teach={data.i_am_teacher} name_of_offer={data3.name_of_offer} price={data3.price} photo={data3.photo} review_score={data3.review_score} description={data3.description}/>}


</>

  )
}

export default Message
