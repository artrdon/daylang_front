import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Offer from '/src/pages/offer.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import FindedAndSavedOffers from '/src/elems/finded_and_saved_offers.jsx'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import FindedDeepSearchComp from '/src/elems/finded_deep_search_component.jsx'
import { CSSTransition } from 'react-transition-group';


function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="finded_img"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}



function Finded_deep() {

    
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

  const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);


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


  const [data2, setData2] = useState({price_min: params.min, price_max: params.max, format: params.format, target: params.target, age: params.age, microphone: params.microphone, language: params.language});
  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
};





const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
  queryKey: ['userinfo'], // Уникальный ключ запроса
  queryFn: async () => {
    try {
      const response = await axios.get(`${APIURL}/userinfo/`);
      return response.data;
    } catch (err) {
      if (err.response?.status === 401){
        return "undefined";
      }
      throw new Error(
        err.response?.data?.message || 
        'Не удалось загрузить данные пользователя'
      );
    }
  },
  // Опциональные параметры:
  retry: 2, // Количество попыток повтора при ошибке
  staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
  refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
});


    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/deep_offer_getting/${params.language}/${params.format}/${params.target}/${params.age}/${params.microphone}/${params.min}/${params.max}/`);
        setData1(response.data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);



  if (loading) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
       <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
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
                      <NotFoundSave iwant={"no_offers"} lang={lang}/>
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
  <FindedDeepSearchComp ref={nodeDeep} closeSearch={closeSearch} price_min={data2.price_min} price_max={data2.price_max} format={data2.format} target={data2.target} age={data2.age} microphone={data2.microphone} lang={lang}/>

</CSSTransition>


</>

  )
}

export default Finded_deep
