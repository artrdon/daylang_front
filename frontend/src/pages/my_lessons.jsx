import { useState, useEffect } from 'react'
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
import { useWebSocket } from '../once/web_socket_provider.jsx';
import AnswersToMyOffers from '/src/elems/answers_to_my_offers.jsx';
import FutureLessons from '/src/elems/future_lessons.jsx';

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



function MyLessons() {

  const[page, setPage] = useState(0);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);
  

  
  var arrLang = {
    'English': {
        'create_offer': 'Create offer',
        'name': 'Name',
        'description': 'Description',
        'price': "Price",
        'load_photo': 'Load photo',
        'save': 'Save',
    },
    'Русский': {
        'create_offer': 'Создать предложение',
        'name': 'Название',
        'description': 'Описание',
        'price': "Цена",
        'load_photo': 'Загрузить фото',
        'save': 'Сохранить',
    },
    'Srpski': {
        'create_offer': 'Napravite predlog',
        'name': 'Naziv',
        'description': 'Opis',
        'price': "Cena",
        'load_photo': 'Otpremite fotografiju',
        'save': 'Sačuvaj',
    },
    'Српски': {
        'create_offer': 'Направите предлог',
        'name': 'Назив',
        'description': 'Опис',
        'price': "Цена",
        'load_photo': 'Отпремите фотографију',
        'save': 'Сачувај',
    },
    'Deutsch': {
        'create_offer': 'Angebot erstellen',
        'name': 'Titel',
        'description': 'Beschreibung',
        'price': "Preis",
        'load_photo': 'Foto laden',
        'save': 'Speichern',
    },
    'Español': {
        'create_offer': 'Crear oferta',
        'name': 'Nombre',
        'description': 'Descripción',
        'price': "Precio",
        'load_photo': 'Cargar foto',
        'save': 'Guardar',
    },
    'عربي': {
        'create_offer': 'إنشاء عرض',
        'name': 'العنوان',
        'description': 'الوصف',
        'price': "السعر",
        'load_photo': 'تحميل الصورة',
        'save': 'حفظ',
    }

  }


    const [search, setSearch] = useState(false);
    const openSearch = () =>{
      setSearch(true);
    }
    const closeSearch = () =>{
      setSearch(false);
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

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;




    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo'], // Уникальный ключ запроса
      queryFn: async () => {
        try {
          const response = await axios.get(`${APIURL}/userinfo/`);
          return response.data;
        } catch (err) {
          if (err.response?.status === 401){
            window.location.href = '/log';
            return null;
          }
        }
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });



  if (loading) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb} lessons={lessons}/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data.photo} balance={data.balance}/>

{
  page === 0 &&
  <div className="find_panel">
  <div className='find_page_up_buttons'>
    <button onClick={() => setPage(0)} className='find_page_up_button_el selected'>
      future lessons
    </button>
    <button onClick={() => setPage(1)} className='find_page_up_button_el'>
      past lessons
    </button>
    {!data.i_am_teacher && <button onClick={() => setPage(2)} className='find_page_up_button_el'>
      answers from teachers
    </button>}
  </div>

  
  <div className="tag_select_panel">
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>

        <FutureLessons/>

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>
}

{
  page === 1 &&
  <div className="find_panel">
  <div className='find_page_up_buttons'>
    <button onClick={() => setPage(0)} className='find_page_up_button_el'>
      future lessons
    </button>
    <button onClick={() => setPage(1)} className='find_page_up_button_el selected'>
      past lessons
    </button>
    {!data.i_am_teacher && <button onClick={() => setPage(2)} className='find_page_up_button_el'>
      answers from teachers
    </button>}
  </div>


  <div className="tag_select_panel">
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>

        

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>
}

{
  page === 2 &&
  <div className="find_panel">
  <div className='find_page_up_buttons'>
    <button onClick={() => setPage(0)} className='find_page_up_button_el'>
      future lessons
    </button>
    <button onClick={() => setPage(1)} className='find_page_up_button_el'>
      past lessons
    </button>
    {!data.i_am_teacher && <button onClick={() => setPage(2)} className='find_page_up_button_el selected'>
      answers from teachers
    </button>}
  </div>


  <div className="tag_select_panel">
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>

        <AnswersToMyOffers/>

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>
}
</>

  )
}

export default MyLessons
