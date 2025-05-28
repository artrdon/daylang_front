import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import { CSSTransition } from 'react-transition-group';

function Finded() {

  const nodeDeep = useRef(null);
  const websocket = useWebSocket();
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  useEffect(() => {
    setLessons(websocket.lessons);
}, [websocket.lessons]);

    document.querySelector("title").textContent = "Offers";
    const params = useParams();


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
  

    /*const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
      queryKey: [`finded_offers`, params.language], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/creatingoffer/${params.language}/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
*/


  if (loading) return <AppLoad lang={lang} lessons={lessons}/>;
  if (error) return <p>Error: {error}</p>;


  /*if (loading1) return (
      <>
       <AppLoad lang={lang} lessons={lessons}/>

{/*<div className="finded_panel" style={{ width: "100%", display: "flex", justifyContent: "center", left: "unset", backgroundColor: "#00000000"}}>
  <div className="sborishe_chelov">
      <div className="offer_of_lang_finded">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <h1 className="finded_name" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere",  }}></h1>
          <img
            src="/src/static/img/nema.png"
            alt="nekicovek nekicovekovic"
            className="finded_img"
          />
          <img src="/src/static/img/srce.png" alt="" className="src_img" />
          <div className="part_with_text">
            <p className="finded_price"></p>
            <br />
            <p className="finded_online_status">online</p>
            <div className="finded_review">
              <img src="/src/static/img/11.png" alt="" className="img_review" />
              <h1 className="review_text"> </h1>
            </div>
            <div className="description_lol">
            </div>
          </div>
        </div>
      </div>
  </div>
</div>}

</>

  );
  if (error1) return <p>Error: {error1}</p>;*/

  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>

<div className="saved_finded_panel">
  <div className="sborishe_chelov">


<div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}/>
  </div>
</div>


</>

  )
}

export default Finded
