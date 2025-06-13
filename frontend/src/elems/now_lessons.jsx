import arrLangOfferType from '/languages/offer_type.js'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../static/my_lessons.css'

function NowLessons() {
    const env = import.meta.env;

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
        queryKey: ['now_lessons'], // Уникальный ключ запроса
        queryFn: async () => {
          const response = await axios.get(`${env.VITE_APIURL}/get_now_lessons/`);
          return response.data; // Возвращаем только данные
        },
        // Опциональные параметры:
        retry: 2, // Количество попыток повтора при ошибке
        staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
        refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
      });

    return (
            <>
            {data1 !== undefined ? 
            (data1.map((data, index) => (
                <Link to={`/ai_speak/${data.id}`} key={data.id}>
                    <div className='now_lessons_lesson_Link now_lessons_lesson_Link_now'>
                        <p># {data.id}</p>
                    </div>
                </Link>
            ))
            )
             : 
            null}
        </>
    )
}

export default NowLessons