import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';


function NotFound() {

  const websocket = useWebSocket();
  const [lang, setLang] = useState(websocket.lang);

  document.querySelector("title").textContent = `404`;

axios.defaults.withCredentials = true;




return (
    <>
<div className="find_panel not_found_all_container_404_positing" >
    <div className='not_found_all_container_404'>
        <div className='not_found_font_404'>
            404
        </div>
    </div>
</div>
</>
)
}

export default NotFound