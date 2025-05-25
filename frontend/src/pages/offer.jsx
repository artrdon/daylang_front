import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import arrLangOffer from '/languages/offer.js'
import Offer_load from '/src/load_elems/offer_load.jsx'
import SetReviewBlock from '/src/elems/set_review_block.jsx'
import UpReviewBlock from '/src/elems/up_review_block.jsx'
import Vozmozno_vam from '../elems/vozmozno_vam_podojdut';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import ReviewsAll from '../elems/all_reviews.jsx';
import { CSSTransition } from 'react-transition-group';


const ReviewExpandableText = ({setShowAllOffers, text, maxLength = 100, lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const showMore = () =>{
    document.querySelector("body").style.overflow = "hidden";
    setShowAllOffers(true);
  }
  // Если текст короче максимальной длины, показываем полностью
  if (text.length <= maxLength) {
    return <p className="offer_review_text">{text}</p>;
  }


  // Сокращенный и полный текст
  const truncatedText = text.slice(0, maxLength) + '...';
  const displayText = isExpanded ? text : truncatedText;

  return (
    <div>
      <p className="offer_review_text" style={{paddingBottom: 0}}>{displayText}</p>
      <button 
        onClick={showMore}
        className='offer_page_show_more_button_expanded'
      >
        {arrLangOffer[lang]['show_more']}
      </button>
    </div>
  );
};

const AnimatedExpandableText = ({ text, maxLength = 300, lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return <div className="description_text">{text}</div>;
  }

  const truncatedText = text.slice(0, maxLength) + '...';
  const displayText = isExpanded ? text : truncatedText;

  return (
    <div>
      <div className="description_text">{displayText}</div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className='offer_page_show_more_button'
      >
        {isExpanded ? `${arrLangOffer[lang]['unshow']}` : `${arrLangOffer[lang]['show_more']}`}
      </button>
    </div>
  );
};

const AnimatedExpandableTextPhone = ({ text, maxLength = 300, lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return <div className="description_text" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>{text}</div>;
  }

  const truncatedText = text.slice(0, maxLength) + '...';
  const displayText = isExpanded ? text : truncatedText;

  return (
    <div>
      <div className="description_text" style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>{displayText}</div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className='offer_page_show_more_button'
      >
        {isExpanded ? `${arrLangOffer[lang]['unshow']}` : `${arrLangOffer[lang]['show_more']}`}
      </button>
    </div>
  );
};

function ImageWithFallbackAuthor({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="img_of_autor_mes"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}

function ImageWithFallbackMain({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);


  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={{ 
        width: '100%',
        height: "100%",
        margin: "auto", 
        display: "block",
        objectFit: "contain",
       }}
      id="divoffb_img"
    />
  );
}

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


function ImageAfterMain({ src, fallbackSrc, alt, className, style }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className={className}
      style={style}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}


function Offer() {

  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showPhotoBig, setShowPhotoBig] = useState(false);
  const [screen, setScreen] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  const nodeRev = useRef(null);
  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);


  useEffect(() => {
    if (window.innerWidth > window.innerHeight) {
      setScreen(true);
    } else {
      setScreen(false);
    }
  }, [window.innerWidth, window.innerHeight]);

  const toggleVisibility = () => {
      setShowPhotoBig(!showPhotoBig);
  };


  const showRev = () => {
    document.querySelector("body").style.overflow = "hidden";
    setShowAllOffers(true);
  }

  const unShowRev = () => {
    document.querySelector("body").style.overflow = "unset";
    setShowAllOffers(false);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


  const theme = getCookie('theme');


  if (getCookie('theme') === "dark"){
      if (document.querySelector('body') != null)
          document.querySelector('body').className = "dark_theme";
  }
  else{
      if (document.querySelector('body') != null)
          document.querySelector('body').className = "light_theme";
  }


  const csrfToken = getCookie('csrftoken');

  const params = useParams();

  document.querySelector("title").textContent = "Offer";
  const [isfav, setIsfav] = useState(false);

  const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  const [favor, setData6] = useState({username: params.username, id: params.id});
  const [photoArray, setPhotoArray] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = () =>{
      setPhotoIndex(prev => prev + 1);
  }
  const previosPhoto = () =>{
      setPhotoIndex(prev => prev - 1);
  }


axios.defaults.withCredentials = true;

const save_to_fav = async (e) => {

            e.preventDefault();
        if (data.username === undefined)
        {
            window.location.replace(`/log/`);
            return;
        }
        try {
            const response = await axios.post(`${APIURL}/save_to_fav/`, favor, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            if (response.data === "unauthenticated_ttt")
            {
                window.location.replace(`/log/`);
                return;
            }


        } catch (error) {
          if (err.response?.status === 401){
            window.location.replace(`/log/`);
            return;
          }
            console.error('There was an error!', error.response.data);
        }
        
        setIsfav(!isfav);
    }

  const {  data: data, isLoading: loading, isError: error, error: errorDetails  } = useQuery({
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
    
  const { data: data3, isLoading: loading3, isError: error3, error: errorDetails3 } = useQuery({
    queryKey: [`reviews_two_offer`, params.id], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/reviews_two/${params.id}/`);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/gettingoffer/${params.username}/${params.id}/`);
        setData1(response.data);
        setIsfav(response.data[0].isFav);
      if (response.data[1] != null && response.data[1] != undefined && response.data[1].length > 0)
      {
        let photos = [];
        photos.push(response.data[0]);
        for (let i = 0; i < response.data[1].length; i++){
          photos.push(response.data[1][i]);
        }
        setPhotoArray(photos);
      }
      else{
        setPhotoArray([response.data[0]]);
      }

    //    setPhotoArray(photos);
      } catch (err) {
        if (err.response?.status === 404) {
          window.location.href = '/not_found/'; // Более предпочтительно чем replace
          return;
        }
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
      <Offer_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Offer_load/>

</>

  );
  if (error1) return <p>Error: {error1}</p>;

  if (loading3) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Offer_load/>

</>

  );
  if (error3) return <p>Error: {error3}</p>;

    document.querySelector("title").textContent = `${data1[0].name}`;
    document.querySelector("meta[name='description']").content = `${data1[0].description}`;
    
    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} if_teach={data.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data.photo} balance={data.balance}/>

<div className="find_panel">
  <div className="div_of_foto_and_button" id="divoffb">
    <div className="foto_main" style={{display: "flex", justifyContent: "center", alignItem : "center"}} onClick={() => toggleVisibility()}>
        <ImageWithFallbackMain src={photoArray[photoIndex].photo} alt="offer photo" fallbackSrc="/src/static/img/nema.png"/>

        
    </div>
    {photoArray.length > (photoIndex + 1) && 
          <button className='offer_right_next_photo_button' onClick={nextPhoto}>
            <img src="/src/static/img/next_photo.png" alt="next" style={{width: "100%", height: "100%"}}/>
          </button>}
        {photoIndex > 0 && 
          <button className='offer_left_next_photo_button' onClick={previosPhoto}>
            <img src="/src/static/img/next_photo.png" alt="prev" style={{width: "100%", height: "100%"}}/>
          </button>}

    {data1[0].pisal === false ? (
          data1[0].itsme === false ? (
          <Link to={`/create_chat/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLangOffer[lang]['message']}
              </button>
            </Link>
                ) : (
          <Link to={`/update_offer/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLangOffer[lang]['update']}
              </button>
            </Link>
            )
                ) : (
          data1[0].itsme === false ? (
          <Link to={`/message_list/${data1[0].chat_id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLangOffer[lang]['message']}
              </button>
            </Link>
                ) : (
          <Link to={`/update_offer/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLangOffer[lang]['update']}
              </button>
            </Link>
            )
    )}

  </div>
  <div className="review_div">
    <div className="margin_of_offer">
      <h1>
        <span className="offer_page_name">{data1[0].name}</span>
      </h1>
      <div className="offer_price_div">
        <div className="offer_price">
          {data1[0].price} ₽
        </div>
        <button onClick={save_to_fav} className="offer_save_to_fav_button">

         {isfav === false ? (
              <img
                src="/src/static/img/srce.png"
                alt="srce"
                className="offer_src_img"
                id="favorito"
              />
            ) : (
              <img
                src="/src/static/img/srcered.png"
                alt="srcered"
                className="offer_src_img"
                id="favorito"
              />
            )}

        </button>

          <div className="offer_page_div_of_info">
              <li className="offer_page_div_of_info_li">
                  <span>{arrLangOffer[lang]['i_have_microphone']}?</span> <span>{arrLangOffer[lang][`${data1[0].microphone ? 'yes' : 'no'}`]}</span>
              </li>
              <li className="offer_page_div_of_info_li">
                  <span>{arrLangOffer[lang]['goal']}:</span> <span>{arrLangOffer[lang][`${data1[0].target}`]}</span>
              </li>
              <li className="offer_page_div_of_info_li">
                  <span>{arrLangOffer[lang]['age']}:</span> <span>{data1[0].age === "age" ? arrLangOffer[lang]['all'] : data1[0].age} </span>
              </li>
              <li className="offer_page_div_of_info_li">
                  <span>{arrLangOffer[lang]['format']}:</span> <span>{arrLangOffer[lang][`${data1[0].format}`]}</span>
              </li>
          </div>
      </div>
    </div>
    <div className="div_description" id="phone">
      <AnimatedExpandableTextPhone text={data1[0].description} lang={lang}/>
      <Link to={`/t/user/${data1[0].username}/`}>
        <div className="offer_about_author_div">
        <div className="offer_about_author">
          <ImageWithFallbackAuthor src={data1[0].chel_photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
          <div className="offer_author_name_div">
            <span className="ime offer_author_name_span" translate="no">
              {data1[0].first_name} {data1[0].last_name}
            </span>
            {data1[0].real_man && <img src="/src/static/img/confirmed.png" alt="confirm" className="offer_me_real_pers" />}
          </div>
          <div className="offer_author_description">{data1[0].about_myself}</div>
        </div>
      </div>
  </Link>
    </div>
    <div className="margin_of_offer">
      <div>
        <h1 className="offer_page_reviews_score">
          {arrLangOffer[lang]['reviews']}{" "}
          <img
            src="/src/static/img/11.png"
            alt="review score"
            className='feedback_review_img'
          />{" "}
          {data1[0].review}
        </h1>
        {data1[0].itsme === false && !data3[1] && data !== 'undefined' ? (
          <SetReviewBlock set_rew={arrLangOffer[lang]['set_review']} feedback={arrLangOffer[lang]['feedback']} username={data.username}/>
                ) : (
                  <UpReviewBlock />
                        )}

        {data3[0].map((rew) => (
            <div className="offer_review_div_div" key={rew.id}>
              <div className="offer_review_div">
                <ImageWithFallbackFeedback src={rew.photo} alt={rew.name} fallbackSrc="/src/static/img/nema.png"/>
                <span className="ime_review">{rew.name}  {rew.last_name}</span>
                <img src={`/src/static/img/${rew.score}.png`} alt="score" className="offer_score_img"/>
              </div>
              <ReviewExpandableText setShowAllOffers={setShowAllOffers} text={rew.text} lang={lang}/>
            </div>
        ))}
        <p className="offer_page_show_more_reviews_button" onClick={showRev}>
            <span className="offer_page_show_more_reviews_button_span">{arrLangOffer[lang]['show_more']}</span>
        </p>
      </div>
    </div>
  </div>
  <div className="div_description" id="comp">
    <AnimatedExpandableText text={data1[0].description} lang={lang}/>
    <Link to={`/t/user/${data1[0].username}/`}>
        <div className="offer_about_author_div">
        <div className="offer_about_author">
          <img
            src={data1[0].chel_photo}
            alt="pupil"
            className="img_of_autor_mes"
          />
          <div className="offer_author_name_div">
            <span className="ime offer_author_name_span" translate="no">
              {data1[0].first_name} {data1[0].last_name}
            </span>
            {data1[0].real_man && <img src="/src/static/img/confirmed.png" alt="confirm" className="offer_me_real_pers" />}
          </div>
          <div className="offer_author_description">{data1[0].about_myself}</div>
        </div>
      </div>
  </Link>
  </div>

  <div className="offer_page_div_of_offer_div">

    <div className="offer_div">
        <p className="offer_page_vozmozno">{arrLangOffer[lang]['vozmozno_vam_podojdut']}</p>
        <Vozmozno_vam/>
        
    </div>
  </div>
</div>

<CSSTransition
  in={showAllOffers}
  timeout={300}
  classNames="offer_review_modal-container"
  unmountOnExit
  nodeRef={nodeRev}
>
  <ReviewsAll ref={nodeRev} unShowRev={unShowRev} arrLang={arrLangOffer} lang={lang}/>

</CSSTransition>




{showPhotoBig && <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "fixed", width: "100vw",zIndex: 10000}}>
  <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 10, position: "fixed"}} onClick={() => toggleVisibility()} ></div>
      
          <div className="degree_button offer_big_photo" style={{ zIndex: 11, height: screen === true ? "95vh":"auto", width: screen === true ? "auto" : "100vw", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center"}}>
            {photoArray.length > (photoIndex + 1) && 
              <button className='offer_right_next_photo_button' onClick={nextPhoto}>
                <img src="/src/static/img/next_photo.png" alt="prevBig" style={{width: "100%", height: "100%"}}/>
              </button>}
                  <ImageAfterMain src={photoArray[photoIndex].photo}  alt={`degreephotoBig`} className="degree_img" style={{ width: "100%", height: "100%", zIndex: 10, objectFit: "contain"}} fallbackSrc="/src/static/img/nema.png"/>
            {photoIndex > 0 && 
              <button className='offer_left_next_photo_button' onClick={previosPhoto}>
                <img src="/src/static/img/next_photo.png" alt="nextBig" style={{width: "100%", height: "100%"}}/>
              </button>}
              
          </div>
          
          
  </div>}
</>

  )
}

export default Offer
