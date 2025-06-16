import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import arrLangOfferType from '/languages/offer_type.js'
import { Link } from 'react-router-dom'


function MoreInfoFromFind({ ref, setBye, lang, idOfInfo, moreinfo }) {

    const [requestWasSended, setRequestWasSended] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
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
    const [error, setError] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked)
        {
            alert("Вы должны согласиться с офертой");
            return;
        }
        try {
            setRequestWasSended(true);
            const response = await axios.post(`${env.VITE_APIURL}/bye_access/`, {language: moreinfo[idOfInfo].name, price: moreinfo[idOfInfo].price}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
           // console.log('Response:', response.data);
            if (response.data === "not_enough_money"){
                alert("Не достаточно средств. Пополните баланс.");
                setError(1);
                return;
            }
            if (response.status === 200){
                window.open(`${window.location.origin}${response.data}`, '_blank');
            }
            

        } catch (error) {
            if (error.response?.status === 401){
                window.location.href = '/log';
                return;
            }
            console.error('There was an error!', error.response?.data);
        }
        setRequestWasSended(false);
    };

    const topUp = () => {
        setBye(false);
    };
    
return ( 
    <>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100svh"}}>
            <div className='do_bye_transparency_fon' onClick={setByeFunc} />
            <div className='do_bye_panel' ref={ref}>
                <div className='do_bye_overflow_of_ready_offers'>
                <div className='do_bye_ready_offers_title'>
                  <p>{arrLangOfferType[lang][`${moreinfo[idOfInfo].name}`]}</p>
                </div>
                {moreinfo[idOfInfo] && (
                    <div className='more_into_to_bye_main_part'>
                        <p>{moreinfo[idOfInfo].description}</p>
                    </div>
                )}
                <div className='more_into_to_bye_main_part'>
                    <p>Лимит запросов: {moreinfo[idOfInfo].count_request}</p>
                </div>
                </div>
                {error === 0 && 
                <>
                    <div className='do_bye_oferta_agreement'>
                    <input
                        className='reg_log_agree_with_privacy_checkbox'
                        type="checkbox"
                        name='checkbox'
                        id='i_agree'
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="i_agree" className='reg_log_agree_with_privacy'><span> я согласен(на) с<Link to={'/public_oferta/'} className='log_reg_other_links' ><span>офертой</span></Link></span></label>    
                    </div>

                    {!requestWasSended && 
                        <>
                            <button className='do_bye_bye_button' onClick={handleSubmit}>
                                Перейти за {moreinfo[idOfInfo].price} <img src="/src/static/img/icon.svg" alt="internal_currency" className='internal_currency'/>
                            </button>
                        </>
                    }
                    
                    {requestWasSended && 
                        <>
                            <div className='do_bye_bye_button'>
                                
                            </div>
                        </>
                    }
                    
                </>}
                {error === 1 && <button className='do_bye_bye_button' onClick={topUp}>
                  Пополнить
                </button>}
            </div>
          </div>

    </>

  )
}

export default MoreInfoFromFind
