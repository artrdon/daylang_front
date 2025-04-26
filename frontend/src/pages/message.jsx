import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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

const ScrollToBottom = () => {
  const elementRef = useRef(null);

  
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return <div ref={elementRef} />;
};

function Message() {
  const params = useParams();
  const navigate = useNavigate();

const [text, setText] = useState(null);
const [messId, setMessId] = useState(null);

  const [webmessage, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [messNumb, setMessNumb] = useState(null);
  const [ifBye, setBye] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [changeMess, setMessChanger] = useState(false);
  const [groups, setGroup] = useState([0]);
  const [data3, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);
  const [infoForHeader, setHeader] = useState(null);


  // Функция, которая будет вызываться при нажатии на кнопку
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Меняем состояние на противоположное
  };

  useEffect(() => {

    const socket = new WebSocket(`${WSAPIURL}/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const dataMess = JSON.parse(event.data);

        console.log(dataMess);
        if (dataMess.chat_id === params.id)
        {
            if (dataMess.tip === "delete"){
                document.getElementById(`mess${dataMess.id}`).remove();
                
               // document.getElementById(`sett${dataMess.id}`).remove();
                return;
            }

            if (dataMess.tip === "change"){
                console.log(dataMess);
                if (dataMess.sender === data.username){
                  console.log("my message");
                  document.getElementById(dataMess.id).children[0].children[0].firstChild.textContent = dataMess.text;
                  document.getElementById(dataMess.id).children[0].children[0].children[0].children[0].innerText = "chan.";
                  document.getElementById(dataMess.id).children[0].children[0].children[0].children[0].style.marginRight = "10px";
                  return;
                }
                else{
                  console.log("its not my mess");
                  document.getElementById(dataMess.id).children[1].children[0].firstChild.textContent = dataMess.text;
                  document.getElementById(dataMess.id).children[1].children[0].children[0].children[0].innerText = "chan.";
                  document.getElementById(dataMess.id).children[1].children[0].children[0].children[0].style.marginRight = "10px";
                  return;
                }
                
            }
            if (dataMess.tip === "send"){
                setMessage(dataMess.message);
                if (String(dataMess.minute).length === 1){
                  dataMess.minute = "0" + String(dataMess.minute);
                }
                const newComponent = {
                    id: dataMess.id,
                    text: dataMess.message,
                    sender: dataMess.sender,
                    photo: dataMess.photo,
                    senderIsTeacher: dataMess.senderIsTeacher,
                    hour: dataMess.hour,
                    minute: dataMess.minute, // Уникальный идентификатор
                };
                setComponents((components) => [...components, newComponent]);
                return;
            }
            if (dataMess.tip === "sendvid"){
              //setMessage(dataMess.message);
              if (String(dataMess.minute).length === 1){
                dataMess.minute = "0" + String(dataMess.minute);
              }
              const newComponent = {
                  //id: dataMess.id,
                  tip: dataMess.tip,
                  text: "join to video room",
                  sender: dataMess.sender,
                  photo: dataMess.photo,
                  senderIsTeacher: dataMess.senderIsTeacher,
                  hour: dataMess.hour,
                  minute: dataMess.minute, 
                  link: dataMess.link, 
                  call_id: dataMess.call_id,
              };
              setComponents((components) => [...components, newComponent]);
              window.open(`${newComponent.link}${call_id}`, '_blank'); 
              return;
          }
            

        }
        else {
          if (dataMess.tip === "delete"){
              setMessNumb(prev => prev - 1);
              return;
          }
          setMessNumb(prev => prev + 1);
          
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

  const sendVideoRoom = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "sendvid", link: '/call/', id: params.id, sender: data.username  }));
      //document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    } else {
      console.error('WebSocket is not open');
    }
  };

  const sendMessage = (gh) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "send", message: gh, id: params.id, sender: data.username }));
      //document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    } else {
      console.error('WebSocket is not open');
    }
  };

  const changeMessage = (idd, text) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "change", id: params.id, id_mess: idd, text: text, sender: data.username  }));
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
    const [message, setData1] = useState({text: '', id: params.id});
    const [components, setComponents] = useState([]);

    const [data2, setData2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);

    const [name_of_chat, setData4] = useState(null);

    const [showComponent, setShowComponent] = useState(false);

    axios.defaults.withCredentials = true;


    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/userinfo/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
  

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`${APIURL}/offerinfo_bychat/${params.id}/`);
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
                const response = await axios.get(`${APIURL}/getmessagelist/${params.id}/`);
                setData2(response.data);
                if (response.data != null)
                {
                    if (response.data.length === undefined){
                        setData4(response.data.chat_name);
                    }
                    else{
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

 
    const { data: data12, isLoading: loading12, isError: error12, error: errorDetails12  } = useQuery({
      queryKey: [`getchatlist`], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/getchatlist/`);
  
        if (response.data != null){
            let group = [];
            for (let i = 0; i < response.data[0].length; i++){
                //setGroup((groups) => [...groups, response.data[0][i].id]);
                group.unshift(response.data[0][i].id);
            }
            setGroup(group);
        }
        setMessNumb(response.data[1]);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
  
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
    if (error2) return <p>Error: {error2}</p>;


  if (loading12) return (
      <>
      <AppMessLoad lang={langua}/>
</>

  );
  if (error12) return <p>Error: {error12}</p>;

//console.log(infoForHeader);

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
                alt="toback"
                className='message_goback_img'
              />
            </div>
            <div className="positing_of_micro_chel">

    {(() => {
        if (data2.length != undefined) {
            return (<>

            <Link to={`/${data2[0].offerer}/offer/${data2[0].offer_id}/`}>
                <div className='message_chat_info_div'>
                  <img
                    src={data2[0].photo_of_offer}
                    alt="pupil"
                    className="img_of_micro_chel"
                  />
                  {(() => {
                      if (infoForHeader.me === true) {
                          return (<> <span className="ime message_chat_name" translate="no">
                                        {infoForHeader.ime} {infoForHeader.prezime}
                                    </span> </>)

                      } else{
                          return (<> <span className="ime message_chat_name" translate="no">
                                        {name_of_chat}
                                    </span> </>)

                      }


                      })()}

                </div>
            </Link>
            </>);
        }
    else{
        return (<>

         <Link to={`/${data2.offerer}/offer/${data2.offer_id}/`}>
                <div className='message_chat_info_div'>
                  <img
                    src={data2.photo}
                    alt="pupil"
                    className="img_of_micro_chel"
                  />
                  <span className="ime message_chat_name" translate="no">
                    {name_of_chat}
                  </span>
                </div>
              </Link>
         </>);
    }
      })()}

            </div>
            <Bye_and_call bye={ByeButton} am_teach={data.i_am_teacher} call={sendVideoRoom}/>
          </div>
          <div className="place_of_mess">
              <div id="mesfield" className="message_mess_block" >


    {(() => {
        if (data2.length != undefined) {
          for (let i = 0; data2.length > i; i++){
            if (String(data2[i].minute).length === 1){
              data2[i].minute = "0" + String(data2[i].minute);
            }
          }
          
          return (<>
            <div style={{display: "flex", flexDirection: "column-reverse"}}>
              {data2.map((da) => (
                <>
                <Message_comp int={da.text} key={`key${da.id}`} id={da.id} click={messChange} delet={deleteMessage} sender={da.sender} me={data.username} readed={da.readed} photo={da.photo} if_teach={da.senderIsTeacher} changed={da.ifChanged} hour={da.hour} minute={da.minute} tip={da.tip} link={da.link} call_id={da.call_id}/>
                  {(() => {if (da.i_read){
                    return <ScrollToBottom key={`keyscroll${da.id}`} />;
                  }})()}
                </>
              ))}
            </div>
              </>);
            
        }
      })()}
  {components.map((component) => ( 
    <>
      <Message_comp int={component.text} key={component.id} id={component.id} click={messChange} delet={deleteMessage} sender={component.sender} me={data.username} readed={false} photo={component.photo} if_teach={component.senderIsTeacher} hour={component.hour} minute={component.minute} tip={component.tip} link={component.link} call_id={component.call_id}/>
      <ScrollToBottom/>
    </>
    ))}
      
      { (data2.length === undefined && components.length === 0) && <div style={{ display: "flex", justifyContent: "center", }}>
                    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "gray", height: 200, width:300, borderRadius: 20 }}>
                        <p style={{ color: "black", marginTop: 30, fontWeight: "bold", fontSize: 20, marginLeft: 20, marginRight: 20, textAlign: "center" }}>
                          There are no messages here yet
                        </p>
                    </div>
                </div>}
        
      
              
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
