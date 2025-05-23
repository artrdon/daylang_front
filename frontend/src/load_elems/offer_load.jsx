import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'


function Offer_load() {

    return (
      <>
      
      <div className="find_panel">
        <div className="div_of_foto_and_button" id="divoffb">
          <div className="foto_main" style={{display: "flex", justifyContent: "center", alignItem : "center"}}>
              <img alt="offer photo" src="/src/static/img/nema.png"/>
      
              
          </div>

          <button className="button_under_foto" id="divoffb_button">
            
          </button>
          {/*photoArray.length > (photoIndex + 1) && 
                <button className='offer_right_next_photo_button' onClick={nextPhoto}>
                  <img src="/src/static/img/next_photo.png" alt="next" style={{width: "100%", height: "100%"}}/>
                </button>}
              {photoIndex > 0 && 
                <button className='offer_left_next_photo_button' onClick={previosPhoto}>
                  <img src="/src/static/img/next_photo.png" alt="prev" style={{width: "100%", height: "100%"}}/>
                </button>*/}
      
          {/*data1[0].pisal === false ? (
                data1[0].itsme === false ? (
                <Link to={`/create_chat/${params.username}/${params.id}/`}>
                    <button className="button_under_foto" id="divoffb_button">
                      {arrLangOffer[lang]['message']}
                    </button>
                  </Link>
                      ) : (
                <Link to={`/update_offer/${params.username}/${params.id}/`}>
                    <button className="button_under_foto" id="divoffb_button">
                      {arrLangOffer[lang]['update']}
                    </button>
                  </Link>
                  )
                      ) : (
                data1[0].itsme === false ? (
                <Link to={`/message_list/${data1[0].chat_id}/`}>
                    <button className="button_under_foto" id="divoffb_button">
                      {arrLangOffer[lang]['message']}
                    </button>
                  </Link>
                      ) : (
                <Link to={`/update_offer/${params.username}/${params.id}/`}>
                    <button className="button_under_foto" id="divoffb_button">
                      {arrLangOffer[lang]['update']}
                    </button>
                  </Link>
                  )
          )*/}
      
        </div>
        <div className="review_div">
          <div className="margin_of_offer">
            <h1>
              <span className="offer_page_name"></span>
            </h1>
            <div className="offer_price_div">
              <div className="offer_price">
                
              </div>
              <button className="offer_save_to_fav_button">
      
              </button>
      
            </div>
          </div>
          <div className="div_description" id="phone">
            
          </div>
          <div className="margin_of_offer">
            <div>
            </div>
          </div>
        </div>
        <div className="div_description" id="comp">
          
        </div>
      
        <div className="offer_page_div_of_offer_div">
      
          <div className="offer_div">
              
              
          </div>
        </div>
      </div>
         
      </>
      
  )
}

export default Offer_load
