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


function ImageWithFallbackAuthor({ src, fallbackSrc, alt, }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className="find_pupils_offer_info_about_chel_img"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }

function OffersFromPupils({setAnswerToPupilOffer, setCurrentOffer}) {

  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  


  const openAnswerToPupilOffer = (id) => {
    setAnswerToPupilOffer(true);
    const item = data1.find(item => item.id === id);
    setCurrentOffer(item);
  }

  
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);

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
        const response = await axios.get(`${APIURL}/userinfo/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
  

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
      queryKey: [`pupils_offers`], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/offer/gettingofferspup/`);
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


  if (loading) return;
  if (error) return <p>Error: {error}</p>;


  if (loading1) return;
  if (error1) return <p>Error: {error1}</p>;
//console.log(data1);
  return (
      <>
    {/*<div className="offer_of_lang_finded_sort_panel" onClick={openSearch}></div>*/}
{(() => {
        if (data1.length === 0) {
            return (<>
                      <NotFoundSave iwant={"no_offers"}/>
                </>)
        }
        else{

            return (<>
                
                {data1.map((data, index) => (

                      <div className='find_pupils_offer' key={data.id}>
                        <p className='find_pupils_offer_name'>{data.name}</p>
                        <p className='find_pupils_offer_description'>{data.description}</p>
                        <div className='find_pupils_offer_price_currency'>₽</div>
                        <div className='find_pupils_offer_price'>{data.price_min} - {data.price_max} ₽</div>
                        <div className='find_pupils_offer_time_logo'>t</div>
                        <div className='find_pupils_offer_time'> {data.time} минут</div>
                        <Link to={`/p/user/${data.username}/`}>
                        <div className='find_pupils_offer_info_about_chel'>
                            <ImageWithFallbackAuthor src={data.photo} alt={data.username} fallbackSrc="/src/static/img/nema.png"/>
                            <div className="offer_author_name_div">
                                <span className="ime offer_author_name_span" translate="no">
                                {data.first_name} {data.last_name}
                                </span>
                                {data.real_man && <img src="/src/static/img/confirmed.png" alt="confirm" className="offer_me_real_pers" />}
                            </div>
                            <div className="offer_author_description">{data.about_myself}</div>
                        </div>
                        </Link>
                        <button className='find_pupils_offer_button' onClick={() => {openAnswerToPupilOffer(data.id)}}>
                      
                        </button>
                      </div>
                    ))}
                </>)

        }
      })()}

<div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>

</>

  )
}

export default OffersFromPupils
