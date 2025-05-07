import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Offer_load from '/src/load_elems/offer_load.jsx'
import SetReviewBlock from '/src/elems/set_review_block.jsx'
import UpReviewBlock from '/src/elems/up_review_block.jsx'
import Vozmozno_vam from '../elems/vozmozno_vam_podojdut';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'

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

function FutureLessons() {

  const params = useParams();    
  const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
    queryKey: [`future_lessons_offer`], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/bye/`);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });



    if (loading) return;
    if (error) return <p>Error: {error}</p>;
console.log(data);
    return (
        <>
        {(() => {
                if (data.length === 0) {
                    return (<>
                              <NotFoundSave iwant={"no_offers"}/>
                        </>)
                }
                else{
        
                    return (<>
        
                        {data.map((dat, index) => (
        
                              <div className='find_pupils_offer' key={dat.id}>
                                <p className='find_pupils_offer_name'>{dat.name}</p>
                                <p className='find_pupils_offer_description'>{dat.description}</p>
                                <div className='find_pupils_offer_price_currency'>₽</div>
                                <div className='find_pupils_offer_price'>{dat.price_min} - {dat.price_max} ₽</div>
                                <div className='find_pupils_offer_time_logo'>t</div>
                                <div className='find_pupils_offer_time'> {dat.time} минут</div>
                                              
                                <div className="offer_page_div_of_info" style={{height: "auto", margin: 0}}>
                                    <li className="offer_page_div_of_info_li">
                                        <span>Есть микрофон?</span> <span>{dat.microphone}</span>
                                    </li>
                                    <li className="offer_page_div_of_info_li">
                                        <span>Цели:</span> <span>{dat.target}</span>
                                    </li>
                                    <li className="offer_page_div_of_info_li">
                                        <span>Возраст:</span> <span>{dat.age}</span>
                                    </li>
                                    <li className="offer_page_div_of_info_li">
                                        <span>Формат:</span> <span>{dat.format}</span>
                                    </li>
                                </div>
                                <Link to={`/p/user/${dat.username}/`}>
                                <div className='find_pupils_offer_info_about_chel'>
                                    <ImageWithFallbackAuthor src={dat.photo} alt={dat.username} fallbackSrc="/src/static/img/nema.png"/>
                                    <div className="offer_author_name_div">
                                        <span className="ime offer_author_name_span" translate="no">
                                        {dat.first_name} {dat.last_name}
                                        </span>
                                        {dat.real_man && <img src="/src/static/img/confirmed.png" alt="confirm" className="offer_me_real_pers" />}
                                    </div>
                                    <div className="offer_author_description">{dat.about_myself}</div>
                                </div>
                                </Link>
                              </div>
                            ))}
                        </>)
        
                }
              })()}
        
        
        </>
        
    )
}

export default FutureLessons;