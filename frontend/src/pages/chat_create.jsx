import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { Routes, Route, Link } from 'react-router-dom'
import AppMess from '/src/App.jsx'
import AppMessLoad from '/src/AppLoad.jsx'
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
      style={{ height: 50, width: 50, borderRadius: 30, position: "absolute", bottom: 0, }}
    />
  );
}


function ChatCreate() {
    let params = useParams();
    const now = new Date();
    const hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10){
      minutes = "0" + String(minutes);
    }

    const [count, setCount] = useState(0)
    const [wsGroup, setWsGroup] = useState(null);

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



    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [message, setData1] = useState({username: params.username, offer_name: params.offer_name, offer_id: params.id});

    const [data2, setData2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);

    const [data3, setData3] = useState(null);
    const [loading3, setLoading3] = useState(true);
    const [error3, setError3] = useState(null);

    const [messNumb, setMessNumb] = useState(0);
    axios.defaults.withCredentials = true;

  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`${APIURL}/userinfo/${params.username}/`);
              console.log(response.data);
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
              const response = await axios.get(`${APIURL}/userinfo/`);
              console.log(response.data);
              setData2(response.data);
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
              const response = await axios.get(`${APIURL}/gettingoffer/${params.username}/${params.id}/`);
              console.log(response.data);
              setData3(response.data);
            } catch (err) {
              setError3(err.message);
            } finally {
              setLoading3(false);
            }
      };

      fetchData();
    }, []);

    const isSent = useRef(false);

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;


/*useEffect(() => {
    console.log('useEffect executed');
    if (isSent.current) return; // Если запрос уже отправлен, выходим
        isSent.current = true; // Устанавливаем флаг

    
  }, []);
*/

  
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

//sendpost();


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

    if (loading3) return (
      <>
      <AppMessLoad lang={langua}/>
</>

  );
    if (error3) return <p>Error: {error3}</p>;



    return (
        <>
        <AppMess name={data2.first_name} lastname={data2.last_name} username={data2.username} lang={langua} if_teach={data2.i_am_teacher} mess_count={messNumb} photo={data2.photo} balance={data2.balance}/>

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
              <Link to={`/${params.username}/offer/${params.id}/`}>
                <div style={{ position: "relative", cursor: "pointer", paddingLeft: 90, paddingRight: 80, marginTop: 10 }}>
                  <ImageWithFallbackMicroChel src={data3.photo} alt="photo_offer" fallbackSrc="/src/static/img/nema.png"/>
                  <span className="ime" translate="no" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", overflowWrap: "anywhere", width: "calc(100% - 240px)", marginLeft: 10 }}>
                    {data.first_name} {data.last_name} {params.offer_name}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="place_of_mess">
              <div
                id="mesfield"
                style={{
                  display: "block",
                  overflow: "auto",
                  height: "calc(100% - 40px)",
                  position: "absolute",
                  width: "calc(100% - 40px)",
                  top: 0,
                  marginTop: 70,
                  padding: 20
                }}
              >
                            <div style={{marginTop: 40, marginBottom: 20, position: "relative", display: "block", zIndex: 1}}>
                                  <Link to={`/t/user/${params.username}/`} style={{ display: "block", width: 50, height: 50, position: "absolute" }}>
                                      <ImageWithFallback src={data.photo} alt={params.username} fallbackSrc="/src/static/img/nema.png"/>
                                  </Link>
                                  <div style={{ maxWidth: "50%", position: "relative", left: 70, top: "-20px", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                    <pre style={{ fontSize: 18,position: "relative", padding: 10, backgroundColor: "rgb(120 120 120)", color: "white", display: "inline-block", whiteSpace: "pre-wrap", overflowWrap: "anywhere", borderRadius: 10, left: -10,MozUserSelect: "none", KhtmlUserSelect: "none", WebkitUserSelect: "none", userSelect: "none", cursor: "pointer"}}  onClick={() => toggleVisibility(id)}>
                                      {data3.message}
                                      <div>
                                        <span style={{ fontSize: 12, position: "relative", right: 0, bottom: 0, }}>✓✓ </span>
                                        <span style={{ fontSize: 12, position: "relative", right: 0, bottom: 0, }}>{hours}:{minutes}</span>
                                      </div>
                                    </pre>
                                  </div>
                            </div>

                            <div style={{marginTop: 40, marginBottom: 20, position: "relative", display: "block", zIndex: 1}}>
                                  <Link to={`/t/user/${params.username}/`} style={{ display: "block", width: 50, height: 50, position: "absolute" }}>
                                      <ImageWithFallback src={"/src/static/img/favicon.png"} alt={params.username} fallbackSrc="/src/static/img/favicon.png"/>
                                  </Link>
                                  <div style={{ maxWidth: "50%", position: "relative", left: 70, top: "-20px", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                    <pre style={{ fontSize: 18,position: "relative", padding: 10, backgroundColor: "rgb(120 120 120)", color: "white", display: "inline-block", whiteSpace: "pre-wrap", overflowWrap: "anywhere", borderRadius: 10, left: -10,MozUserSelect: "none", KhtmlUserSelect: "none", WebkitUserSelect: "none", userSelect: "none", cursor: "pointer"}}  onClick={() => toggleVisibility(id)}>
                                      Все покупки, видео-уроки должны осуществляться здесь. Мы не несем ответсвенность за действия любых лиц, за пределами DayLang.
                                      <div>
                                        <span style={{ fontSize: 12, position: "relative", right: 0, bottom: 0, }}>✓✓ </span>
                                        <span style={{ fontSize: 12, position: "relative", right: 0, bottom: 0, }}>{hours}:{minutes}</span>
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
                    <button className="sending_button" onClick={sendpost} style={{width: "calc(100% - 100px)", borderRadius: 20, backgroundColor: "#00c925", border: "2px solid #00db1f"}}>
                      <span style={{color: "white", fontSize: 30}}>Создать чат</span>
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
