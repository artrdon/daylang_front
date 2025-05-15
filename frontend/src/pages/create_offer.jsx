import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import CreateOffersTeacher from '/src/elems/create_offers_teacher.jsx'
import CreateOffersPupil from '/src/elems/create_offer_pupil.jsx'

function CreateOffer() {

  axios.defaults.withCredentials = true;
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);


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

const arrLang = {
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

const Lang = {
      'English': {
          'English': 'English',
          'Germany': 'Germany',
          'Russian': 'Russian',
          'Chinese': 'Chinese',
          'French':  'French',
          'Italian': 'Italian',
          'Spanish': 'Spanish',
          'Serbian': 'Serbian',
      },
      'Русский': {
          'English': 'Английский',
          'Germany': 'Немецкий',
          'Russian': 'Русский',
          'Chinese': 'Китайский',
          'French':  'Французский',
          'Italian': 'Итальянский',
          'Spanish': 'Испанский',
          'Serbian': 'Сербский',
      },
      'Srpski': {
          'English': 'Engleski',
          'Germany': 'Nemačka',
          'Russian': 'Ruski',
          'Chinese': 'Kineski',
          'French':  'Francuski',
          'Italian': 'Italijanski',
          'Spanish': 'Španski',
          'Serbian': 'Srpski',
      },
      'Српски': {
          'English': 'Енглески',
          'Germany': 'Немачка',
          'Russian': 'Руски',
          'Chinese': 'Кинески',
          'French':  'Француски',
          'Italian': 'Италијански',
          'Spanish': 'Шпански',
          'Serbian': 'Српски',
      },
      'Deutsch': {
          'English': 'Englischsprachig',
          'Germany': 'Deutschland',
          'Russian': 'Russisch',
          'Chinese': 'Chinesisch',
          'French':  'Französisch',
          'Italian': 'Italienisch',
          'Spanish': 'Spanisch',
          'Serbian': 'Serbisch',
      },
      'Español': {
          'English': 'Inglés',
          'Germany': 'Alemania',
          'Russian': 'Ruso',
          'Chinese': 'Chino',
          'French':  'Francés',
          'Italian': 'Italiano',
          'Spanish': 'Español',
          'Serbian': 'Serbio',
      },
      'عربي': {
          'English': 'الإنجليزية',
          'Germany': 'ألمانيا',
          'Russian': 'الروسية',
          'Chinese': 'الصينية',
          'French':  'الفرنسية',
          'Italian': 'الإيطالية',
          'Spanish': 'الإسبانية',
          'Serbian': 'الصربية',
      }

    }


    const csrfToken = getCookie('csrftoken');

    document.querySelector("title").textContent = "Create Offer";
/*
    const [data, setData] = useState({name: '', description: '', price: '', language: 'other', format: 'individual', target: 'exam', age: '5-12', microphone: 'yes', message: '', photo: '', beggin_time_of_work: "8", end_time_of_work: "16", workday: ''});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
*/




  const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
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




  if (loading1) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb} lessons={lessons}/>
      <Create_offer_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;
  if (data1.username === undefined){
    window.location.replace('/log/');
    return;
  }

    return (
        <>
<App name={data1.first_name} lastname={data1.last_name} username={data1.username} lang={langua} if_teach={data1.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data1.photo} balance={data1.balance}/>

{
  data1.i_am_teacher ? (
    <CreateOffersTeacher arrLang={arrLang} lang={langua} Lang={Lang}/>

  ) : (
    <CreateOffersPupil arrLang={arrLang} lang={langua} Lang={Lang}/>
  )
}


</>

  )
}

export default CreateOffer