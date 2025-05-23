import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import arrLangMyProfil from '/languages/my_profil.js'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import My_load from '/src/load_elems/me_load.jsx'

import axios from 'axios';


function Me_pup_load() {

    let params = useParams();

    document.querySelector("title").textContent = "Me";


axios.defaults.withCredentials = true;


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

    return (
        <>

  <div className="find_panel">
  <div className="me_under_find">
    <img src="/src/static/img/nema.png" alt="nema" className="me_avatar"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
      </span>

  </div>

<div id="main_page" style={{ display: "block" }} className='horizontal-scroll-container'>
  <div className="page_of_type horizontal-scroll-content">
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button me_selected" >
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLangMyProfil[lang]['main']}</span>
        </span>
      </div>
    </button>

    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLangMyProfil[lang]['feedback']}</span>
        </span>
      </div>
    </button>
    </div>
  </div>
  <div className="me_description_offer" >
  </div>
</div>


</div>


</>

  )
}

export default Me_pup_load
