import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import DeepSearchLangArr from '../../languages/deep_search';
import { useParams } from "react-router";
import Message from '/src/pages/message.jsx'
import Calendar from 'react-calendar';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function DeepSearchComp({closeSearch, ref, price_min, price_max, format, target, age, microphone, lang}) {

  const params = useParams();
  

  const [data2, setData2] = useState({price_min: price_min, price_max: price_max, format: format, target: target, age: age, microphone: microphone});
  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
};

return ( 
    <>
<div className="deep_search_component_main_div">
    <div className="deep_search_component_close_search" onClick={closeSearch}></div>
    <div className="deep_search_component_form" ref={ref}>
        <div className="deep_search_component_form_title">
            <p id="form-title" className="deep_search_component_upper_title">{DeepSearchLangArr[lang]['search']}</p>
        </div>
        <div className="deep_search_component_div_under_title">
            <div className="deep_search_component_div_under_title_fields">
              <div style={{height: "calc(100% - 70px)", }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="crt_offer_blank">
                          <div className="finded_crt_offer_name_of_fields">
                            <span>{DeepSearchLangArr[lang]['format']}</span>
                          </div>
                          <select id="formate" className="finded_setting_language_selector" onChange={handleChange} value={data2.format} name="format">
                            <option id="ind" value="individual">{DeepSearchLangArr[lang]['individual']}</option>
                            <option id="gro" value="group">{DeepSearchLangArr[lang]['group']}</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>{DeepSearchLangArr[lang]['goal']}</span>
                          </div>
                          <select id="target" className="finded_setting_language_selector" onChange={handleChange} value={data2.target} name="target">
                            <option id="exam" value="exam">{DeepSearchLangArr[lang]['exam']}</option>
                            <option id="selfdev" value="self_development">{DeepSearchLangArr[lang]['self_dev']}</option>
                            <option id="trav" value="travelling">{DeepSearchLangArr[lang]['travelling']}</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>{DeepSearchLangArr[lang]['age']}</span>
                          </div>
                          <select id="age" className="finded_setting_language_selector" onChange={handleChange} value={data2.age} name="age">
                            <option id="5-12" value="5-12">5-12</option>
                            <option id="13-17" value="13-17">13-17</option>
                            <option id="18-30" value="18-30">18-30</option>
                            <option id="31+" value="31+">31+</option>
                            <option id="all" value="all">{DeepSearchLangArr[lang]['all']}</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>{DeepSearchLangArr[lang]['i_have_microphone']}</span>
                          </div>
                          <select id="microphone" className="finded_setting_language_selector" onChange={handleChange} value={data2.microphone} name="microphone">
                            <option id="yes" value="yes">{DeepSearchLangArr[lang]['yes']}</option>
                            <option id="no" value="no">{DeepSearchLangArr[lang]['no']}</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>{DeepSearchLangArr[lang]['min_price']}</span>
                          </div>
                          <input maxLength={30} placeholder={DeepSearchLangArr[lang]['min_price']} name="price_min" type="number" min="0" max="1000000" className="finded_input_field_name" onChange={handleChange} value={data2.price_min}/>
                          <div className="finded_crt_offer_name_of_fields">
                            <span>{DeepSearchLangArr[lang]['max_price']}</span>
                          </div>
                          <input maxLength={30} placeholder={DeepSearchLangArr[lang]['max_price']} name="price_max" type="number" min="0" max="1000000" className="finded_input_field_name" onChange={handleChange} value={data2.price_max}/>
                        </div>
                      </div>
              </div>
              
            </div>
            <a href={`/finded/${params.language}/${data2.format}/${data2.target}/${data2.age}/${data2.microphone}/${data2.price_min}/${data2.price_max}/`}>
              <div className="deep_search_component_button">
                <p className="deep_search_component_button_text">{DeepSearchLangArr[lang]['find']}</p>
              </div>
            </a>
        </div>
    </div>
</div>
    </>

  )
}

export default DeepSearchComp
