import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { CSSTransition } from 'react-transition-group';
import FindLang from '../../languages/find.js';
import axios from 'axios';
import Type_offer from '/src/elems/offer_type.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import MoreInfoFromFind from '../elems/moreinfofromfind.jsx';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';


function Find() {
    
    const websocket = useWebSocket();
    const [lessons, setLessons] = useState(websocket.lessons);
    const [lang, setLang] = useState(websocket.lang);
    const node = useRef(null);
    useEffect(() => {
        setLessons(websocket.lessons);
    }, [websocket.lessons]);

    const [moreinfo, setMoreInfo] = useState(false);
    const [idOfInfo, setIdOfInfo] = useState('');
    const getMoreInfo = (id) => {
      let idd = Number(id);
      
      setIdOfInfo(idd);
      setMoreInfo(true);
    }
    


    axios.defaults.withCredentials = true;


    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${vars['APIURL']}/userinfo/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
      queryKey: ['lol'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${vars['APIURL']}/lol/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });

    if (loading) return <AppLoad lang={lang}/>;
    if (error) return <p>Error: {error}</p>;
    
    if (loading1) return <AppLoad lang={lang}/>;
    if (error1) return <p>Error: {error1}</p>;
    document.querySelector("title").textContent = "DayLang";

    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>
<div className='find_panel'>
  <div className="tag_select_panel">
    {/*<h1 className='find_page_teacher'>{arrLang[lang]['teacher']}</h1>
    <p className='find_page_teacher_description'>
      {arrLang[lang]['teacher_description']}
    </p>*/}
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>
      {data1.map((data, index) => (
        <Type_offer lang={lang} language_name={data.name} flag={data.destination} price={data.price} getMoreInfo={getMoreInfo} index={index} key={index} minutes={data.minutes}/>
      ))}

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>

<CSSTransition
  in={moreinfo}
  timeout={300}
  classNames="do_bye_panel"
  unmountOnExit
  nodeRef={node}
>
    <MoreInfoFromFind ref={node} setBye={setMoreInfo} lang={lang} idOfInfo={idOfInfo} moreinfo={data1}/>

</CSSTransition>


</>

  )
}

export default Find
