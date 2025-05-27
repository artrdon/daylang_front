import { useState } from 'react'
import arrLangMyProfil from '/languages/my_profil.js'


function My_load() {


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
    <img src="/src/static/img/nema.png" alt="" className="me_avatar"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
      </span>

    </div>

  </div>

<div id="main_page" style={{ display: "block" }} className='horizontal-scroll-container'>
  <div className="me_description_offer" >
  </div>
</div>


</div>


        </>

  )
}

export default My_load
