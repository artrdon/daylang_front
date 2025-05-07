import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import AppMess from '/src/AppMess.jsx'
import AppMessLoad from '/src/AppMessLoad.jsx'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function ImageWithFallbackMicroChel({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className='img_of_micro_chel'
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}

function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className='message_comp_img_of_sender'
    />
  );
}


function ChatCreate() {
    const params = useParams();
    const now = new Date();
    const hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10){
      minutes = "0" + String(minutes);
    }
    const websocket = useWebSocket();
    const [messNumb, setMessNumb] = useState(websocket.messNumb);
      useEffect(() => {
          setMessNumb(websocket.messNumb);
      }, [websocket.messNumb]);


    const [wsGroup, setWsGroup] = useState(null);

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
  
    const csrfToken = getCookie('csrftoken');
    const [data3, setData3] = useState(null);
    const [loading3, setLoading3] = useState(true);
    const [error3, setError3] = useState(null);

    const [message, setData1] = useState({username: params.username, offer_name: "", offer_id: params.id});


    axios.defaults.withCredentials = true;

    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: [`userinfo_author`, params.username], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/userinfo/${params.username}/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
  


    const { data: data2, isLoading: loading2, isError: error2, error: errorDetails2 } = useQuery({
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
              const response = await axios.get(`${APIURL}/gettingoffer/${params.username}/${params.id}/`);
              setData3(response.data);
              setData1({ ...message, offer_name: response.data[0].name });
            } catch (err) {
              setError3(err.message);
            } finally {
              setLoading3(false);
            }
      };

      fetchData();
    }, []);


    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;



  
useEffect(() => {
  const socket = new WebSocket(`${WSAPIURL}/ws/plus_group/${params.username}/`);

  socket.onopen = () => {
      console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
      const dataMess = JSON.parse(event.data);
      console.log(dataMess);
      if (dataMess === "unauthenticated_ttt")
      {
          window.location.replace(`/log/`);
          return;
      }
      if (dataMess['tip'] === "create_chat")
      {
          window.location.replace(`/message_list/${dataMess['id']}/`);
          return;
      }
      if (dataMess['tip'] === "chat_exist")
      {
          window.location.replace(`/message_list/${dataMess['id']}/`);
          return;
      }
      //   document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  setWsGroup(socket);

  return () => {
    socket.close();
  };
}, []);

  const sendpost = async () => {
    if (wsGroup && wsGroup.readyState === WebSocket.OPEN) {
      wsGroup.send(JSON.stringify({ type: "create_chat", message: message }));
      //document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    } else {
      console.error('WebSocket is not open');
    }
    /*try {
        const response = await axios.post('${APIURL}/create_chat/', message,{
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
    return 0;*/
};



    if (loading) return (
      <>
      <AppMessLoad lang={langua} messNumb={messNumb}/>
</>

  );
    if (error) return <p>Error: {error}</p>;

    if (loading2) return (
      <>
      <AppMessLoad lang={langua} messNumb={messNumb}/>
</>

  );
    if (error2) return <p>Error: {error2}</p>;

    if (loading3) return (
      <>
      <AppMessLoad lang={langua} messNumb={messNumb}/>
</>

  );
    if (error3) return <p>Error: {error3}</p>;

console.log(data3);

    return (
        <>
        <AppMess name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>
 
    <div className="message_find_panel">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="panel_of_messages">
          <div className="panel_of_header">
            <div className="goback_but" >
              <img
                src="/src/static/img/gobackblack.png"
                alt="goback"
                className='message_goback_img'
              />
            </div>
            <div className="positing_of_micro_chel">
              <Link to={`/${params.username}/offer/${params.id}/`}>
                <div className='message_chat_info_div'>
                  <ImageWithFallbackMicroChel src={data3[0].photo} alt="photo_offer" fallbackSrc="/src/static/img/nema.png"/>
                  <span className="ime message_chat_name" translate="no">
                    {data.first_name} {data.last_name} {data3[0].name}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="place_of_mess">
              <div id="mesfield" className="message_mess_block">
                  
                  <div className='message_comp_not_my_message'>
                      <Link to={`/t/user/${params.username}/`} className='message_comp_link_to_sender'>
                          <ImageWithFallback src={data.photo} alt={params.username} fallbackSrc="/src/static/img/nema.png"/>
                      </Link>
                    <div className='message_comp_my_message_div'>
                    <pre className='message_comp_not_my_message_inside_pre'>
                      {data3[0].message}
                      <div>
                        <span className='message_comp_my_message_inside_readed'>✓✓ </span>
                        <span className='message_comp_my_message_inside_readed'>{hours}:{minutes}</span>
                        <span className='message_comp_my_message_inside_not_chan'></span>
                      </div>
                    </pre>
                    </div>
                  </div>
                  <div className='message_comp_not_my_message'>
                    <Link className='message_comp_link_to_sender'>
                        <ImageWithFallback src={"/src/static/img/favicon.png"} alt={params.username} fallbackSrc="/src/static/img/favicon.png"/>
                    </Link>
                    <div className='message_comp_my_message_div'>
                    <pre className='message_comp_not_my_message_inside_pre'>
                      Все покупки, видео-уроки должны осуществляться здесь. Мы не несем ответсвенность за действия любых лиц, за пределами DayLang.
                      <div>
                        <span className='message_comp_my_message_inside_readed'>✓✓ </span>
                        <span className='message_comp_my_message_inside_readed'>{hours}:{minutes}</span>
                        <span className='message_comp_my_message_inside_not_chan'></span>
                      </div>
                    </pre>
                    </div>
                  </div>
                  
            </div>
          </div>
          <div className="inviz_panel_of_writing">
            <div className="jos_inviz_panel">
              <div className="centering_of_mess_panel">
                <div className="some_vizible_part">
                  <div className="clear_and_send_buttons_pos" style={{width: "100%"}}>
                    <button className="create_chat_button" onClick={sendpost}>
                      <span className='create_chat_button_text'>Создать чат</span>
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
