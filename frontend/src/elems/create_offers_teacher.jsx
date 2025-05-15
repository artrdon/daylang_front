import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function CreateOffersTeacher({arrLang, lang, Lang}) {
    const buttonSaveRef = useRef(null);
    const [ifSaveButtonDisabled, setIfSaveButtonDisabled] = useState(true)
    const navigate = useNavigate();
    const [data, setData] = useState({name: '', description: '', price: '', language: 'other', format: 'individual', target: 'exam', age: '5-12', microphone: 'yes', message: '', photo: '',/* beggin_time_of_work: "8", end_time_of_work: "16", workday: '', break_betwen_lessons: '30', lesson_time: '30'*/});
    const [full, setFull] = useState({name: '0', description: '0', message: '0'});
    const [allowed, setAllowed] = useState({name: null, description: null, message: null});
    /*const setLessonTime = (e) => {
      setData(prevData => ({
        ...prevData,
        lesson_time: e
    }));
    console.log(data.lesson_time);
    }*/
    
  
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
        if (e.target.name === 'message'){
          setFull(prev => ({ ...prev, message: e.target.value.length }));
          if (e.target.value.length < e.target.minLength)
            setAllowed(prev => ({ ...prev, message: false}));
          else
            setAllowed(prev => ({ ...prev, message: true}));
        }
    };


    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0]
        //console.log(file);
        if (file) {
          document.getElementById('image_of_offer').src = URL.createObjectURL(file)
          //console.log(URL.createObjectURL(file));
        }
        setData(prev => ({...prev, photo: e.target.files[0]}) )
    // await handleSubmitPhoto(e);
    };

    const handlPhotosLoad = (e) => {
        setPhotosFile([]);
        setPhotosLink([]);
        for (let i = 0; i < e.target.files.length; i++){
          setPhotosFile((components) => [...components, e.target.files[i]]);
          setPhotosLink((components) => [...components, URL.createObjectURL(e.target.files[i])]);
          //console.log(e.target.files[i]);
        }
        
       // await handleSubmitPhoto(e);
    };
    axios.defaults.withCredentials = true;

    const [file, setFile] = useState(null);
    const [photosFile, setPhotosFile] = useState([]);
    const [photosLink, setPhotosLink] = useState([]);
    const [components, setComponents] = useState([]);
  
    

    
    const handleSubmit1 = async (e) => {
        if (!(allowed.name && allowed.description && allowed.message))
          return
        e.preventDefault();
        let resp = await handleSubmit(e);
        const photosMuliple = new FormData();
        for (let i = 0; photosFile.length > i; i++){
          photosMuliple.append(`photo${i}`, photosFile[i]);
        }
        
        try {
            const response = await axios.post(`${APIURL}/change_offer_photos_load/`, photosMuliple, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                },
            });
            
            console.log('Response:', response.data);
            if (response.data === "serializer.data"){
                navigate('/');
             // location.reload();
              console.log(resp);
            }
        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
  
    };
  
  
  
      const handleSubmit = async (e) => {
          
          e.preventDefault();
          
          const formData = new FormData();
      
          // Добавляем все поля из data
          formData.append('name', data.name);
          formData.append('description', data.description);
          formData.append('price', data.price);
          formData.append('language', data.language);
          formData.append('format', data.format);
          formData.append('target', data.target);
          formData.append('age', data.age);
          formData.append('microphone', data.microphone);
          formData.append('message', data.message);
          formData.append('img', file);  
          formData.append('workday', data.workday);
          formData.append('beggin_time_of_work', data.beggin_time_of_work);
          formData.append('end_time_of_work', data.end_time_of_work);
          formData.append('lesson_time', data.lesson_time);
          formData.append('break_betwen_lessons', data.break_betwen_lessons);
  
          
          try {
              const response = await axios.post(`${APIURL}/creatingoffer/${data.language}/`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                      'X-CSRFToken': csrfToken,
                  },
              });
              
              console.log('Response:', response.data);
  
          } catch (error) {
              console.error('There was an error!', error.response.data);
          }
  
    };

    const handleSubmitPhoto = async (e) => {
        e.preventDefault();
  
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post(`${APIURL}/creatingofferimg/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                },
            });
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error);
        }
    };
  
  
    useEffect(() => {
      if (allowed.name && allowed.description && allowed.message && (file != null))
        setIfSaveButtonDisabled(false)
      else
        setIfSaveButtonDisabled(true);
    }, [allowed, file]);
    

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
              <span>{arrLang[lang]['price']}</span>
              <input maxLength={30} placeholder={arrLang[lang]['price']} name="price" type="number" min="0" max="1000000" className="input_field_name" onChange={handleChange} value={data.price}/>
              
            </div>


            <div  className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['load_photo']}</span>
            </div>
            
            <div className="crt_offer_photo_div">
              <img alt="offer_photo" className="crt_offer_photo" src="/src/static/img/nema.png" id='image_of_offer'/>
              <input accept="image/png" id="icon404873" name="icon" type="file" tabIndex={-1} aria-hidden="true" onChange={handleFileChange} hidden/>
              <label htmlFor="icon404873" className='crt_offer_load_photo'> Загрузить фото </label>
            </div>
            
            
            <div className="crt_offer_photo_div">
              <input accept="image/png" id="icon404" name="icon" type="file" tabIndex={-1} aria-hidden="true" onChange={handlPhotosLoad} multiple hidden/>
              <label htmlFor="icon404" className='crt_offer_load_photo'> Загрузить фото </label>
              {photosLink.map((link) => (<img alt="offer_photo" className="crt_offer_photos" src={link} id='image_of_offer'/>
              ))}
            </div>

            

            <div className="crt_offer_name_of_fields">
              <span>message</span>
              <textarea minLength={100} maxLength={400} placeholder="message" name="message" id="" className="input_field_description" onChange={handleChange} value={data.message}/>
              <p className={`crt_offer_font_size_of_min_length ${allowed.message === false && 'crt_offer_unallowed'} ${allowed.message && 'crt_offer_allowed'}`}>{full.message} / 400</p>
              {allowed.message === false && <p className={`crt_offer_font_size_of_min_length ${allowed.message === false && 'crt_offer_unallowed'}`}>Минимальное количecтво символов - 100</p>}
            </div>

            <button className="crt_offer_save_button" onClick={handleSubmit1} ref={buttonSaveRef} disabled={ifSaveButtonDisabled}>
              {arrLang[lang]['save']}
            </button>

          </div>
        </div>
      </div>
  </div>
</div>

    )
}

export default CreateOffersTeacher;