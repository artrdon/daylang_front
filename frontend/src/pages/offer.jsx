import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import Offer_load from '/src/load_elems/offer_load.jsx'
import SetReviewBlock from '/src/elems/set_review_block.jsx'
import UpReviewBlock from '/src/elems/up_review_block.jsx'
import Vozmozno_vam from '../elems/vozmozno_vam_podojdut';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';

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
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          paddingLeft: 20,
          paddingBottom: 20,
          marginTop: '5px',
        }}
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

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const [messNumb, setMessNumb] = useState(null);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showPhotoBig, setShowPhotoBig] = useState(false);
  const [screen, setScreen] = useState(null);

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

useEffect(() => {

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const dataMess = JSON.parse(event.data);

        if (dataMess.tip === "delete"){
            let i_read = true;
            for (let i = 0; dataMess.if_readed.length > i; i++){
                if (dataMess.if_readed[i] === data.username){
                  i_read = false;
                }
            }
            if (i_read)
              setMessNumb(prev => prev - 1);
            return;
        }

        if (dataMess.tip === "send"){
            setMessNumb(prev => prev + 1);
            return;
        }

    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [groups]);


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


function change_theme() {
    if (document.querySelector('body').className === "dark_theme")
    {

        document.querySelector('body').className = "light_theme";
        document.cookie = "theme=light; path=/;max-age=31556926";
        document.getElementById('theme_img').setAttribute("src", `/src/static/img/sunce.png`);
    }
    else
    {
        document.querySelector('body').className = "dark_theme";
        document.cookie = "theme=dark; path=/;max-age=31556926";
        document.getElementById('theme_img').setAttribute("src", `/src/static/img/moon.png`);
    }
}


    const csrfToken = getCookie('csrftoken');

    const [count, setCount] = useState(0)
    let params = useParams();

    document.querySelector("title").textContent = "Offer";
    let isfav = null;

    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

    const [data2, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);


    const [data3, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);


    const [data5, setData5] = useState(null);
  const [loading5, setLoading5] = useState(true);
  const [error5, setError5] = useState(null);

      const [data7, setData7] = useState(null);
  const [loading7, setLoading7] = useState(true);
  const [error7, setError7] = useState(null);

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



//const para = { username: {params.username}, id: {params.id}};


const save_to_fav = async (e) => {

            e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/save_to_fav/', favor, {
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
        save_to_favor();
        if (isfav === false)
        {
            isfav = true;
            return 0;
        }
        else
        {
            isfav = false;
            return 0;
        }
    }


   
    // Use like:
    

// up post and down get request

  const [data12, setData12] = useState(null);
  const [loading12, setLoading12] = useState(true);
  const [error12, setError12] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/userinfo/');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/usersettings/${params.username}/`);
        setData7(response.data);
      } catch (err) {
        setError7(err.message);
      } finally {
        setLoading7(false);
      }
    };

    fetchData();
  }, []);

    const getMeta = (url, cb) => {
      const img = new Image();
      img.onload = () => cb(null, img);
      img.onerror = (err) => cb(err);
      img.src = url;
    };
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gettingoffer/${params.username}/${params.id}/`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/userinfo/${params.username}/`);
        setData2(response.data);
      } catch (err) {
        setError2(err.message);
      } finally {
        setLoading2(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reviews_two/${params.id}/`); //`http://127.0.0.1:8000/reviews/`
        setData3(response.data);
      } catch (err) {
        setError3(err.message);
      } finally {
        setLoading3(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getchatlist/');
        if (response.data != null){
            for (let i = 0; i < response.data[0].length; i++){
                setGroup((groups) => [...groups, response.data[0][i].id]);
            }
        }
        setData12(response.data);
        setMessNumb(response.data[1]);
      } catch (err) {
        setError12(err.message);
      } finally {
        setLoading12(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>

</>

  );
  if (error1) return <p>Error: {error}</p>;

  if (loading2) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>

</>

  );
  if (error2) return <p>Error: {error}</p>;


  if (loading3) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>

</>

  );
  if (error3) return <p>Error: {error}</p>;

    if (loading7) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>
</>

  );
  if (error7) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;


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
          <Link to={`/create_chat/${params.username}/${data1[0].name}/${params.id}/`}>
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
        <span style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", height: 75, display: "block" }}>{data1[0].name}</span>
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

          <div style={{ width:"100%", height: 400, marginTop: 50, }}>
              <li style={{margin: 20}}>
                  <span>Есть микрофон?</span> <span>{data1[0].microphone}</span>
              </li>
              <li style={{margin: 20}}>
                  <span>Цели:</span> <span>{data1[0].target}</span>
              </li>
              <li style={{margin: 20}}>
                  <span>Возраст:</span> <span>{data1[0].age}</span>
              </li>
              <li style={{margin: 20}}>
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
                  return <img src="/src/static/img/confirmed.png" alt="" className="offer_me_real_pers" />;
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
        <h1 style={{ marginBottom: 30, top: 800, position: "absolute" }}>
          {arrLang[lang]['reviews']}{" "}
          <img
            src="/src/static/img/11.png"
            alt=""
            style={{ width: 30, height: 30 }}
          />{" "}
          {data1[0].review}
        </h1>
        {data1[0].itsme === false ? (
          <SetReviewBlock set_rew={arrLang[lang]['set_review']} feedback={arrLang[lang]['feedback']}/>
                ) : (
                  <UpReviewBlock />
                        )}

        {data3[1].map((rew) => 
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
        <p style={{ display: "block", padding: 30, position: "relative", top: 100, border: "1px solid gray", borderBottomLeftRadius: 50, borderBottomRightRadius: 50, textAlign: "center" }} onClick={showRev}>
            <span style={{ position: "relative", fontSize: 30, margin: 20, cursor: "pointer"}}>Показать больше</span>
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
                  return <img src="/src/static/img/confirmed.png" alt="" className="offer_me_real_pers" />;
                }
              })()}
          </div>
          <div className="offer_author_description">{data7.about_myself}</div>
        </div>
      </div>
  </Link>
  </div>

  <div className="div_of_offer_div" style={{marginTop: 200}}>

    <div className="offer_div">
        <h3>Возможно вам подойдут</h3>
        <Vozmozno_vam/>
        
    </div>
  </div>
</div>
{showAllOffers && <div className="offer_review_modal-container">
                    <div className="offer_review_modal-backdrop" onClick={unShowRev}></div>
                    <div className="offer_review_modal-content">
                      <p className="offer_review_modal-title">{arrLang[lang]['reviews']}</p>
                      <div className="offer_review_reviews-scroll-container">
                      {data3[0].map((rew) => 
                            <>
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
                            </>
                      )}
                      </div>
                    </div>
                  </div>}


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
