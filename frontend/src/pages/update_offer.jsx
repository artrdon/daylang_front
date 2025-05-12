import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import UpdateOfferComp from '/src/elems/update_offer_comp.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';

function UpdateOffer() {

    
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);

    const params = useParams();

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
  
  

    const csrfToken = getCookie('csrftoken');

    document.querySelector("title").textContent = "Update Offer";

    axios.defaults.withCredentials = true;


    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;



    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
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
      queryKey: ['getting_offer_to_update', params.index], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/offer/get_offer_to_update/${params.index}/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
    
  
 
  


  if (loading1) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Create_offer_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;
  if (data1.username === undefined)
  {
      window.location.replace(`/log/`);
      return;
  }

  if (loading2) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Create_offer_load/>
</>

  );
  if (error2) return <p>Error: {error2}</p>;
  if (data2 === 'unauthenticated_ttt')
  {
      window.location.replace(`/forbidden/`);
      return;
  }

    return (
        <>
<App name={data1.first_name} lastname={data1.last_name} username={data1.username} lang={langua} if_teach={data1.i_am_teacher} mess_count={messNumb} photo={data1.photo} balance={data1.balance}/>

<UpdateOfferComp name={data2[0].name} description={data2[0].description} price={data2[0].price} id={params.index} language={data2[0].lang} format={data2[0].format} target={data2[0].target} age={data2[0].age} microphone={data2[0].microphone} photo={data2[0].photo} message={data2[0].message}/>


</>

  )
}

export default UpdateOffer
