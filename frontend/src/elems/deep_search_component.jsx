import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import Message from '/src/pages/message.jsx'
import Calendar from 'react-calendar';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function DeepSearchComp({closeSearch }) {

  const params = useParams();
  

  const [data2, setData2] = useState({price_min: 0, price_max: 1000, format: 'individual', target: 'exam', age: '5-12', microphone: 'yes'});
  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
};


return ( 
    <>
<div className="deep_search_component_main_div">
    <div className="deep_search_component_close_search" onClick={closeSearch}></div>
    <div className="deep_search_component_form">
        <div className="deep_search_component_form_title">
            <p id="form-title" className="deep_search_component_upper_title">Deep search</p>
        </div>
        <div className="deep_search_component_div_under_title">
            <div className="deep_search_component_div_under_title_fields">
              <div style={{height: "calc(100% - 70px)", }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="crt_offer_blank">
                          <div className="finded_crt_offer_name_of_fields">
                            <span>Format</span>
                          </div>
                          <select id="formate" className="finded_setting_language_selector" onChange={handleChange} value={data2.format} name="format">
                            <option id="ind" value="individual">Individual</option>
                            <option id="gro" value="group">Group</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>Target</span>
                          </div>
                          <select id="target" className="finded_setting_language_selector" onChange={handleChange} value={data2.target} name="target">
                            <option id="exam" value="exam">Exam</option>
                            <option id="selfdev" value="self_development">Self development</option>
                            <option id="trav" value="travelling">Travelling</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>Age</span>
                          </div>
                          <select id="age" className="finded_setting_language_selector" onChange={handleChange} value={data2.age} name="age">
                            <option id="5-12" value="5-12">5-12</option>
                            <option id="13-17" value="13-17">13-17</option>
                            <option id="18-30" value="18-30">18-30</option>
                            <option id="31+" value="31+">31+</option>
                            <option id="all" value="all">all</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>I have microphone</span>
                          </div>
                          <select id="microphone" className="finded_setting_language_selector" onChange={handleChange} value={data2.microphone} name="microphone">
                            <option id="yes" value="yes">Yes</option>
                            <option id="no" value="no">No</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>min price</span>
                          </div>
                          <input maxLength={30} placeholder={"min price"} name="price_min" type="number" min="0" max="1000000" className="finded_input_field_name" onChange={handleChange} value={data2.price_min}/>
                          <div className="finded_crt_offer_name_of_fields">
                            <span>max price</span>
                          </div>
                          <input maxLength={30} placeholder={"max price"} name="price_max" type="number" min="0" max="1000000" className="finded_input_field_name" onChange={handleChange} value={data2.price_max}/>
                        </div>
                      </div>
              </div>
              
            </div>
            <Link to={`/finded/${params.language}/${data2.format}/${data2.target}/${data2.age}/${data2.microphone}/${data2.price_min}/${data2.price_max}/`}>
              <div className="deep_search_component_button">
                <p className="deep_search_component_button_text">Find</p>
              </div>
            </Link>
        </div>
    </div>
</div>
    </>

  )
}

export default DeepSearchComp
