import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';


function Forbidden() {

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);

  document.querySelector("title").textContent = `403`;

axios.defaults.withCredentials = true;


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


const theme = getCookie('theme');
//console.log(getCookie('theme'));


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

    langua = lang;


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
  
 

  if (loading) return  ( <> <AppLoad lang={langua} messNumb={messNumb}/> </> );
  if (error) return <p>Error: {error}</p>;


return (
    <>
    <App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="find_panel not_found_all_container_404_positing" >
    <div className='not_found_all_container_404'>
        <div className='not_found_font_404'>
            403
        </div>
    </div>
</div>
</>
)
}

export default Forbidden