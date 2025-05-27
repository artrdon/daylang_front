import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import arrLangOfferType from '/languages/offer_type.js'
import axios from 'axios';
import APIURL from '/api.js'

function Type_offer({ lang, language_name, flag }) {

  
    return (
            <>
            

    <Link to={`/${language_name}/`}>
      <div className="div_of_service" >
        <img src={flag} alt={arrLangOfferType[lang][language_name]} className='offer_type_flag_img'/>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className='offer_type_name_of_lang'>
            {arrLangOfferType[lang][language_name]}
          </p>
        </div>
        <img src="/src/static/img/bluefon.png" alt="fon" className="service_img" />
      </div>
    </Link>

        </>
    )
}

export default Type_offer