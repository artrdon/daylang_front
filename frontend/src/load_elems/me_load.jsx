import { useState } from 'react'
import arrLangMyProfil from '/languages/my_profil.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';



function My_load() {
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);

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
