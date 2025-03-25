import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'


function Add_button() {

    const [count, setCount] = useState(0)


return (
    <>
        <Link to="/create_offer/">
            <div className="offer_add_button">
                <div className="offer_plus_container">
                    <div className="offer_plus">
                        +
                    </div>
                </div>
            </div>
        </Link>
    </>

  )
}

export default Add_button
