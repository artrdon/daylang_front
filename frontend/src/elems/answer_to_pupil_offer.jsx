import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import axios from 'axios';
import Message from '/src/pages/message.jsx'
import Calendar from 'react-calendar';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


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


function AnswerToPupilOffer({closeSearch, ref, currentOffer, FindLang, lang}) {

  const params = useParams();
  
  const [message, setMessage] = useState('');
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

  const sendMessage = async (e) => {
    e.preventDefault();
      try {
          const response = await axios.post(`${APIURL}/offer/creatinganswertooffer/`, {'message': message, 'offer': currentOffer.id}, {
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCookie('csrftoken'),
              },
          });
          //console.log('Response:', response.data);

      } catch (error) {
          console.error('There was an error!', error.response.data);
      }
  };


return ( 
    <>
<div className="deep_search_component_main_div">
    <div className="deep_search_component_close_search" onClick={closeSearch}></div>
    <div className="deep_search_component_form" ref={ref}>
        <div className="deep_search_component_form_title">
            <p id="form-title" className="deep_search_component_upper_title">{FindLang[lang]['answer']}</p>
        </div>
        <div className="deep_search_component_div_under_title">
            <div className="deep_search_component_div_under_title_fields">
              <div style={{height: "calc(100% - 70px)", }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="crt_offer_blank">
                        <p className='find_pupils_offer_name_answer'>{currentOffer.name}</p>
                        <p className='find_pupils_offer_description_answer'>{currentOffer.description}</p>
                        <div className='find_pupils_offer_price_currency'>₽</div>
                        <div className='find_pupils_offer_price'>{currentOffer.price_min} - {currentOffer.price_max} ₽</div>
                        <div className='find_pupils_offer_time_logo'>t</div>
                        <div className='find_pupils_offer_time'> {currentOffer.time} {FindLang[lang]['minutes']}</div>
                        <div className="offer_page_div_of_info" style={{height: "auto", margin: 0}}>
                        <li className="offer_page_div_of_info_li">
                                <span>{FindLang[lang]['i_have_microphone']}?</span> <span>{FindLang[lang][`${currentOffer.microphone === true ? 'yes' : 'no'}`]}</span>
                            </li>
                            <li className="offer_page_div_of_info_li">
                                <span>{FindLang[lang]['goal']}:</span> <span>{FindLang[lang][`${currentOffer.target}`]}</span>
                            </li>
                            <li className="offer_page_div_of_info_li">
                                <span>{FindLang[lang]['age']}:</span> <span>{currentOffer.age}</span>
                            </li>
                            <li className="offer_page_div_of_info_li">
                                <span>{FindLang[lang]['format']}:</span> <span>{FindLang[lang][`${currentOffer.format}`]}</span>
                            </li>
                        </div>
                        <Link to={`/p/user/${currentOffer.username}/`}>
                        <div className='find_pupils_offer_info_about_chel'>
                            <ImageWithFallbackAuthor src={currentOffer.photo} alt={currentOffer.username} fallbackSrc="/src/static/img/nema.png"/>
                            <div className="offer_author_name_div">
                                <span className="ime offer_author_name_span" translate="no">
                                {currentOffer.first_name} {currentOffer.last_name}
                                </span>
                                {currentOffer.real_man && <img src="/src/static/img/confirmed.png" alt="confirm" className="offer_me_real_pers" />}
                            </div>
                            <div className="offer_author_description">{currentOffer.about_myself}</div>
                        </div>
                        </Link>
                        <textarea className='answer_to_pupil_offer_textarea' placeholder={FindLang[lang]['message']} onChange={(e) => setMessage(e.target.value)} value={message} maxLength={500} minLength={10}>
                            
                        </textarea>
                        </div>
                    </div>
              </div>
              
            </div>
            
              <button className="deep_search_component_button" onClick={sendMessage}>
                <p className="deep_search_component_button_text">{FindLang[lang]['send']}</p>
              </button>
        </div>
    </div>
</div>
    </>

  )
}

export default AnswerToPupilOffer
