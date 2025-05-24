import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import WSAPIURL from '/wsapi.js';
import APIURL from '/api.js';

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {

    const [groups, setGroup] = useState([]);
    const [lessons, setLessons] = useState(0)
    const [error12, setError12] = useState(null);
    const [loading12, setLoading12] = useState(true);
    const [data12, setData12] = useState([]);

    const [messNumb, setMessNumb] = useState(0);
    axios.defaults.withCredentials = true;


    useEffect(() => {
      const initCSRF = async () => {
        try {
          await axios.get(`${APIURL}/get_csrf/`, { withCredentials: true });
          console.log('CSRF token initialized');
        } catch (error) {
          console.error('CSRF init failed:', error);
        }
      };
      initCSRF();
  }, []);
    

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
      queryKey: [`future_lessons_offer`], // Уникальный ключ запроса
      queryFn: async () => {
        try {
          const response = await axios.get(`${APIURL}/bye/`);
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
            const response = await axios.get(`${APIURL}/userinfo/`);
            return response.data;
          } catch (err) {
            if (err.response?.status === 401){
              return "undefined";
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
      
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${APIURL}/getchatlist/`);
            if (response.data != null){
                let group = [];
                for (let i = 0; i < response.data[0].length; i++){
                    //setGroup((groups) => [...groups, response.data[0][i].id]);
                    group.unshift(response.data[0][i].id);
                }
                setGroup(group);
                //console.log(group);
            }
            setData12(response.data);
            setMessNumb(response.data[1]);
          } catch (err) {
            setError12(err.message);
          } finally {
            setLoading12(false);
          }
        };
        fetchData();
    }, []);

    
    useEffect(() => {
        const socket = new WebSocket(`${WSAPIURL}/ws/some_path/${groups.join(',')}/`);

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const dataMess = JSON.parse(event.data);
            //console.log(dataMess);
    
            if (dataMess.tip === "delete"){
                let i_read = true;
                for (let i = 0; dataMess.if_readed.length > i; i++){
                    if (dataMess.if_readed[i] === data.username){
                      i_read = false;
                    }
                }
                if (i_read)
                    setMessNumb(prev => prev - 1);
            }
    
            if (dataMess.tip === "send"){
              if (dataMess.sender !== data.username){
                setMessNumb(prev => prev + 1);
              }
                
            }
    
             //   document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
        };
    

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Очистка при размонтировании компонента
        return () => {
            socket.close();
        };
    }, [groups]);


 /*   if (error12) return (
      <WebSocketContext.Provider value={{ messNumb, lessons }}>
        {children}
      </WebSocketContext.Provider>
  );
*/
    return (
        <WebSocketContext.Provider value={{ messNumb, lessons }}>
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
