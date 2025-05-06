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

function ImageWithFallbackFeedback({ src, fallbackSrc, alt }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className='avatar'
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }
  

function ReviewsAll({ref, unShowRev, arrLang, lang}) {

  const params = useParams();    
  const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
    queryKey: [`reviews_all_offer`, params.id], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/reviews_all/${params.id}/`);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });



  if (loading) return (
    <>
    <div className="offer_review_modal-container">
                    <div className="offer_review_modal-backdrop" onClick={unShowRev}></div>
                    <div className="offer_review_modal-content" ref={ref}>
                      <p className="offer_review_modal-title">{arrLang[lang]['reviews']}</p>
                      <div className="offer_review_reviews-scroll-container">
                      
                      </div>
                    </div>
                  </div>
</>

);
if (error) return <p>Error: {error}</p>;

    return (
        <div className="offer_review_modal-container">
                    <div className="offer_review_modal-backdrop" onClick={unShowRev}></div>
                    <div className="offer_review_modal-content" ref={ref}>
                      <p className="offer_review_modal-title">{arrLang[lang]['reviews']}</p>
                      <div className="offer_review_reviews-scroll-container">
                      {data.map((rew) => 
                            
                              <div className="offer_review_div_div" style={{top: "unset"}} key={rew.id}>
                                <div className="offer_review_div">
                                  <ImageWithFallbackFeedback src={rew.photo} alt={rew.name} fallbackSrc="/src/static/img/nema.png"/>
                                  <span className="ime_review">{rew.name}  {rew.last_name}</span>
                                  <img src={`/src/static/img/${rew.score}.png`} alt="score" className="offer_score_img"/>
                                </div>
                                <p className="offer_review_text">
                                  {rew.text}
                                </p>
                              </div>
                            
                      )}
                      </div>
                    </div>
                  </div>
    )
}

export default ReviewsAll;