import React from 'react';
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';

function About() {

  const websocket = useWebSocket();
  const [lang, setLang] = useState(websocket.lang);


    


axios.defaults.withCredentials = true;


    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${vars['APIURL']}/userinfo/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
  


  if (loading) return <AppLoad lang={lang}/>;
  if (error) return <p>Error: {error}</p>;
  document.querySelector("title").textContent = "About us";

    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} photo={data.photo} balance={data.balance}/>

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
