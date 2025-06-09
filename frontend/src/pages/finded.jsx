import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import { useWebSocket } from '../once/web_socket_provider.jsx';

function Finded() {

  const nodeDeep = useRef(null);
  const websocket = useWebSocket();
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  const env = import.meta.env;
    const params = useParams();


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
  


  if (loading) return <AppLoad lang={lang} lessons={lessons}/>;
  if (error) return <p>Error: {error}</p>;
  document.querySelector("title").textContent = "Offers";


  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>

<div className="saved_finded_panel">
  <div className="sborishe_chelov">


<div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}/>
  </div>
</div>


</>

  )
}

export default Finded
