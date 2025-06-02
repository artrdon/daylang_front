import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import vars from '/api.js'


function ImageWithFallback({ src, fallbackSrc, alt, }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className="finded_img"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }
  

function DoBye({ ref, setBye, lang }) {

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
                  <p>Выберите сумму пополнения</p>
                </div>
                <button className={`do_bye_ready_offer_to_bye${tarif === "100" ? ' do_bye_offer_to_bye_selected' : ''}`} name='100' onClick={setSelectedTarif}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}} className='do_bye_small_titles'>
                    <span >
                      <p>100</p>
                    </span>
                    <span >
                      <p>рублей</p>
                    </span>
                  </div>
                </button>

                <button className={`do_bye_ready_offer_to_bye${tarif === "300" ? ' do_bye_offer_to_bye_selected' : ''}`} name='300' onClick={setSelectedTarif}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}} className='do_bye_small_titles'>
                    <span >
                      <p>300</p>
                    </span>
                    <span >
                      <p>рублей</p>
                    </span>
                  </div>
                </button>

                <button className={`do_bye_ready_offer_to_bye${tarif === "500" ? ' do_bye_offer_to_bye_selected' : ''}`} name='500' onClick={setSelectedTarif}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}} className='do_bye_small_titles'>
                    <span >
                      <p>500</p>
                    </span>
                    <span >
                      <p>рублей</p>
                    </span>
                  </div>
                </button>
              </div>
              {tarif === '' ? null : (<>
                <button className='do_bye_bye_button' onClick={handleSubmit}>
                  пополнить на {tarif} рублей
                </button>
              </>)}
              
            </div>
            

          </div>

    </>

  )
}

export default DoBye
