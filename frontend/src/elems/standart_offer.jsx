import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'


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
  


function StandartOffer({username, id, name, photo, review, price}) {



return (
    <>
        <Link to={`/${username}/offer/${id}/`} key={id} target='_blank'>
            <div className="offer_of_lang" id={id}>
                <div className="first_sloj">
                <ImageWithFallback src={photo} alt="offer photo" fallbackSrc="/src/static/img/nema.png"/>
                <div className="feedback_review_down_block">
                    <p className="name_of_offer" >
                    {name}
                    </p>
                    <div className="block_of_price_and_status">
                    <p className="price_and_status feedback_review_price_text">
                        {price} ₽
                    </p>
                    </div>
                    <div className="block_of_review">
                    <img src="/src/static/img/11.png" alt="img_of_review_score" className="img_of_review" />
                    <p className="header_of_review">{review}</p>
                    </div>
                </div>
                </div>
            </div>
        </Link>
    </>

  )
}

export default StandartOffer
