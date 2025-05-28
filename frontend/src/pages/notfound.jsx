import { useState, useEffect } from 'react'
import axios from 'axios';
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
            <p>404</p>
            <Link to={'/'}>
              main page
            </Link>
        </div>
    </div>
</div>
</>
)
}

export default NotFound