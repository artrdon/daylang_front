import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'

function Create_offer_load({arrLang, lang}) {


    return (
      <div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p className="crt_offer_name_of_fields">
              {arrLang[lang]['create_offer']}
            </p>
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['name']}</span>
              <div name="name" type="text" className="input_field_name"/>
              <p className={`crt_offer_font_size_of_min_length`}></p>
            
            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['description']}</span>
              <div name="description" id="description" className="input_field_description"/>
              <p className={`crt_offer_font_size_of_min_length`}></p>
            
            </div>

            <div className="crt_offer_name_of_fields">
              <span>Language</span>
              <div id="languages" className="setting_language_selector" name="language">
                
              </div>
              
            </div>


            <div className="crt_offer_name_of_fields">
              <span>Format</span>
              <div id="formate" className="setting_language_selector" name="format">
                
              </div>
              
            </div>

            <div className="crt_offer_name_of_fields">
              <span>Target</span>  
              <div id="target" className="setting_language_selector" name="target">
                
              </div>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>Age</span>              
              <div id="age" className="setting_language_selector" name="age">
                
              </div>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>I have microphone</span>
              <div id="microphone" className="setting_language_selector" name="microphone">
                
              </div>

            </div>
            
            <div className="crt_offer_save_button">
              
            </div>

          </div>
        </div>
      </div>
  </div>
</div>

  )
}

export default Create_offer_load
