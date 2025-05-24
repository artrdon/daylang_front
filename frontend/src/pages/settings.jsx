import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import SettingsForm from '/src/elems/settingfrom.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import Settings_load from '/src/load_elems/settings_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';

function Settings() {

  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  useEffect(() => {
    setMessNumb(websocket.messNumb);
    setLessons(websocket.lessons);
}, [websocket.messNumb, websocket.lessons]);

   /* function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');*/

    document.querySelector("title").textContent = "Settings";


axios.defaults.withCredentials = true;


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

  
  const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
    queryKey: ['usersettings'], // Уникальный ключ запроса
    queryFn: async () => {
      try {
        const response = await axios.get(`${APIURL}/usersettings/`);
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

  const { data: data2, isLoading: loading2, isError: error2, error: errorDetails2 } = useQuery({
    queryKey: ['degree_load'], // Уникальный ключ запроса
    queryFn: async () => {
      try {
        const response = await axios.get(`${APIURL}/degree_load/`);
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

  
  const { data: data3, isLoading: loading3, isError: error3, error: errorDetails3 } = useQuery({
    queryKey: ['my_sessions'], // Уникальный ключ запроса
    queryFn: async () => {
      try {
        const response = await axios.get(`${APIURL}/get_sessions/`);
        return response.data;
      } catch (err) {
        if (err.response?.status === 401){
          window.location.href = '/log';
          return;
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
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Settings_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return (
      <>
      <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
      <Settings_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;

  if (loading2) return (
    <>
    <AppLoad lang={lang} messNumb={messNumb} lessons={lessons}/>
    <Settings_load/>
</>

);
if (error2) return <p>Error: {error2}</p>;

if (loading3) return (
  <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} if_teach={data.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data.photo} balance={data.balance}/>
<SettingsForm language={data1.language} name={data.first_name} surname={data.last_name} about_myself={data1.about_myself} about_my_degree={data1.about_my_degree} if_teacher={data.i_am_teacher} photo={data.photo} degree_photo={data2}/>

</>

);
if (error3) return <p>Error: {error3}</p>;


  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | Настройки`;

    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} if_teach={data.i_am_teacher} mess_count={messNumb} lessons={lessons} photo={data.photo} balance={data.balance}/>
<SettingsForm language={data1.language} name={data.first_name} surname={data.last_name} about_myself={data1.about_myself} about_my_degree={data1.about_my_degree} if_teacher={data.i_am_teacher} photo={data.photo} degree_photo={data2} sessions={data3} work_day_begin_int={data1.work_day_begin_int} work_day_end_int={data1.work_day_end_int}/>

</>

  )
}

export default Settings
