import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Offers_main_load from '/src/load_elems/offers_main_load.jsx'
import Add_button from '/src/elems/add_button.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import StandartOffer from '/src/elems/standart_offer.jsx'


function ImageWithFallbackAvatar({ src, fallbackSrc, alt, }) {
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


function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="offer_image"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}


function Offers_on_main() {

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);

    const params = useParams();
    if (params.user === "undefined")
    {
        window.location.replace(`/log/`);
        return;
    }

    document.querySelector("title").textContent = "My offers";


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



    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

var arrLang = {
      'English': {
          'main': "Main",
          'degree': 'Degree / Certificate',
          'feedback': 'Reviews',
          'offers': 'Offers',
      },
      'Русский': {
          'main': "Главная",
          'degree': 'Диплом / Сертификат',
          'feedback': 'Отзывы',
          'offers': 'Предложения',
      },
      'Srpski': {
          'main': "Glavni",
          'degree': 'Diploma / Sertificat',
          'feedback': 'Recenzije',
          'offers': 'Predlozi',
      },
      'Српски': {
          'main': "Главни",
          'degree': 'Диплома / Сертификат',
          'feedback': 'Рецензије',
          'offers': 'Предлози',
      },
      'Deutsch': {
          'main': "Wichtigsten",
          'degree': 'Abschluss / Zertifikat',
          'feedback': 'Gästebewertungen',
          'offers': 'Wohnen',
      },
      'Español': {
          'main': "Principal",
          'degree': 'Título / Certificado',
          'feedback': 'Reseñas',
          'offers': 'Ofertas',
      },
      'عربي': {
          'main': "الرئيسية",
          'degree': 'درجة / شهادة',
          'feedback': 'التعليقات',
          'offers': 'العروض',
      }

    }


    
  const { data: real, isLoading: loading3, isError: error3, error: errorDetails3 } = useQuery({
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


    
  const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
    queryKey: ['gettingoffer', params.user], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/gettingoffer/${params.user}/`);
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
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offers_main_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offers_main_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offers_main_load/>
</>

  );
  if (error2) return <p>Error: {error2}</p>;


  if (loading3) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offers_main_load/>
</>

  );
  if (error3) return <p>Error: {error3}</p>;

  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLang[lang]['offers']}`;

    return (
        <>
<App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={langua} if_teach={usernow.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={usernow.balance}/>


<div className="find_panel">
  <div className="me_under_find">
    <ImageWithFallbackAvatar src={data.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
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
                        <img src="/src/static/img/setting.png" alt="setting" className="me_setting_img"/>
                     </Link> </>)
        }
      })()}

  </div>

<div id="offers_page" className='horizontal-scroll-container'>
  <div className="page_of_type horizontal-scroll-content">
    <Link to={`/t/user/${data.username}/`}>
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['main']}</span>
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
          <span className="me_span_of_button_text">{arrLang[lang]['degree']}</span>
        </span>
      </div>
    </button>
    </Link>

    <Link to={`/t/user/${data.username}/feedback`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['feedback']}</span>
        </span>
      </div>
    </button>
    </Link>
    <Link to={`/t/user/${data.username}/offers`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button me_selected">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['offers']}</span>
        </span>
      </div>
    </button>
    </Link>
  </div>
  <div className="me_page_place_of_teach">

    {(() => {
        if (data.if === "yes") {
      return (<>
          <Add_button/>
          </>)
        }
      })()}


{data1.map((dat) => (
  <StandartOffer username={data.username} id={dat.id} name={dat.name} photo={dat.photo} review={dat.review} price={dat.price}/>
))}
  </div>
</div>




</div>




</>

  )
}

export default Offers_on_main
