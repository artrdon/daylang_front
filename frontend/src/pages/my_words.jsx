import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import arrLangNavigPanel from '../../languages/nav_panel.js';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import vars from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';
import NotFoundSave from '../elems/not_found_save.jsx';


function MyWords() {

    const[page, setPage] = useState(0);
    const websocket = useWebSocket();
    const [lessons, setLessons] = useState(websocket.lessons);
    const [lang, setLang] = useState(websocket.lang);
    useEffect(() => {
        setLessons(websocket.lessons);
    }, [websocket.lessons]);
    
  
    const params = useParams();

    axios.defaults.withCredentials = true;


    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
        queryKey: ['userinfo'], // Уникальный ключ запроса
        queryFn: async () => {
            try {
                const response = await axios.get(`${vars['APIURL']}/userinfo/`);
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



    if (loading) return <AppLoad lang={lang}/>;
    if (error) return <p>Error: {error}</p>;
    document.querySelector("title").textContent = arrLangNavigPanel[lang]['my_words'];
        
    return (
        <>
        <App name={data.first_name} lastname={data.last_name} username={data.username} lang={lang} lessons={lessons} photo={data.photo} balance={data.balance}/>

        <div className="find_panel">

        
        <div className="tag_select_panel">
            <div className='find_page_div_over_offer_types'>
            <div className='find_page_div_of_offer_types'>

                <NotFoundSave iwant={"soon"} lang={lang}/>;

            </div>
            </div>
        </div>
        <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}/>
        </div>


        </>

    )
}

export default MyWords
