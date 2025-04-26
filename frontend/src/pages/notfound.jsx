import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function NotFound() {

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const [messNumb, setMessNumb] = useState(null);

useEffect(() => {

    const socket = new WebSocket(`${WSAPIURL}/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const dataMess = JSON.parse(event.data);

        console.log(dataMess);
        if (dataMess.tip === "delete"){
            let i_read = true;
            for (let i = 0; dataMess.if_readed.length > i; i++){
                console.log(dataMess.if_readed[i]);
                console.log(data.username);
                if (dataMess.if_readed[i] === data.username){
                  console.log("i_read");
                  i_read = false;
                }
            }
            if (i_read)
              setMessNumb(prev => prev - 1);
            return;
        }

        if (dataMess.tip === "send"){
            setMessNumb(prev => prev + 1);
            return;
        }

         //   document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [groups]);


  document.querySelector("title").textContent = `404`;

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
  
 
  const { data: data12, isLoading: loading12, isError: error12, error: errorDetails12  } = useQuery({
    queryKey: [`getchatlist`], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/getchatlist/`);

      if (response.data != null){
          let group = [];
          for (let i = 0; i < response.data[0].length; i++){
              //setGroup((groups) => [...groups, response.data[0][i].id]);
              group.unshift(response.data[0][i].id);
          }
          setGroup(group);
      }
      setMessNumb(response.data[1]);
      return response.data; // Возвращаем только данные
    },
    // Опциональные параметры:
    retry: 2, // Количество попыток повтора при ошибке
    staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
    refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
  });


  if (loading) return  ( <> <AppLoad lang={langua}/> </> );
  if (error) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
</>

  );
  if (error12) return <p>Error: {error12}</p>;

return (
    <>
    <App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={data12[1]} photo={data.photo} balance={data.balance}/>

<div className="find_panel" style={{ width: "100%", height: "calc(100% - 140px)" }}>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", position: "absolute",  }}>
        <div style={{ fontSize: 400 }}>
            404
        </div>
    </div>
</div>
</>
)
}

export default NotFound