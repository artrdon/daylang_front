import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';


function DoBye({ ref, setBye, lang }) {

    const env = import.meta.env;
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
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

  
    const setSelectedTarif = (e) => {
      setTarif(e.currentTarget.name);
    }
    const { data: data1, isLoading: loading1, isError: error1, error: errorDetails1 } = useQuery({
      queryKey: ['get_top_up_tarifs'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${env.VITE_APIURL}/get_top_up_tarifs/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked)
        {
          alert("Вы должны согласиться с офертой");
          return;
        }
        try {
            const response = await axios.post(`${env.VITE_APIURL}/bye/`, {summa: tarif}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
           // console.log('Response:', response.data);
            if (response.status === 200){
              location.replace(response.data['confirmation_url']);
            }

        } catch (error) {
            if (error.response?.status === 401){
              navigate('/log');
              return "unauthorised";  
            }
            console.error('There was an error!', error.response?.data);
        }

    };

    if (loading1) {
      return (<>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100svh"}}>
            <div className='do_bye_transparency_fon' onClick={setByeFunc} />
            <div className='do_bye_panel' ref={ref}>
              <div className='do_bye_ready_offers_title'>
                <p>Выберите сумму пополнения</p>
              </div>              
            </div>
          </div>
      </>);
    }
    if (error1) return <p>Error: {error1}</p>;

return ( 
    <>
    
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100svh"}}>
            <div className='do_bye_transparency_fon' onClick={setByeFunc} />
            <div className='do_bye_panel' ref={ref}>
              <div className='do_bye_ready_offers_title'>
                <p>Выберите количество</p>
              </div>
              <div className='do_bye_overflow_of_ready_offers'>
                {data1.map((data, index) => (
                  <button className={`do_bye_ready_offer_to_bye${tarif === `${data.summa}` ? ' do_bye_offer_to_bye_selected' : ''}`} name={data.summa} onClick={setSelectedTarif} key={`top_up_tarif_${index}`}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}} className='do_bye_small_titles'>
                      <span >
                        <p>{data.summa}  <img src="/src/static/img/coin.png" alt="internal_currency" className='internal_currency_mini'/></p>
                      </span>
                      <span >
                        <p>{data.price} рублей</p>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {tarif === '' ? null : (<>
                <div className='do_bye_oferta_agreement'>
                  <input
                    className='reg_log_agree_with_privacy_checkbox'
                    type="checkbox"
                    name='checkbox'
                    id='i_agree'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label htmlFor="i_agree" className='reg_log_agree_with_privacy'><span> я согласен(на) с</span><Link to={'/public_oferta/'} className='log_reg_other_links' ><span>офертой</span></Link></label>    
                </div>
                <button className='do_bye_bye_button' onClick={handleSubmit}>
                  Купить за {tarif} рублей
                </button>
              </>)}
              
            </div>
            

          </div>

    </>

  )
}

export default DoBye
