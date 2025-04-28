import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import My_pup_load from '/src/load_elems/me_pup_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
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

function Me_pup() {

    
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

    document.querySelector("title").textContent = "Me";

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

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

  const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
    queryKey: [`usersettings`, params.user], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/userinfo/${params.user}/`);
      return response.data; // Возвращаем только данные
    },
  
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });
  

//if (data1 != null && data1.i_am_teacher === false)

const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
  queryKey: [`userinfo_author`, params.user], // Уникальный ключ запроса
  queryFn: async () => {
    const response = await axios.get(`${APIURL}/userinfo/${params.user}/`);
    if (response.data.i_am_teacher === true)
    {
        window.location.replace(`/t/user/${params.user}/`)
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



  if (loading) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <My_pup_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <My_pup_load/>
</>

  );
  if (error1) return <p>Error1: {error1}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <My_pup_load/>
</>

  );
  if (error2) return <p>Error2: {error2}</p>;


//console.log(data);

document.querySelector("title").textContent = `${data.first_name} ${data.last_name}`;
    return (
        <>
        <App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={langua} if_teach={usernow.i_am_teacher} mess_count={messNumb} photo={usernow.photo} balance={usernow.balance}/>

  <div className="find_panel">
  <div className="me_under_find">
    <ImageWithFallback src={data.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
        {data.first_name} {data.last_name}
      </span>
      {(() => {
        if (data.real_man === true) {
          return <img src="/src/static/img/confirmed.png" alt="" className="me_real_pers" />;
        }
      })()}

    </div>
    {(() => {
        if (data.username === usernow.username) {
          return (<> <Link to="/settings/" className="me_setting_ref">
                        <img src="/src/static/img/setting.png" alt="" className="me_setting_img"/>
                     </Link> </>)
        }
      })()}

  </div>

<div id="main_page" style={{ display: "block" }} className='horizontal-scroll-container'>
  <div className="page_of_type horizontal-scroll-content">
     <Link to={`/p/user/${data.username}/`}>
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button me_selected" >
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['main']}</span>
        </span>
      </div>
    </button>
    </Link>

    <Link to={`/p/user/${data.username}/feedback`}>
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
  </div>
  <div className="me_description_offer" >
{data1.about_myself}
  </div>
</div>


</div>


</>

  )
}

export default Me_pup
