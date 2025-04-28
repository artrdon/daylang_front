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

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
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
  
  

    const csrfToken = getCookie('csrftoken');

    document.querySelector("title").textContent = "Update Offer";

    const [data2, setData2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);

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

    
  

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/gettingoffer/${params.username}/${params.index}/`);
        setData2(response.data);

      } catch (err) {
        setError2(err.message);
      } finally {
        setLoading2(false);
      }
    };

    fetchData();

  }, []);
 
  


  if (loading1) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Create_offer_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
      <Create_offer_load/>
</>

  );
  if (error2) return <p>Error: {error2}</p>;

    return (
        <>
<App name={data1.first_name} lastname={data1.last_name} username={data1.username} lang={langua} if_teach={data1.i_am_teacher} mess_count={messNumb} photo={data1.photo} balance={data1.balance}/>

<UpdateOfferComp name={data2.name} description={data2.description} price={data2.price} id={params.index} language={data2.lang} format={data2.format} target={data2.target} age={data2.age} microphone={data2.microphone} photo={data2.photo} message={data2.message}/>


</>

  )
}

export default UpdateOffer
