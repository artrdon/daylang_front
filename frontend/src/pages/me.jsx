import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import arrLangMyProfil from '/languages/my_profil.js'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import My_load from '/src/load_elems/me_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';


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


function Me() {

  const websocket = useWebSocket();
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  useEffect(() => {
    setLessons(websocket.lessons);
}, [websocket.lessons]);
    
  
    const params = useParams();

    document.querySelector("title").textContent = "Me";

    axios.defaults.withCredentials = true;

    if (params.user === "undefined")
    {
        window.location.replace(`/log/`);
        return;
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


    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo', params.user], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/userinfo/${params.user}/`);
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


  if (loading) return (
      <>
      <AppLoad lang={lang} lessons={lessons}/>
      <My_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={lang} lessons={lessons}/>
      <My_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={lang} lessons={lessons}/>
      <My_load/>
</>

  );
  if (error2) return <p>Error: {error2}</p>;

//console.log(data1.i_am_teacher);

document.querySelector("title").textContent = `${data.first_name} ${data.last_name}`;
    return (
        <>
        <App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={lang} lessons={lessons} photo={usernow.photo} balance={usernow.balance}/>

  <div className="find_panel">
  <div className="me_under_find">
    <ImageWithFallback src={data.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
        {data.first_name} {data.last_name}
      </span>
      {data.real_man === true && <img src="/src/static/img/confirmed.png" alt="confirmed" className="me_real_pers" />}

    </div>
    {data.username === usernow.username && (<> <Link to="/settings/" className="me_setting_ref">
      <img src="/src/static/img/setting.png" alt="settings" className="me_setting_img"/>
    </Link> </>)}

  </div>

<div id="main_page" style={{ display: "block" }} className='horizontal-scroll-container'>
  <div className="me_description_offer" >
    {data1.about_myself}
  </div>
  </div>
</div>



</>

  )
}

export default Me
