import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import arrLangSettings from '/languages/settings.js'
import Message from '/src/pages/message.jsx'


function Settings_load() {

    const [count, setCount] = useState(0)
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

      
    return (
        <>

      <div  className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
     <form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p
              style={{
                width: 570,
                margin: 40,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 30
              }}
            >
              {arrLangSettings[lang]['main']}
            </p>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLangSettings[lang]['language']}</span>
            </div>
            <div id="languages" className="setting_language_selector">
            </div>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLangSettings[lang]['name']}</span>
            </div>
            <div className="input_field_name">
            </div>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLangSettings[lang]['last_name']}</span>
            </div>
            <div className="input_field_name"></div>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLangSettings[lang]['about_myself']}</span>
            </div>
            <div
              className="input_field_description"
            ></div>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLangSettings[lang]['load_photo']}</span>
            </div>
            <input
              accept="image/png"
              id="icon404873"
              name="icon"
              type="file"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "relative",
                display: "inline-block",
                top: 18,
                left: 250
              }}
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 50,
                fontSize: 20,
                height: 500
              }}
            >
              <img
                alt=""
                style={{
                  width: 300,
                  height: 300,
                  position: "relative",
                  top: 50,
                  display: "block",
                  borderRadius: "50%"
                }}
                src="/src/static/img/nema.png"
              />
            </div>
            <p
              style={{
                width: 570,
                margin: 40,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 30
              }}
            >
              {arrLangSettings[lang]['degree']}
            </p>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLangSettings[lang]['about_my_degree']}</span>
            </div>
            <div
              className="input_field_description"
              style={{ height: 200 }}
            ></div>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLangSettings[lang]['load_photo_of_degree']}</span>
            </div>
            <input
              accept="image/png"
              id="icon404873"
              name="icon"
              type="file"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "relative",
                display: "inline-block",
                top: 18,
                left: 350
              }}
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                marginTop: 50,
                fontSize: 20,
                height: 700
              }}
            >
              <img
                alt=""
                style={{
                  width: 500,
                  height: "auto",
                  position: "relative",
                  top: 0,
                  display: "block"
                }}
                src="/src/static/img/ielts.jpg"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                marginTop: 50
              }}
            >
              <button
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: "gray",
                  margin: 20,
                  fontSize: 30
                }}
              >
                {arrLangSettings[lang]['exit']}
              </button>

              <button
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: "gray",
                  margin: 20,
                  fontSize: 30
                }}
                type="submit"
              >
                {arrLangSettings[lang]['save']}
              </button>

            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>




        </>

  )
}

export default Settings_load
