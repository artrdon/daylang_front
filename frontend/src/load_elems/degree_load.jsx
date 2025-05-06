import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'


function Degree_load() {

    const [count, setCount] = useState(0)

     function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

    var arrLang = {
      'English': {
          'main': "Main",
          'degree': 'Degree / Certificate',
          'feedback': 'Reviews',
          'offers': 'Offers',
      },
      'Русский': {
          'main': "Главная",
          'degree': 'Диплом / Сертификат',
          'feedback': 'Отзывы',
          'offers': 'Предложения',
      },
      'Srpski': {
          'main': "Glavni",
          'degree': 'Diploma / Sertificat',
          'feedback': 'Recenzije',
          'offers': 'Predlozi',
      },
      'Српски': {
          'main': "Главни",
          'degree': 'Диплома / Сертификат',
          'feedback': 'Рецензије',
          'offers': 'Предлози',
      },
      'Deutsch': {
          'main': "Wichtigsten",
          'degree': 'Abschluss / Zertifikat',
          'feedback': 'Gästebewertungen',
          'offers': 'Wohnen',
      },
      'Español': {
          'main': "Principal",
          'degree': 'Título / Certificado',
          'feedback': 'Reseñas',
          'offers': 'Ofertas',
      },
      'عربي': {
          'main': "الرئيسية",
          'degree': 'درجة / شهادة',
          'feedback': 'التعليقات',
          'offers': 'العروض',
      }

    }




    return (
        <>

<div className="find_panel">
  <div className="me_under_find">
    <img src="/src/static/img/nema.png" alt="" className="me_avatar"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
      </span>

    </div>

  </div>

<div id="main_page" style={{ display: "block" }} className='horizontal-scroll-container'>
  <div className="page_of_type horizontal-scroll-content">
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['main']}</span>
        </span>
      </div>
    </button>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button me_selected">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['degree']}</span>
        </span>
      </div>
    </button>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button ">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['feedback']}</span>
        </span>
      </div>
    </button>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['offers']}</span>
        </span>
      </div>
    </button>
  </div>
  <div className="me_description_offer" >
  </div>
</div>


</div>




        </>

  )
}

export default Degree_load
