import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import arrLangOfferType from '/languages/offer_type.js'
import { useQuery } from '@tanstack/react-query';
import vars from '/api.js'



function MoreInfoFromFind({ ref, setBye, lang, idOfInfo, moreinfo }) {

    const [data, setData] = useState(null);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${vars['APIURL']}/bye/`, {summa: tarif}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);
            if (response.status === 200){
                location.reload();
            }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }

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
                    <div>
                    <h3>{moreinfo[idOfInfo].name}</h3>
                    <p>Направление: {moreinfo[idOfInfo].destination}</p>
                    <p>Цена: {moreinfo[idOfInfo].price}</p>
                    </div>
                )}
                </div>
            </div>
            

          </div>

    </>

  )
}

export default MoreInfoFromFind
