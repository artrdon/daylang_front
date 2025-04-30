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
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import ReviewsAll from '../elems/all_reviews.jsx';


const ReviewExpandableText = ({setShowAllOffers, text, maxLength = 100 }) => {
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
        Показать больше
      </button>
    </div>
  );
};

const AnimatedExpandableText = ({ text, maxLength = 300 }) => {
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
        {isExpanded ? 'Скрыть' : 'Показать больше'}
      </button>
    </div>
  );
};

const AnimatedExpandableTextPhone = ({ text, maxLength = 300  }) => {
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
        {isExpanded ? 'Скрыть' : 'Показать больше'}
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

function ImageWithFallbackMain({ src, fallbackSrc, alt, h_or_w }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [horw, setHorw] = useState(h_or_w); 

  useEffect(() =>{
    setHorw(h_or_w);
  }, [h_or_w])

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
        width: horw === "w" ? "100%" : "auto",
        height: horw === "h" ? "100%" : "auto",
        margin: "auto", 
        display: "block" }}
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





function Offer() {

  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showPhotoBig, setShowPhotoBig] = useState(false);
  const [screen, setScreen] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);


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


  const showRev = () =>{
    document.querySelector("body").style.overflow = "hidden";
    setShowAllOffers(true);
  }

  const unShowRev = () =>{
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
  let isfav = null;

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


    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

        var arrLang = {
      'English': {
          'reviews': 'Reviews',
          'message': "Send message",
          'update': "Update",
          'set_review': 'Leave a review',
          'feedback': 'Feedback'
      },
      'Русский': {
          'reviews': 'Отзывы',
          'message': "Отправить сообщение",
          'update': "Обновить",
          'set_review': 'Оставить отзыв',
          'feedback': 'Отзыв'
      },
      'Srpski': {
          'reviews': 'Recenzije',
          'message': "Pošaljite poruku",
          'update': "Ažuriranje",
          'set_review': 'Ostavite povratne informacije',
          'feedback': 'Povratne informacije'
      },
      'Српски': {
          'reviews': 'Рецензије',
          'message': "Пошаљите поруку",
          'update': "Ажурирање",
          'set_review': 'Оставите повратне информације',
          'feedback': 'Повратне информације'
      },
      'Deutsch': {
          'reviews': 'Gästebewertungen',
          'message': "Nachricht senden",
          'update': "Erneuern",
          'set_review': 'Feedback geben',
          'feedback': 'Feedback'
      },
      'Español': {
          'reviews': 'Reseñas',
          'message': "Enviar mensaje",
          'update': "Renovar",
          'set_review': 'Deja un comentario',
          'feedback': 'Comentarios'
      },
      'عربي': {
          'reviews': 'التعليقات',
          'message': "ارسل رسالة",
          'update': "تحديث",
          'set_review': 'اترك مراجعة',
          'feedback': 'ردود الفعل'
      }

    }


const save_to_fav = async (e) => {

            e.preventDefault();
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
            console.error('There was an error!', error.response.data);
        }
        if (isfav === false)
        {
            isfav = true;
            return;
        }
        else
        {
            isfav = false;
            return;
        }
    }

  const {  data: data, isLoading: loading, isError: error, error: errorDetails  } = useQuery({
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

  
  const { data: data2, isLoading: loading2, isError: error2, error: errorDetails2 } = useQuery({
    queryKey: [`userinfo_author`, params.username], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/userinfo/${params.username}/`);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });

    
  const {  data: data7, isLoading: loading7, isError: error7, error: errorDetails7 } = useQuery({
    queryKey: [`user_settings_author`, params.username], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/usersettings/${params.username}/`);
      return response.data; // Возвращаем только данные
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


  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };
  
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/gettingoffer/${params.username}/${params.id}/`);
        setData1(response.data);
              // Обрабатываем первое фото
      const firstPhotoMeta = await new Promise(resolve => {
        getMeta(response.data[0].photo, (err, img) => {
          resolve({
            photo: response.data[0].photo,
            h_or_w: img.naturalWidth >= img.naturalHeight ? "w" : "h"
          });
        });
      });

      // Обрабатываем остальные фото
      const otherPhotosMeta = await Promise.all(
        response.data[1].map(item => new Promise(resolve => {
          getMeta(item.photo, (err, img) => {
            resolve({
              photo: item.photo,  // Исправлено: было response.data[0].photo
              h_or_w: img.naturalWidth >= img.naturalHeight ? "w" : "h"
            });
          });
        }))
      );

      // Объединяем результаты
      setPhotoArray([firstPhotoMeta, ...otherPhotosMeta]);
    //    setPhotoArray(photos);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);

  



  if (loading) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offer_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offer_load/>

</>

  );
  if (error1) return <p>Error: {error1}</p>;

  if (loading2) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offer_load/>

</>

  );
  if (error2) return <p>Error: {error2}</p>;


  if (loading3) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offer_load/>

</>

  );
  if (error3) return <p>Error: {error3}</p>;

    if (loading7) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Offer_load/>
</>

  );
  if (error7) return <p>Error: {error7}</p>;


    document.querySelector("title").textContent = `${data1[0].name}`;
    document.querySelector("meta[name='description']").content = `${data1[0].description}`;
    if (data1 != null){
        isfav = data1.isFav;
    }
    
    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="find_panel">
  <div className="div_of_foto_and_button" id="divoffb">
    <div className="foto_main" style={{display: "flex", justifyContent: "center", alignItem : "center"}} onClick={() => toggleVisibility()}>
        <ImageWithFallbackMain src={photoArray[photoIndex].photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png" h_or_w={`${photoArray[photoIndex].h_or_w}`}/>

        
    </div>
    {photoArray.length > (photoIndex + 1) && 
          <button style={{ position: "absolute", right: 0, zIndex: 11, top: "calc(50% - 25px)", backgroundColor:"#00000000", width: 50, height: 50 }} onClick={nextPhoto}>
            <img src="/src/static/img/next_photo.png" alt="next" style={{width: "100%", height: "100%"}}/>
          </button>}
        {photoIndex > 0 && 
          <button style={{ position: "absolute", left: 0, zIndex: 11, top: "calc(50% - 25px)", backgroundColor:"#00000000", width: 50, height: 50 , transform: "rotate(180deg)" }} onClick={previosPhoto}>
            <img src="/src/static/img/next_photo.png" alt="prev" style={{width: "100%", height: "100%"}}/>
          </button>}

    {data1[0].pisal === false ? (
          data1[0].itsme === false ? (
          <Link to={`/create_chat/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['message']}
              </button>
            </Link>
                ) : (
          <Link to={`/update_offer/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['update']}
              </button>
            </Link>
            )
                ) : (
          data1[0].itsme === false ? (
          <Link to={`/message_list/${data1[0].chat_id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['message']}
              </button>
            </Link>
                ) : (
          <Link to={`/update_offer/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['update']}
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
                alt=""
                className="offer_src_img"
                id="favorito"
              />
            ) : (
              <img
                src="/src/static/img/srcered.png"
                alt=""
                className="offer_src_img"
                id="favorito"
              />
            )}

        </button>

          <div className="offer_page_div_of_info">
              <li className="offer_page_div_of_info_li">
                  <span>Есть микрофон?</span> <span>{data1[0].microphone}</span>
              </li>
              <li className="offer_page_div_of_info_li">
                  <span>Цели:</span> <span>{data1[0].target}</span>
              </li>
              <li className="offer_page_div_of_info_li">
                  <span>Возраст:</span> <span>{data1[0].age}</span>
              </li>
              <li className="offer_page_div_of_info_li">
                  <span>Формат:</span> <span>{data1[0].format}</span>
              </li>
          </div>
      </div>
    </div>
    <div className="div_description" id="phone">
      <AnimatedExpandableTextPhone text={data1[0].description} />
      <Link to={`/t/user/${data2.username}/`}>
        <div className="offer_about_author_div">
        <div className="offer_about_author">
          <ImageWithFallbackAuthor src={data2.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
          <div className="offer_author_name_div">
            <span className="ime offer_author_name_span" translate="no">
              {data2.first_name} {data2.last_name}
            </span>
            {(() => {
                if (data7.real_man === true) {
                  return <img src="/src/static/img/confirmed.png" alt="confirm" className="offer_me_real_pers" />;
                }
              })()}
          </div>
          <div className="offer_author_description">{data7.about_myself}</div>
        </div>
      </div>
  </Link>
    </div>
    <div className="margin_of_offer">
      <div>
        <h1 className="offer_page_reviews_score">
          {arrLang[lang]['reviews']}{" "}
          <img
            src="/src/static/img/11.png"
            alt="review score"
            className='feedback_review_img'
          />{" "}
          {data1[0].review}
        </h1>
        {data1[0].itsme === false && !data3[1] ? (
          <SetReviewBlock set_rew={arrLang[lang]['set_review']} feedback={arrLang[lang]['feedback']}/>
                ) : (
                  <UpReviewBlock />
                        )}

        {data3[0].map((rew) => 
          <>
            <div className="offer_review_div_div" key={rew.id}>
              <div className="offer_review_div">
                <ImageWithFallbackFeedback src={rew.photo} alt={rew.name} fallbackSrc="/src/static/img/nema.png"/>
                <span className="ime_review">{rew.name}  {rew.last_name}</span>
                <img src={`/src/static/img/${rew.score}.png`} alt="score" className="offer_score_img"/>
              </div>
              <ReviewExpandableText setShowAllOffers={setShowAllOffers} text={rew.text}/>
            </div>
          </>
        )}
        <p className="offer_page_show_more_reviews_button" onClick={showRev}>
            <span className="offer_page_show_more_reviews_button_span">Показать больше</span>
        </p>
      </div>
    </div>
  </div>
  <div className="div_description" id="comp">
    <AnimatedExpandableText text={data1[0].description} />
    <Link to={`/t/user/${data2.username}/`}>
        <div className="offer_about_author_div">
        <div className="offer_about_author">
          <img
            src={data2.photo}
            alt="pupil"
            className="img_of_autor_mes"
          />
          <div className="offer_author_name_div">
            <span className="ime offer_author_name_span" translate="no">
              {data2.first_name} {data2.last_name}
            </span>
            {(() => {
                if (data7.real_man === true) {
                  return <img src="/src/static/img/confirmed.png" alt="confirmed" className="offer_me_real_pers" />;
                }
              })()}
          </div>
          <div className="offer_author_description">{data7.about_myself}</div>
        </div>
      </div>
  </Link>
  </div>

  <div className="offer_page_div_of_offer_div">

    <div className="offer_div">
        <p className="offer_page_vozmozno">Возможно вам подойдут</p>
        <Vozmozno_vam/>
        
    </div>
  </div>
</div>
{showAllOffers && <ReviewsAll unShowRev={unShowRev} arrLang={arrLang} lang={lang}/>}


{showPhotoBig && <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "fixed", width: "100vw",zIndex: 10000}}>
  <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 10, position: "fixed"}} onClick={() => toggleVisibility()} ></div>
      
          <div className="degree_button" style={{ zIndex: 11, height: screen === true ? "95vh":"auto", width: screen === true ? "auto" : "100vw", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center"}} onClick={() => toggleVisibility()}>
              <img src={photoArray[photoIndex].photo} alt={`degreephotoBig`} className="degree_img" style={{ width: photoArray[photoIndex].h_or_w === "w" ? "100%" : "auto", height: photoArray[photoIndex].h_or_w === "h" ? "100%" : "auto"}} />
          </div>
          {photoArray.length > (photoIndex + 1) && 
            <button style={{ position: "fixed", right: 0, zIndex: 11, backgroundColor:"#00000000", width: 100, height: 100 }} onClick={nextPhoto}>
              <img src="/src/static/img/next_photo.png" alt="prevBig" style={{width: "100%", height: "100%"}}/>
            </button>}
          {photoIndex > 0 && 
            <button style={{ position: "fixed", left: 0, zIndex: 11, backgroundColor:"#00000000", width: 100, height: 100 , transform: "rotate(180deg)" }} onClick={previosPhoto}>
              <img src="/src/static/img/next_photo.png" alt="nextBig" style={{width: "100%", height: "100%"}}/>
            </button>}
          
  </div>}
</>

  )
}

export default Offer
