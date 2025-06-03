import { useState } from 'react'
import arrLangSettings from '/languages/settings.js'
import { useWebSocket } from '../once/web_socket_provider.jsx';


function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="crt_offer_photo"
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={{ borderRadius: "50%" }}
      id='avatarka'
    />
  );
}



function Settings_load() {

  const websocket = useWebSocket();
  const [lang, setLang] = useState(websocket.lang);

      
    return (
      <>
<div className="ctr_offer_find_panel">
<div style={{ display: "flex", justifyContent: "center" }}>
   <div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="crt_offer_gray_thing">
        <div className="crt_offer_blank">
          <p className="crt_offer_name_of_fields">
            {arrLangSettings[lang]['main']}
          </p>
          <div className="crt_offer_name_of_fields">
            <span>{arrLangSettings[lang]['language']}</span>
            <div id="languages" className="setting_language_selector" name="language">
            </div>
            
          </div>
          
          <div className="crt_offer_name_of_fields">
            <span>{arrLangSettings[lang]['name']}</span>
            <div
              name="name"
              type="text"
              className="input_field_name"
            />

          </div>
          
          <div className="crt_offer_name_of_fields">
            <span>{arrLangSettings[lang]['last_name']}</span>
            <div
              type="text"
              name="surname"
              className="input_field_name"
            />
          </div>
          
          <div className="crt_offer_name_of_fields">
            <span>{arrLangSettings[lang]['about_myself']}</span>
            <div
              name="about_myself"
              id=""
              className="input_field_description"
            />
          </div>
          
          <div className="crt_offer_name_of_fields">
            <span>{arrLangSettings[lang]['load_photo']}</span>
          </div>
          
          <div className="crt_offer_photo_div">
            <ImageWithFallback alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
          </div>


            <div className="crt_offer_name_of_fields">
              <span>Sessions</span>
              <div className="input_field_description">
                
                

              </div>
            </div>

            <button
              className='crt_offer_save_button'
              
            >
              {arrLangSettings[lang]['save']}
            </button>

            <button
              className='crt_offer_save_button'
              
            >
              {arrLangSettings[lang]['exit']}
            </button>

        </div>
      </div>
    </div>
  </div>
</div>
</div>




</>

)
}

export default Settings_load
