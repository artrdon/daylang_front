import { useState, useEffect } from 'react'
import '../static/after_demo.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Type_offer from './offer_type';
import { useNavigate } from 'react-router-dom';


function AfterDemo({lang}) {
    const env = import.meta.env;
    const navigation = useNavigate();

    const getMoreInfo = () => {
        console.log("lol");
    }

    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
        queryKey: ['lol'], // Уникальный ключ запроса
        queryFn: async () => {
            const response = await axios.get(`${env.VITE_APIURL}/lol/`);
            return response.data; // Возвращаем только данные
        },
        // Опциональные параметры:
        retry: 2, // Количество попыток повтора при ошибке
        staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
        refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });

    if (loading1) return <div/>;
    if (error1) return <p>Error: {error1}</p>;

    return (
        <>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100svh", zIndex: 2000, position: "fixed"}} id='id_of_fuking_cookieiamnew'>
            <div className='do_bye_transparency_fon'/>
            <div className='after_demo_panel_main'>
                <div className='after_demo_panel_limit'>
                    Бесплатные попытки закончились 
                </div>
                <div className='after_demo_panel_limit'>
                    Вы можете продолжить после оплаты полного доступа
                </div>
                <div className='after_demo_panel_limit'>
                    <span>1</span> <img src="/src/static/img/coin.png" alt="internal_currency" className='after_demo_panel_show_currency' style={{position: "relative", margin: 0}}/> <span> = 1 ₽</span> 
                </div>
                <div className='after_demo_panel_overflow'>
                    {data1.map((data, index) => (
                        <Type_offer lang={lang} language_name={data.name} flag={data.destination} price={data.price} getMoreInfo={getMoreInfo} index={index} key={index} minutes={data.minutes}/>
                    ))}
                </div>
                <div className='after_demo_panel_downing_buttons'>
                    <button className='hello_main_button' onClick={() => navigation('/log')}>
                        Войти в аккаунт
                    </button>
                    <button className='hello_main_button' onClick={() => navigation('/reg')}>
                        Создать аккаунт
                    </button>
                </div>
                
            </div>
        </div>
        
        </>

    )
}

export default AfterDemo
