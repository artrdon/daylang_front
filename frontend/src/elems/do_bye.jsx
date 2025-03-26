import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import Calendar from 'react-calendar';


function DoBye({setdate, date, removeDataSetter, am_teach }) {

    const [count, setCount] = useState(0)

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://api.daylang.ru/bye/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            /*console.log('Response:', response.data);
            if (response.data === "serializer.data"){
                location.reload();
            }*/

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }

    };



return (
    <>

    {(() => {
        if (!am_teach) {
          return (<> <div style={{ position: "absolute", zIndex: 1000, background: "black", width: "100vw", height: "100vh", opacity: "30%" }} onClick={removeDataSetter}>
                    </div>
                    <div style={{ position: "absolute", zIndex: 1000, margin: "auto", display: "block" }}>
                            <Calendar onChange={setdate} value={date} />
                            <input type="time" />
                    </div> </>)
        }
      })()}

    </>

  )
}

export default DoBye
