import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import SettingsForm from '/src/elems/settingfrom.jsx'
import Settings_load from '/src/load_elems/settings_load.jsx'
import axios from 'axios';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import arrLangNavigPanel from '../../languages/nav_panel.js';

function Settings() {

  const env = import.meta.env;
  const websocket = useWebSocket();
  const [lessons, setLessons] = useState(websocket.lessons);
  const [lang, setLang] = useState(websocket.lang);
  useEffect(() => {
    setLessons(websocket.lessons);
}, [websocket.lessons]);

   /* function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');*/

    


axios.defaults.withCredentials = true;


  
  const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
    queryKey: ['userinfo'], // Уникальный ключ запроса
    queryFn: async () => {
      try {
        const response = await axios.get(`${env.VITE_APIURL}/userinfo/`);
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

  
  const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
    queryKey: ['usersettings'], // Уникальный ключ запроса
    queryFn: async () => {
      try {
        const response = await axios.get(`${env.VITE_APIURL}/usersettings/`);
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
        const response = await axios.get(`${env.VITE_APIURL}/get_sessions/`);
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
      <AppLoad lang={lang} lessons={lessons}/>
      <Settings_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return (
      <>
      <AppLoad lang={lang} lessons={lessons}/>
      <Settings_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;

if (loading3) return (
  <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>
<Settings_load/>

</>

);
if (error3) return <p>Error: {error3}</p>;


  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLangNavigPanel[lang]['setting']}`;

    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>
<SettingsForm language={data1.language} name={data.first_name} surname={data.last_name} about_myself={data1.about_myself} photo={data.photo} sessions={data3} lang={lang}/>

</>

  )
}

export default Settings
