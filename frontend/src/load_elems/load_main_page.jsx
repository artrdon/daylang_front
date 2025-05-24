import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import arrLangMyProfil from '/languages/my_profil.js'
import Message from '/src/pages/message.jsx'


function MainLoad({theme}) {


    return (
    <>
        <div style={{backgroundColor: theme === "dark" ? "#191919" : "#ebebeb", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{display: "block"}}>
                <img src="/src/static/img/dj.png" alt="dj" className='main_load_the_most_first_img' style={{filter: theme === "dark" ? "brightness(100%)" : "brightness(0%)"}}/>
                <h1 className='main_load_the_most_first_text' style={{color: theme === "dark" ? "white" : "black"}}>DayLang</h1>
            </div>
            
        </div>
    </>

  )
}

export default MainLoad
