import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import StandartOffer from '/src/elems/standart_offer.jsx'


function ImageWithFallback({ src, fallbackSrc, alt, }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className="offer_image"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }
  

function Vozmozno_vam() {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/creatingoffer/`);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  if (loading) return (<><div></div>

      </>);
  if (error) return <p>Error: {error}</p>;

    return (
            <>
            {data.map((dat) => (
                <StandartOffer username={dat.username} id={dat.id} name={dat.name} photo={dat.photo} review={dat.review} price={dat.price} key={dat.id}/>
      ))}
        </>
    )
}

export default Vozmozno_vam