import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import Calendar from 'react-calendar';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function ImageWithFallback({ src, fallbackSrc, alt, }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className="finded_img"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }
  

function DoBye({setdate, date, removeDataSetter, am_teach, name_of_offer, price, photo, review_score, description }) {
    let currentDate = new Date();
    let year = currentDate.getFullYear();

    let month = currentDate.getMonth() + 1;
    if (month < 10){
      month = "0" + String(month);
    }

    let reg_month = currentDate.getMonth() + 2;
    if (reg_month < 10){
      reg_month = "0" + String(reg_month);
    }

    let day = currentDate.getDate() + 1;
    if (day < 10){
      day = "0" + String(day);
    }
    console.log(`${year}-${month}-${day}`);

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
            const response = await axios.post(`${APIURL}/bye/`, data, {
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
          return (<> 
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
            <div style={{ position: "absolute", zIndex: 1000, background: "black", width: "100vw", height: "100vh", opacity: "30%" }}  onClick={removeDataSetter}>
            </div>
            <form>
                <div style={{ position: "relative", zIndex: 1001, margin: "auto", display: "block", width: 500, height: "auto", backgroundColor: "rgb(46, 46, 46)", padding: 50, borderRadius: 10}}>
                    <div style={{width: "calc(100% - 40px)", height: 150, margin: 20, borderRadius: 20, border: "1px solid gray"}}>
                        <h1 className="message_finded_name">{name_of_offer}</h1>
                        <ImageWithFallback src={photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
                        <div className="part_with_text">
                            <p className="message_finded_price" style={{color: "rgb(0, 184, 0)" }}>{price} ₽</p>
                            <div className="message_finded_review">
                              <img src="/src/static/img/11.png" alt="" className="img_review" />
                              <p className="review_text">{review_score}</p>
                            </div>
                            <p className="message_description_lol">
                                {description}
                            </p>
                          </div>
                    </div>
                    <input type="date" min={`${year}-${month}-${day}`} max={`${year}-${reg_month}-${day}`} name="" id="" style={{outline: "none", width: "auto", fontSize: 30, display: "block", borderRadius: 5, border: 0, margin: 20}}/>
                    <input type="time" name="" id="" style={{outline: "none", width: "auto", fontSize: 30, display: "block", borderRadius: 5, border: 0, margin: 20}}/>
                    <button type='submit' style={{outline: "none", width: "calc(100% - 40px)", fontSize: 30, display: "block", borderRadius: 5, border: 0, margin: 20, padding: 10}}>Pay {price} ₽</button>
                </div>
            </form>
            
          </div>
           
                    
          </>)
        }
      })()}

    </>

  )
}

export default DoBye
