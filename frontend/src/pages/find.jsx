import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Finded from '/src/pages/finded.jsx'
import Type_offer from '/src/elems/offer_type.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import OffersFromPupils from '/src/elems/offers_from_pupils.jsx'
import AnswerToPupilOffer from '/src/elems/answer_to_pupil_offer.jsx'
import { CSSTransition } from 'react-transition-group';


function Find() {
    const [answerToPupilOffer, setAnswerToPupilOffer] = useState(false);
    const reftoAnswerToPupilOffer = useRef(null);
    const websocket = useWebSocket();
    const [messNumb, setMessNumb] = useState(websocket.messNumb);
    const [lessons, setLessons] = useState(websocket.lessons);
    const [page, setPage] = useState(0);
    const [currentOffer, setCurrentOffer] = useState(null);
    useEffect(() => {
      setMessNumb(websocket.messNumb);
      setLessons(websocket.lessons);
  }, [websocket.messNumb, websocket.lessons]);
    const queryClient = useQueryClient();

    const closeAnswerToPupilOffer = () => {
      setAnswerToPupilOffer(false);
      document.querySelector('body').style.overflow = 'unset';
    }

    document.querySelector("title").textContent = "DayLang";

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

    if (lang != undefined){
        langua = lang;
    }
    else{
        document.cookie = `lang=English; path=/;max-age=31556926`;
        langua = "English";
    }
    var arrLang = {
      'English': {
          'teacher': 'Teacher',
          'teacher_description': 'Teacher can help u if u dont speak fluently or correct you grammar mistakes and just make ur level of language up',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Русский': {
          'teacher': 'Преподаватель',
          'teacher_description': 'Преподаватель может помочь вам, если вы не говорите бегло, или исправить ваши грамматические ошибки, и просто повысить ваш уровень владения языком',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Srpski': {
          'teacher': 'Nastavnik',
          'teacher_description': 'Nastavnik vam može pomoći ako ne govorite tečno ili ispraviti gramatičke greške i jednostavno povećati nivo znanja jezika',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Српски': {
          'teacher': 'Наставник',
          'teacher_description': 'Наставник вам може помоћи ако не говорите течно или исправити граматичке грешке и једноставно повећати ниво знања језика',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Deutsch': {
          'teacher': 'Lehrer',
          'teacher_description': 'Der Lehrer kann dir helfen, wenn du nicht fließend sprichst oder deine Grammatikfehler korrigierst und einfach dein Sprachniveau verbesserst',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Español': {
          'teacher': 'Profesor',
          'teacher_description': 'El profesor puede ayudarte si no hablas con fluidez o corriges tus errores gramaticales y simplemente subes de nivel el idioma',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'عربي': {
          'teacher': 'المعلم',
          'teacher_description': 'يمكن للمعلم مساعدتك إذا كنت لا تتحدث بطلاقة أو تصحح أخطائك النحوية وتجعل مستوى لغتك مرتفعا',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      }

    }


    axios.defaults.withCredentials = true;


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

    if (loading) return (
          <>
          <AppLoad lang={langua} messNumb={messNumb} lessons={lessons}/>
    </>

    );
    if (error) return <p>Error: {error}</p>;


    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data.photo} balance={data.balance}/>
<div className='find_panel'>
  <div className='find_page_up_buttons'>
    <button onClick={() => setPage(0)} className={page === 0 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      teacher`s offers
    </button>
    <button onClick={() => setPage(1)} className={page === 1 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      pupil`s offers
    </button>
  </div>
  <div className="tag_select_panel">
    {/*<h1 className='find_page_teacher'>{arrLang[lang]['teacher']}</h1>
    <p className='find_page_teacher_description'>
      {arrLang[lang]['teacher_description']}
    </p>*/}
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>


        {page === 0 && <Type_offer lang={lang}/>}
        {page === 1 && <OffersFromPupils setAnswerToPupilOffer={setAnswerToPupilOffer} setCurrentOffer={setCurrentOffer} ifteacher={data.i_am_teacher}/>}

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>


<CSSTransition
  in={answerToPupilOffer}
  timeout={300}
  classNames="deep_search_component_form"
  unmountOnExit
  nodeRef={reftoAnswerToPupilOffer}
>
  <AnswerToPupilOffer ref={reftoAnswerToPupilOffer} closeSearch={closeAnswerToPupilOffer} data={data} currentOffer={currentOffer}/>

</CSSTransition>


</>

  )
}

export default Find
