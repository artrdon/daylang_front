import arrLangOfferType from '/languages/offer_type.js'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../static/my_lessons.css'

function NowLessons({lang}) {
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
                    <div className='now_lessons_lesson_Link now_lessons_lesson_Link_now' key={data.id}>
                        <p># {data.id}</p>
                        <p className='my_lessons_name_of_lang'>{arrLangOfferType[lang][data.name_of_lang]}</p>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                            <span>
                                <p className='my_lessons_tarif'>{data.minutes} минут</p>
                            </span>
                            <span>
                                <p className='my_lessons_tarif'>{data.price} <img src="/src/static/img/coin.png" alt="internal_currency" className='internal_currency' style={{position: "relative"}}/></p>
                            </span>
                        </div>
                    </div>
                </Link>
            ))
            )
             : 
            null}


            {/*<div className='now_lessons_lesson_Link now_lessons_lesson_Link_now'>
                <p># 11</p>
                <p className='my_lessons_name_of_lang'>{arrLangOfferType[lang]['english']}</p>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <span>
                        <p className='my_lessons_tarif'>{10} минут</p>
                    </span>
                    <span>
                        <p className='my_lessons_tarif'>{50} ₽</p>
                    </span>
                </div>
            </div>
            */}
        </>
    )
}

export default NowLessons