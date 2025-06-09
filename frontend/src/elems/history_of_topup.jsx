import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import arrLangNavigPanel from '../../languages/nav_panel';
import { useQuery } from '@tanstack/react-query';


function HistoryOfTopUpComp({ ref, setBye, lang }) {

    const [tarif, setTarif] = useState('');
    const setByeFunc = () =>{
      setBye(false);
    }
  
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');
    const params = useParams();
    const env = import.meta.env;
    const setSelectedTarif = (e) => {
      setTarif(e.currentTarget.name);
    }
    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
        queryKey: ['transactions_history'], // Уникальный ключ запроса
        queryFn: async () => {
          const response = await axios.get(`${env.VITE_APIURL}/bye/`);
          return response.data; // Возвращаем только данные
        },
        // Опциональные параметры:
        retry: 2, // Количество попыток повтора при ошибке
        staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
        refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
      });
  
      if (loading) return (<>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100svh"}}>
            <div className='do_bye_transparency_fon' onClick={setByeFunc} />
            <div className='do_bye_panel' ref={ref}>
                <div className='do_bye_overflow_of_ready_offers'>
                
                </div>
            </div>
            

          </div>
      </>);
      if (error) return <p>Error: {error}</p>;
  console.log(data);
    
return ( 
    <>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100svh"}}>
            <div className='do_bye_transparency_fon' onClick={setByeFunc} />
            <div className='do_bye_panel' ref={ref}>
                <div className='do_bye_overflow_of_ready_offers'>
                <div className='do_bye_ready_offers_title'>
                  <p>{arrLangNavigPanel[lang]['history_of_operations']}</p>
                </div>
                {data.map((data, index) => (
                    <button className={`do_bye_ready_offer_to_bye`} key={index}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}} className='do_bye_small_titles'>
                        <span >
                           <p>{data.isBye === true ? "-" : "+"} {data.price} {data.currency}</p>
                        </span>
                        <span >
                            <p>{data.date} {data.time}</p>
                        </span>
                        </div>
                    </button>
                ))}
                </div>
            <button className='do_bye_bye_button' onClick={setByeFunc}>
                Закрыть
            </button>
            </div>
          </div>

    </>

  )
}

export default HistoryOfTopUpComp
