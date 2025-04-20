import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'


function Docks() {

    const [count, setCount] = useState(0)


return (
    <>

    <div style={{ color: "white", width: "calc(100% - 60px)", height: 30, position: "absolute", bottom: 0, zIndex: 1000, margin: 10, padding: 20}}>
        <p><a href={'/src/static/docks/pryvacy.pdf'} className='app_policy_text_color'>Политика конфиденциальности</a></p>
    </div>

    </>

  )
}

export default Docks
