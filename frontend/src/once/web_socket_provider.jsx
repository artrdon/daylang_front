import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLoad from '../load_elems/load_main_page';
import axios from 'axios';

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {

  const env = import.meta.env;
    const [lessons, setLessons] = useState(0)

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    useEffect(() => {     
      if (getCookie('theme') === "dark"){
        if (document.querySelector('body') != null)
        {
          document.querySelector('body').className = "dark_theme";
        }          
      }
      else if (getCookie('theme') === "light"){
        if (document.querySelector('body') != null)
        {
          document.querySelector('body').className = "light_theme";
        }          
      }
      else{
        const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");  
        if (systemSettingDark.matches) {  
          document.querySelector('body').className = "dark_theme";
        } 
        else{
          if (document.querySelector('body') != null)
          {
            document.querySelector('body').className = "light_theme";
          }
        }
           
      }
    }, []);
    
    

   useEffect(() => {
      const initCSRF = async () => {
        try {
          await axios.get(`${env.VITE_APIURL}/get_csrf/`);
         // console.log('CSRF token initialized');
        } catch (error) {
          console.error('CSRF init failed:', error);
        }
      };
      initCSRF();
  }, []);
    
 /*   if (window.trustedTypes?.createPolicy) {
      window.trustedTypes.createPolicy('defaults', {
        createHTML: (html) => {html.replace(/<iframe[^>]*onload\s*=[^>]+>/gi, ''); console.log("fuck u")},
        createScriptURL: url => {url.replace(/javascript:/gi, 'blocked:'); console.log("fuck u")}
      });
    }
  */

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
      queryKey: [`future_lessons_offer`], // Уникальный ключ запроса
      queryFn: async () => {
        try {
          const response = await axios.get(`${env.VITE_APIURL}/bye/`);
          return response.data;
        } catch {
          return 0;
        }
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
    useEffect(() => {
      const fetchData = async () => {
        if (data1) {
          if (Array.isArray(data1)) {
            setLessons(data1.length);
            //console.log(data1.length);
          }
        }
      };
      fetchData();
  }, [data1]);
  
    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
        queryKey: ['userinfo'], // Уникальный ключ запроса
        queryFn: async () => {
          try {
            const response = await axios.get(`${env.VITE_APIURL}/userinfo/`);
            return response.data;
          } catch (err) {
            if (err.response?.status === 401){
              return "unauthorised";
            }
            throw new Error(
              err.response?.data?.message || 
              'Не удалось загрузить данные пользователя'
            );
          }
        },
        // Опциональные параметры:
        retry: 2, // Количество попыток повтора при ошибке
        staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
        refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
      });
      
    
    const { data: data2, isLoading: loading2, isError: error2, error: errorDetails2 } = useQuery({
      queryKey: ['usersettings'], // Уникальный ключ запроса
      queryFn: async () => {
        try {
          const response = await axios.get(`${env.VITE_APIURL}/usersettings/`);
          return response.data; 
        } catch (err) {
          if (err.response?.status === 401){
            return "unauthorised";
          }
        }
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });


const [lang, setLang] = useState(getCookie("lang"));

    
useEffect(() => {     
    if (data2 !== "unauthorised" && data2 !== undefined){
      document.cookie = `lang=${data2.language}; path=/;max-age=31556926`;
      setLang(data2.language);
    }
    else{
      document.cookie = `lang=russian; path=/;max-age=31556926`;
      setLang("russian");
    }
}, [data2]);

const theme = getCookie("theme");

if (loading1 || loading || loading2) {
  return <MainLoad theme={theme}/>; // or return a loading spinner
}
    return (
        <WebSocketContext.Provider value={{ lessons, lang, theme }}>
          {children}
        </WebSocketContext.Provider>
    );

};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === null) {
      throw new Error(
        'useWebSocket must be used within a WebSocketProvider'
      );
    }
    return context;
  };

export default WebSocketProvider;
