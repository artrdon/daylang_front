import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { CSSTransition } from 'react-transition-group';
import FindLang from '../../languages/find.js';
import axios from 'axios';
import Type_offer from '/src/elems/offer_type.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import MoreInfoFromFind from '../elems/moreinfofromfind.jsx';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import NowLessons from '../elems/now_lessons.jsx';
import ExpLessons from '../elems/exp_lessons.jsx';


function Find() {
    const env = import.meta.env;
    const [page, setPage] = useState(0);
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
        const response = await axios.get(`${env.VITE_APIURL}/userinfo/`);
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
        const response = await axios.get(`${env.VITE_APIURL}/lol/`);
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
    document.querySelector("title").textContent = "DayLang | Развивайте разговорную речь на английском языке";
    document.querySelector("meta[name='description']").content = "DayLang - место, где вы можете тренировать разговорую речь на английском языке. Разговаривайте на любые темы, как с настоящим собеседником, с помощью технологии искусственного интеллекта.";
    document.querySelector("meta[name='keywords']").content = "daylang, DayLang, Дайленг, дейленг, ИИ, искуственный интеллект, разговор со смайликом на английском, разговор на английском с ии, разговор на английском с искуственным интеллектом";
    document.querySelector("meta[property='og:url']").content = "https://daylang.ru";
    document.querySelector("meta[property='og:title']").content = "DayLang | Развивайте разговорную речь на английском языке";
    document.querySelector("meta[property='og:description']").content = "DayLang - место, где вы можете тренировать разговорую речь на английском языке. Разговаривайте на любые темы, как с настоящим собеседником, с помощью технологии искусственного интеллекта.";
    document.querySelector("meta[property='og:image']").content = "https://daylang.ru/src/static/img/icon.svg";

    // Add structured data for products
/*    useEffect(() => {
      if (data1) {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": data1.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": `Разговор на английском ${item.minutes} минут`,
              "description": `${item.description}`,
              "offers": {
                "@type": "Offer",
                "price": item.price,
                "priceCurrency": "RUB",
                "availability": "https://schema.org/InStock"
              },
              "duration": `PT${item.minutes}M`
            }
          }))
        };

        // Add the structured data to the page
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        // Cleanup
        return () => {
          document.head.removeChild(script);
        };
      }
    }, [data1]);
*/
    return (
        <>
{/*data1.map((data, index) => (
  <div itemScope itemType='https://schema.org/Product' key={index}>
    <h1 itemProp='name'>{`Разговор на английском ${data.minutes} минут`}</h1>
    <span itemProp='description'>{`${data.description}`}</span>
    <img src={data.destination} alt="image" itemProp='image' />
    <div itemProp='offers' itemScope itemType='https://schema.org/Offer'>
      <span itemProp='price'>{data.price}</span>
      <span itemProp='priceCurrency'>₽</span>
    </div>
  </div>

))*/}

{/*<div itemScope itemType='https://schema.org/Product'>
    <h1 itemProp='name'>name_</h1>
    <span itemProp='description'>description_</span>
    <img src="https://daylang.ru/src/static/img/favicon.png" alt="image" itemProp='image' />
    <div itemProp='offers' itemScope itemType='https://schema.org/Offer'>
      <span itemProp='price'>777</span>
      <span itemProp='priceCurrency'>₽</span>
    </div>
  </div>
*/}
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>

<div className='find_panel'>
  <div className='find_page_up_buttons'>
    <button onClick={() => setPage(0)} className={page === 0 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      {FindLang[lang]['bye_access']}
    </button>
    <button onClick={() => setPage(1)} className={page === 1 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      {FindLang[lang]['now_lessons']}
    </button>
    <button onClick={() => setPage(2)} className={page === 2 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      {FindLang[lang]['exp_lessons']}
    </button>
  </div>
  <div className="tag_select_panel">
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>


        {page === 0 && 
        (<>
          {data1.map((data, index) => (
            <Type_offer lang={lang} language_name={data.name} flag={data.destination} price={data.price} getMoreInfo={getMoreInfo} index={index} key={index} minutes={data.minutes}/>
          ))}
        </>)}
        {page === 1 && <NowLessons />}
        {page === 2 && <ExpLessons />}

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }} />
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
