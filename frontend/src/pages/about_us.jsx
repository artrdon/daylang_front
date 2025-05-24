import React from 'react';
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';

function About() {

  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lang, setLang] = useState(websocket.lang);

    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);

    document.querySelector("title").textContent = "About us";


axios.defaults.withCredentials = true;


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
  


  if (loading) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb}/>
</>

  );
  if (error) return <p>Error: {error}</p>;

//console.log(data);
    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="crt_offer_gray_thing">
        <div className="crt_offer_blank">
          <div className='under_crt_offer_blank'>
            <span translate="no">ООО "ДЭЙЛЭНГ"</span>
            <span style={{ display: "block" }} translate="no">
              ИНН: 218283626, ОГРН: 6232322727237
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</>

  )
}

export default About
