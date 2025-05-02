import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'


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



function FindedAndSavedOffers({chel, id, name, photo, isFav, review, price, description}) {



return (
    <>
        <Link to={`/${chel}/offer/${id}/`} key={id} target='_blank'>
            <div className="offer_of_lang_finded">
            <div className='first_sloj'>
                <h1 className="finded_name">{name}</h1>
                <ImageWithFallback src={photo} alt="offer photo" fallbackSrc="/src/static/img/nema.png"/>
                {isFav === false ? (
                    <img src="/src/static/img/srce.png" alt="srce" className="src_img" />
                ) : (
                    <img src="/src/static/img/srcered.png" alt="srcred" className="src_img" />
                )}
                <div className="finded_review">
                    <img src="/src/static/img/11.png" alt="11" className="img_review" />
                    <p className="review_text"> {review}</p>
                </div>
                <div className="part_with_text">
                <p className="finded_price">{price} ₽</p>
                {/*<p className="finded_online_status">online</p>*/}
                
                <div className="description_lol">
                    {description}
                </div>
                </div>
            </div>
            </div>
        </Link>
    </>

  )
}

export default FindedAndSavedOffers
