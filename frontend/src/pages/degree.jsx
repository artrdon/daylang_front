import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Degree_load from '/src/load_elems/degree_load.jsx'
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


function Degree() {

  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    if (window.innerWidth > window.innerHeight) {
      setScreen(true);
    } else {
      setScreen(false);
    }
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);
    
    
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = () =>{
      setPhotoIndex(prev => prev + 1);
  }
  const previosPhoto = () =>{
      setPhotoIndex(prev => prev - 1);
  }

  const params = useParams();
  if (params.user === "undefined")
  {
    window.location.replace(`/log/`);
    return;
  }

  document.querySelector("title").textContent = "Degree";

  const [scaledButtonId, setScaledButtonId] = useState(null);
  const [showPhotoBig, setShowPhotoBig] = useState(false);

  const toggleVisibility = (index) => {
      if (index != undefined)
        setPhotoIndex(index);

      setShowPhotoBig(!showPhotoBig);
      
  };

  

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
    queryKey: ['get_degree_load', params.user], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/get_degree_load/${params.user}/`);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });


  if (loading) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb} lessons={lessons}/>
      <Degree_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb} lessons={lessons}/>
      <Degree_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb} lessons={lessons}/>
      <Degree_load/>
</>

  );
  if (error2) return <p>Error: {error2}</p>;

    document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLang[lang]['degree']}`;

  if (loading3) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb} lessons={lessons}/>
      <Degree_load/>
</>

  );
  if (error3) return <p>Error: {error3}</p>;
  console.log(data3);
  
    return (
        <>
  <App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={langua} if_teach={usernow.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={usernow.photo} balance={usernow.balance}/>

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


<div id="degree_page"  className='horizontal-scroll-container'>
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
      <div className="me_div_of_button  me_selected">
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
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['offers']}</span>
        </span>
      </div>
    </button>
    </Link>
  </div>
  <div className="degree_page_around">
    <p className="degree_description_about" >{data1.about_my_degree}</p>
    <br />
    <br />
    
    <div className="degree_page_degree_photos">
    {data3.map((photo, index) => (
            <button className="degree_page_degree_button" onClick={() => toggleVisibility(index)} key={photo.id}>
                <img src={photo.photo} alt="degree" className="degree_img" />
            </button>
    ))}
    </div>
    
    </div>
</div>




</div>


{showPhotoBig && <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "fixed", width: "100vw",zIndex: 10000}}>
  <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 10, position: "fixed"}} onClick={() => toggleVisibility()} ></div>
      
          <div className="degree_button" style={{ zIndex: 11, height: screen === true ? "95vh":"auto", width: screen === true ? "auto" : "100vw", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "gray"}}>
              {data3.length > (photoIndex + 1) && 
              <button className='offer_right_next_photo_button' onClick={nextPhoto}>
                <img src="/src/static/img/next_photo.png" alt="next photo" style={{width: "100%", height: "100%"}}/>
              </button>}
              
                  <img src={data3[photoIndex].photo} alt={`degreephotoBig`} className="degree_img" style={{ width: "100%", height: "100%", zIndex: 10, objectFit: "contain"}}/>
              
              {photoIndex > 0 && 
              <button className='offer_left_next_photo_button' onClick={previosPhoto}>
                <img src="/src/static/img/next_photo.png" alt="next photo" style={{width: "100%", height: "100%"}}/>
              </button>}
          </div>
          
          
          
  </div>}

</>

  )
}

export default Degree
