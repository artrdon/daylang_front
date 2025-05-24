import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import arrLangMyProfil from '/languages/my_profil.js'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Feedback_load from '/src/load_elems/feedback_load.jsx'
import Feedback_pup from '/src/pages/feedback_pup.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';


function ImageWithFallbackAvatar({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="avatar"
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
      className="me_avatar"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}


function Feedback() {

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);

    const params = useParams();
    if (params.user === "undefined")
    {
        window.location.replace(`/log/`);
        return;
    }

    document.querySelector("title").textContent = "Feedback";

axios.defaults.withCredentials = true;

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

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
      queryKey: ['usersettings', params.user], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/usersettings/${params.user}/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });

//if (data1 != null && data1.i_am_teacher === true)


const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
  queryKey: ['userinfo', params.user], // Уникальный ключ запроса
  queryFn: async () => {
    const response = await axios.get(`${APIURL}/userinfo/${params.user}/`);
    if (response.data.i_am_teacher === false)
    {
        window.location.replace(`/p/user/${params.user}/`)
    }
    return response.data; // Возвращаем только данные
  },
  // Опциональные параметры:
  retry: 2, // Количество попыток повтора при ошибке
  staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
  refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
});


  const { data: usernow, isLoading: loading2, isError: error2, error: errorDetails2 } = useQuery({
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


  const { data: data3, isLoading: loading3, isError: error3, error: errorDetails3 } = useQuery({
    queryKey: ['reviewsmy', params.user], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/reviewsmy/${params.user}/`);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });

  const { data: data4, isLoading: loading4, isError: error4, error: errorDetails4 } = useQuery({
    queryKey: ['reviews', params.user], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/reviews/${params.user}/`);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });
 
  if (loading) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Feedback_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Feedback_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Feedback_load/>
</>

  );
  if (error2) return <p>Error: {error2}</p>;


  if (loading3) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Feedback_load/>
</>

  );
  if (error3) return <p>Error: {error3}</p>;

  if (loading4) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Feedback_load/>
</>

  );
  if (error4) return <p>Error: {error4}</p>;


  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLangMyProfil[lang]['feedback']}`;

    return (
        <>
<App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={lang} if_teach={usernow.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={usernow.photo} balance={usernow.balance}/>

<div className="find_panel">
  <div className="me_under_find">
    <ImageWithFallback src={data.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
        {data.first_name} {data.last_name}
      </span>
      {(() => {
        if (data.real_man === true) {
          return <img src="/src/static/img/confirmed.png" alt="confirmed" className="me_real_pers" />;
        }
      })()}

    </div>
    {(() => {
        if (data.username === usernow.username) {
          return (<> <Link to="/settings/" className="me_setting_ref">
                        <img src="/src/static/img/setting.png" alt="settings" className="me_setting_img"/>
                     </Link> </>)
        }
      })()}

  </div>

<div id="feedback_page"  className='horizontal-scroll-container'>
  <div className="page_of_type horizontal-scroll-content">
     <Link to={`/t/user/${data.username}/`}>
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLangMyProfil[lang]['main']}</span>
        </span>
      </div>
    </button>
    </Link>
    <Link to={`/t/user/${data.username}/degree`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button" >
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLangMyProfil[lang]['degree']}</span>
        </span>
      </div>
    </button>
    </Link>

    <Link to={`/t/user/${data.username}/feedback`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button  me_selected">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLangMyProfil[lang]['feedback']}</span>
        </span>
      </div>
    </button>
    </Link>
    <Link to={`/t/user/${data.username}/offers`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLangMyProfil[lang]['offers']}</span>
        </span>
      </div>
    </button>
    </Link>
  </div>
  <div className="feedback_review_score" >
    <div>
      <img src="/src/static/img/11.png" alt="review score" className="feedback_review_img" /> 
      <p className="me_feedback_review_score_text">{data3}</p>
    </div>
    {data4.map((rew) => (

    <div className="feedback_review_container" key={rew.id}>
      <div className="feedback_review_div_container">
        <ImageWithFallbackAvatar src={rew.photo} alt="pupil" fallbackSrc="/src/static/img/nema.png"/>
        <span className="ime_review" translate="no">
          {rew.name} {rew.last_name}
        </span>
        <img src={`/src/static/img/${rew.score}.png`} alt="stars" className="feedback_review_zvezde" />
      </div>
      <p className="feedback_review_text" >
        {rew.text}
        </p>
    </div>
    ))}

  </div>
</div>
</div>

</>

  )
}

export default Feedback
