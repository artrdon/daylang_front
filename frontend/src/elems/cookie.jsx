import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import CookiesLocal from '/languages/cookies.js'

function Cookie({lang}) {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const cookie = getCookie('cookie');
    const [cook, setCook] = useState(null);
   // let cook = null;


    useEffect(() => {
        if (cookie != undefined){
            setCook(true);
        }
        else {
            setCook(false);
        }

    }, []);
    
    

    const allowCookie = () => {
        document.cookie = `cookie=allowed; path=/;max-age=31556926`;
        setCook(false);
        document.getElementById('id_of_fuking_cookie').remove();
    }

    if (cook === null) return;


return (
    <>
    {!cook && <div className='cookie_main_div' id='id_of_fuking_cookie'>
        <div>{CookiesLocal[lang]['header']}</div>
        <div className='cookie_main_child_text' >{CookiesLocal[lang]['main_text']}<Link to={'/privacy/'} className='cookie_main_child_link' >{CookiesLocal[lang]['policy']}</Link>.</div>
        <button onClick={allowCookie} className='cookie_main_child_button' >{CookiesLocal[lang]['ok']}</button>
    </div>}
    </>

  )
}

export default Cookie
