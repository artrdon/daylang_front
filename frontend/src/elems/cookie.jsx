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
    let cook = null;

    if (cookie != undefined){
       // console.log(cookie);
        cook = true;
    }

    const allowCookie = () =>{
        document.cookie = `cookie=allowed; path=/;max-age=31556926`;
    }


return (
    <>

    {(() => {
        if (cook != true) {
            return (<>
                <div style={{ backgroundColor: "white", color: "black", width: "calc(100% - 60px)", height: 160, position: "absolute", bottom: 0, zIndex: 10000, margin: 10, padding: 20, borderRadius: 10}}>
                    <div>{CookiesLocal[lang]['header']}</div>
                    <div style={{ paddingBottom: 10 }}>{CookiesLocal[lang]['main_text']}<Link to={'/privacy/'} style={{color: "blue"}}>{CookiesLocal[lang]['policy']}</Link>.</div>
                    <button onClick={allowCookie} style={{ backgroundColor: "gray", width: "100%", height: 50, fontSize: 30, borderRadius: 10 }}>{CookiesLocal[lang]['ok']}</button>
                </div>
            </>);
        }
    })()}

    </>

  )
}

export default Cookie
