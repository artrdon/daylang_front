import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Offer from '/src/pages/offer.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import DeepSearchComp from '../elems/deep_search_component.jsx';
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import FindedAndSavedOffers from '/src/elems/finded_and_saved_offers.jsx'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import { CSSTransition } from 'react-transition-group';

function Finded() {

  const nodeDeep = useRef(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);



    const [search, setSearch] = useState(false);
    const openSearch = () =>{
      setSearch(true);
      document.querySelector('body').style.overflow = 'hidden';
    }
    const closeSearch = () =>{
      setSearch(false);
      document.querySelector('body').style.overflow = 'auto';
    }
    
    document.querySelector("title").textContent = "Offers";
    const params = useParams();


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
  

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/creatingoffer/${data.language}/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);
            if (response.data === "serializer.data"){
                location.reload();
            }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }

    };


  if (loading) return <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>;
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
       <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>

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
</div>*/}

</>

  );
  if (error1) return <p>Error: {error1}</p>;

  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} if_teach={data.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data.photo} balance={data.balance}/>

<div className="saved_finded_panel">
  <div className="sborishe_chelov">
    <div className="offer_of_lang_finded_sort_panel" onClick={openSearch}></div>
{(() => {
        if (data1.length === 0) {
            return (<>
                      <NotFoundSave iwant={"no_offers"}/>
                </>)
        }
        else{

            return (<>
                
                {data1.map((data) => (

                      <FindedAndSavedOffers chel={data.chel} id={data.id} name={data.name} photo={data.photo} isFav={data.isFav} review={data.review} price={data.price} description={data.description} key={data.id}/>
                    ))}
                </>)

        }
      })()}

<div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
  </div>
</div>

<CSSTransition
  in={search}
  timeout={300}
  classNames="deep_search_component_form"
  unmountOnExit
  nodeRef={nodeDeep}
>
  <DeepSearchComp ref={nodeDeep} closeSearch={closeSearch} lang={lang}/>

</CSSTransition>

</>

  )
}

export default Finded
