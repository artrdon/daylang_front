import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import arrLangOfferType from '/languages/offer_type.js'
import { Link } from 'react-router-dom'
import vars from '/api.js'



function MoreInfoFromFind({ ref, setBye, lang, idOfInfo, moreinfo }) {

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
    const [error, setError] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked)
        {
            return;
        }
        try {
            const response = await axios.post(`${vars['APIURL']}/bye_access/`, {language: moreinfo[idOfInfo].name, price: moreinfo[idOfInfo].price}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);
            if (response.status === 200){
                window.open(`${window.location.origin}${response.data}`, '_blank')
            }
            

        } catch (error) {
            if (error.response?.status === 401){
                window.location.href = '/log';
                return;
            }
            console.error('There was an error!', error.response?.data);
        }

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
                    <label htmlFor="i_agree" className='reg_log_agree_with_privacy'><span> я согласен(на) с</span><Link to={'/public_oferta/'} className='log_reg_other_links' ><span>офертой</span></Link></label>    
                    </div>

                    <button className='do_bye_bye_button' onClick={handleSubmit}>
                        Перейти за {moreinfo[idOfInfo].price} рублей
                    </button>

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
