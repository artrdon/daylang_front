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

function AnswersToMyOffers() {

  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);

    const [search, setSearch] = useState(false);
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
      queryKey: ['answers_to_my_offers'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/offer/gettinganswertooffer/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });

  if (loading) return;
  if (error) return <p>Error: {error}</p>;

  return (
      <>
{(() => {
        if (!data.isArray) {
          return <NotFoundSave iwant={"no_offers"}/>;
        }
        else if (data.length === 0) {
          return <NotFoundSave iwant={"no_offers"}/>;
        }
        else{

            return (<>
                

                {data.map((data, index) => (

                      <div className='find_pupils_offer' key={data.id}>
                        <p className='find_pupils_offer_name'>{data.name}</p>
                        <p className='find_pupils_offer_description'>{data.description}</p>
                        <div className='find_pupils_offer_price_currency'>₽</div>
                        <div className='find_pupils_offer_price'>{data.price_min} - {data.price_max} ₽</div>
                        <div className='find_pupils_offer_time_logo'>t</div>
                        <div className='find_pupils_offer_time'> {data.time} минут</div>
                                      
                        <div className="offer_page_div_of_info" style={{height: "auto", margin: 0}}>
                            <li className="offer_page_div_of_info_li">
                                <span>Есть микрофон?</span> <span>{data.microphone}</span>
                            </li>
                            <li className="offer_page_div_of_info_li">
                                <span>Цели:</span> <span>{data.target}</span>
                            </li>
                            <li className="offer_page_div_of_info_li">
                                <span>Возраст:</span> <span>{data.age}</span>
                            </li>
                            <li className="offer_page_div_of_info_li">
                                <span>Формат:</span> <span>{data.format}</span>
                            </li>
                        </div>
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
                        
                      </div>
                    ))}
                </>)

        }
      })()}

<div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>

</>

  )
}

export default AnswersToMyOffers
