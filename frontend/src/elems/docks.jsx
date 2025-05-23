import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import arrLangNavigPanel from '/languages/nav_panel.js'


function Docks({lang}) {


return (
    <>

    <div style={{ color: "white", width: "calc(100% - 60px)", height: 30, position: "absolute", bottom: 0, zIndex: 1000, margin: 10, padding: 20}}>
        <p><a href={'/src/static/docks/pryvacy.pdf'} className='app_policy_text_color'>{arrLangNavigPanel[lang]['privacy_policy']}</a></p>
    </div>

    </>

  )
}

export default Docks
