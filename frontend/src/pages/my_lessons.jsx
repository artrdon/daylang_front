import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import arrLangMyLessons from '../../languages/my_lessons.js';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import FutureLessons from '/src/elems/future_lessons.jsx';

function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="finded_img"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}



function MyLessons() {

  const[page, setPage] = useState(0);
  const websocket = useWebSocket();
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  useEffect(() => {
    setLessons(websocket.lessons);
}, [websocket.lessons]);
  
  
    document.querySelector("title").textContent = "My lessons";
    const params = useParams();

axios.defaults.withCredentials = true;


    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo'], // Уникальный ключ запроса
      queryFn: async () => {
        try {
          const response = await axios.get(`${APIURL}/userinfo/`);
          return response.data;
        } catch (err) {
          if (err.response?.status === 401){
            window.location.href = '/log';
            return null;
          }
        }
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });



  if (loading) return (
      <>
      <AppLoad lang={lang} lessons={lessons}/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>

  <div className="find_panel">
  <div className='find_page_up_buttons'>
    <button onClick={() => setPage(0)} className={page === 0 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      {arrLangMyLessons[lang]['future_lessons']}
    </button>
    <button onClick={() => setPage(1)} className={page === 1 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      {arrLangMyLessons[lang]['past_lessons']}
    </button>
    {!data.i_am_teacher && <button onClick={() => setPage(2)} className={page === 2 ? 'find_page_up_button_el selected' : 'find_page_up_button_el'}>
      {arrLangMyLessons[lang]['answers_from_teachers']}
    </button>}
  </div>

  
  <div className="tag_select_panel">
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>

        {page === 0 && <FutureLessons/>}
        {page === 1 && <div/>}

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>


</>

  )
}

export default MyLessons
