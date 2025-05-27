import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import FindLang from '../../languages/find.js';
import axios from 'axios';
import Type_offer from '/src/elems/offer_type.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import APIURL from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import { CSSTransition } from 'react-transition-group';


function Find() {
    const [answerToPupilOffer, setAnswerToPupilOffer] = useState(false);
    const reftoAnswerToPupilOffer = useRef(null);
    const websocket = useWebSocket();
    const [messNumb, setMessNumb] = useState(websocket.messNumb);
    const [lessons, setLessons] = useState(websocket.lessons);
    const [lang, setLang] = useState(websocket.lang);
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
          <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
    </>

    );
    if (error) return <p>Error: {error}</p>;


    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} if_teach={data.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data.photo} balance={data.balance}/>
<div className='find_panel'>
  <div className="tag_select_panel">
    {/*<h1 className='find_page_teacher'>{arrLang[lang]['teacher']}</h1>
    <p className='find_page_teacher_description'>
      {arrLang[lang]['teacher_description']}
    </p>*/}
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>


        <Type_offer lang={lang}/>

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>

</>

  )
}

export default Find
