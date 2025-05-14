import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function CreateOffersPupil({arrLang, lang, Lang}) {
    const navigate = useNavigate();
    const [data, setData] = useState({name: '', description: '', price_min: '', price_max: '', language: 'other', format: 'individual', target: 'exam', age: '5-12', microphone: 'yes', time: 30});
    const [full, setFull] = useState({name: '0', description: '0'});
    const [allowed, setAllowed] = useState({name: null, description: null});
    const [ifSaveButtonDisabled, setIfSaveButtonDisabled] = useState(true);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const csrfToken = getCookie('csrftoken');

  
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (e.target.name === 'name'){
          setFull(prev => ({ ...prev, name: e.target.value.length }));
          if (e.target.value.length < e.target.minLength)
            setAllowed(prev => ({ ...prev, name: false}));
          else
            setAllowed(prev => ({ ...prev, name: true}));
        }
        if (e.target.name === 'description'){
          setFull(prev => ({ ...prev, description: e.target.value.length }));
          if (e.target.value.length < e.target.minLength)
            setAllowed(prev => ({ ...prev, description: false}));
          else
            setAllowed(prev => ({ ...prev, description: true}));
        }
    };

    axios.defaults.withCredentials = true;  
  
    const handleSubmit = async (e) => {
          
          e.preventDefault();
          
          try {
              const response = await axios.post(`${APIURL}/offer/creatingofferpupil/`, data, {
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken,
                  },
              });
              
              console.log('Response:', response.data);
  
          } catch (error) {
              console.error('There was an error!', error.response.data);
          }
  
    };
    useEffect(() => {
      if (allowed.name && allowed.description)
        setIfSaveButtonDisabled(false)
      else
        setIfSaveButtonDisabled(true);
    }, [allowed]);


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
              <input minLength={20} maxLength={40} placeholder={arrLang[lang]['name']} name="name" type="text" className="input_field_name" onChange={handleChange} value={data.name}/>
              <p className={`crt_offer_font_size_of_min_length ${allowed.name === false && 'crt_offer_unallowed'} ${allowed.name && 'crt_offer_allowed'}`}>{full.name} / 40</p>
              {allowed.name === false && <p className={`crt_offer_font_size_of_min_length ${allowed.name === false && 'crt_offer_unallowed'}`}>Минимальное количecтво символов - 20</p>}
            
            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['description']}</span>
              <textarea minLength={120} maxLength={700} placeholder={arrLang[lang]['description']} name="description" id="description" className="input_field_description" onChange={handleChange} value={data.description}/>
              <p className={`crt_offer_font_size_of_min_length ${allowed.description === false && 'crt_offer_unallowed'} ${allowed.description && 'crt_offer_allowed'}`}>{full.description} / 700</p>
              {allowed.description === false && <p className={`crt_offer_font_size_of_min_length ${allowed.description === false && 'crt_offer_unallowed'}`}>Минимальное количecтво символов - 120</p>}
            
            </div>

            <div className="crt_offer_name_of_fields">
              <span>Language</span>
              <select id="languages" className="setting_language_selector" onChange={handleChange} value={data.language} name="language">
                <option id="rus" value="russian">{Lang[lang]["Russian"]}</option>
                <option id="eng" value="english">{Lang[lang]["English"]}</option>
                <option id="srbl" value="serbian">{Lang[lang]["Serbian"]}</option>
                <option id="germ" value="germany">{Lang[lang]["Germany"]}</option>
                <option id="span" value="spanish">{Lang[lang]["Spanish"]}</option>
                <option id="chin" value="chinese">{Lang[lang]["Chinese"]}</option>
                <option id="ital" value="italian">{Lang[lang]["Italian"]}</option>
                <option id="franc" value="french">{Lang[lang]["French"]}</option>
                <option id="oth" value="other">Other</option>
              </select>
              
            </div>


            <div className="crt_offer_name_of_fields">
              <span>Format</span>
              <select id="formate" className="setting_language_selector" onChange={handleChange} value={data.format} name="format">
                <option id="ind" value="individual">Individual</option>
                <option id="gro" value="group">Group</option>
              </select>
              
            </div>

            <div className="crt_offer_name_of_fields">
              <span>Target</span>  
              <select id="target" className="setting_language_selector" onChange={handleChange} value={data.target} name="target">
                <option id="exam" value="exam">Exam</option>
                <option id="selfdev" value="self_development">Self development</option>
                <option id="trav" value="travelling">Travelling</option>
              </select>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>Age</span>              
              <select id="age" className="setting_language_selector" onChange={handleChange} value={data.age} name="age">
                <option id="5-12" value="5-12">5-12</option>
                <option id="13-17" value="13-17">13-17</option>
                <option id="18-30" value="18-30">18-30</option>
                <option id="31+" value="31+">31+</option>
                <option id="all" value="all">all</option>
              </select>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>I have microphone</span>
              <select id="microphone" className="setting_language_selector" onChange={handleChange} value={data.microphone} name="microphone">
                <option id="yes" value="yes">Yes</option>
                <option id="no" value="no">No</option>
              </select>

            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>min price</span>
              <input maxLength={10} placeholder={'min price'} name="price_min" type="number" min="0" max="1000000" className="input_field_name" onChange={handleChange} value={data.price_min}/>

            </div>


            <div className="crt_offer_name_of_fields">
              <span>max price</span>
              <input maxLength={10} placeholder={'max price'} name="price_max" type="number" min="0" max="1000000" className="input_field_name" onChange={handleChange} value={data.price_max}/>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>time</span>
              <input maxLength={5} placeholder={'time'} name="time" type="number" min="30" max="120" className="input_field_name" onChange={handleChange} value={data.time}/>

            </div>

            <button className="crt_offer_save_button" onClick={handleSubmit} disabled={ifSaveButtonDisabled}>
              {arrLang[lang]['save']}
            </button>

          </div>
        </div>
      </div>
  </div>
</div>

    )
}

export default CreateOffersPupil;