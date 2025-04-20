import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


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
                <a href={`/${dat.chel}/offer/${dat.id}/`} key={dat.id} target='_blank'>
                <div className="offer_of_lang" id={dat.id}>
                    <div className="first_sloj">
                    <ImageWithFallback src={dat.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
                    <div className="feedback_review_down_block">
                        <h1 className="name_of_offer" >
                        {dat.name}
                        </h1>
                        <div className="block_of_price_and_status">
                        <p className="price_and_status feedback_review_price_text"  >
                            {dat.price} ₽
                        </p>
                        </div>
                        <div className="block_of_review">
                        <img src="/src/static/img/11.png" alt="" className="img_of_review" />
                        <h1 className="header_of_review"> {dat.review}</h1>
                        </div>
                    </div>
                    </div>
                </div>
                </a>
      ))}
        </>
    )
}

export default Vozmozno_vam