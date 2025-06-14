import { useState } from 'react'
import axios from 'axios';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import { Link } from 'react-router';


function Forbidden() {

  const websocket = useWebSocket();
  const [lang, setLang] = useState(websocket.lang);

  document.querySelector("title").textContent = `403`;

axios.defaults.withCredentials = true;



return (
    <>
<div className="not_found_all_container_404_positing" >
    <div className='not_found_all_container_404'>
        <div className='not_found_font_404'>
            <p>403</p>
            <Link to={'/'}>
              <div style={{display: "flex", justifyContent: 'center'}}>
                <div className='notfound_link_for_404'>
                  У вас нет доступа к этой странице
                </div>
              </div>
            </Link>
        </div>
    </div>
</div>
</>
)
}

export default Forbidden