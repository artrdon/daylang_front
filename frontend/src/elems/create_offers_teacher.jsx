import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function CreateOffersTeacher({arrLang, lang, Lang}) {
    const navigate = useNavigate();
    const [data, setData] = useState({name: '', description: '', price: '', language: 'other', format: 'individual', target: 'exam', age: '5-12', microphone: 'yes', message: '', photo: '', beggin_time_of_work: "8", end_time_of_work: "16", workday: '', break_betwen_lessons: '30', lesson_time: '30'});
    const [full, setFull] = useState({name: '0', description: '0', message: '0'});
    const [allowed, setAllowed] = useState({name: null, description: null, message: null});
    const setLessonTime = (e) => {
      setData(prevData => ({
        ...prevData,
        lesson_time: e
    }));
    console.log(data.lesson_time);
    }
    
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


    const ChangeWorkDay = (e) => {
        setData({ ...data, ['workday']: e.target.name });
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

    const [file, setFile] = useState("none");
    const [photosFile, setPhotosFile] = useState([]);
    const [photosLink, setPhotosLink] = useState([]);
    const [components, setComponents] = useState([]);
  
    const AddTimeToBye = () =>{
      let time_to_work = 60 * (Number(data.end_time_of_work) - Number(data.beggin_time_of_work));
      const lesson_time = Number(data.lesson_time);
      const break_betwen_lessons = Number(data.break_betwen_lessons);
      let array_of_components = [];
      let beg_time = Number(data.beggin_time_of_work) * 60;
      let end_time = Number(data.end_time_of_work) * 60;
      console.log(time_to_work);
      for (let i = 0; i < time_to_work; time_to_work -= (lesson_time + break_betwen_lessons)){
        if (time_to_work - lesson_time >= 0){
          if (beg_time + lesson_time > end_time){
            break;
          }
          let beg_time_hour = Math.floor(beg_time / 60);
          let beg_time_minute = beg_time % 60;
          let end_time_hour = Math.floor((beg_time + lesson_time) / 60);
          let end_time_minute = (beg_time + lesson_time) % 60;
          const newComponent = {
            time: `${beg_time_hour}:${beg_time_minute} - ${end_time_hour}:${end_time_minute}`,
            price: data.price,
          };
          array_of_components.push(newComponent);
          beg_time += lesson_time + break_betwen_lessons;
        }
      }
      setComponents(array_of_components);
      return;
    }

    
    const handleSubmit1 = async (e) => {
        
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
              <p className={` ${allowed.name === false && 'crt_offer_unallowed'} ${allowed.name && 'crt_offer_allowed'}`}>{full.name} / 40</p>
            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['description']}</span>
              <textarea minLength={120} maxLength={700} placeholder={arrLang[lang]['description']} name="description" id="description" className="input_field_description" onChange={handleChange} value={data.description}/>
              <p className={` ${allowed.description === false && 'crt_offer_unallowed'} ${allowed.description && 'crt_offer_allowed'}`}>{full.description} / 700</p>
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
              <label htmlFor="icon404873"  style={{position: "relative", display: "flex", top: 70, left: 0, width: 300, height: 50, backgroundColor: "rgb(0, 212, 114)", borderRadius: 10, color: "black", fontSize: 30, padding: "auto", justifyContent: "center", alignItems: "center" }}> Загрузить фото </label>
            </div>
            
            
            <div className="crt_offer_photo_div">
              <input accept="image/png" id="icon404" name="icon" type="file" tabIndex={-1} aria-hidden="true" onChange={handlPhotosLoad} multiple hidden/>
              <label htmlFor="icon404"  style={{position: "relative", display: "flex", left: 0, width: "100%", height: 50, backgroundColor: "rgb(0, 212, 114)", borderRadius: 10, color: "black", fontSize: 30, padding: "auto", justifyContent: "center", alignItems: "center" }}> Загрузить фото </label>
              {photosLink.map((link) => (<img alt="offer_photo" className="crt_offer_photos" src={link} id='image_of_offer'/>
              ))}
            </div>

            

            <div className="crt_offer_name_of_fields">
              <span>message</span>
              <textarea minLength={100} maxLength={400} placeholder="message" name="message" id="" className="input_field_description" onChange={handleChange} value={data.message}/>
              <p className={` ${allowed.message === false && 'crt_offer_unallowed'} ${allowed.message && 'crt_offer_allowed'}`}>{full.message} / 400</p>
            </div>

            <div className="crt_offer_name_of_fields">
              <span>work</span>
            </div>
            <div className='crt_offer_work_day_div'>
              <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Monday">Mo</button>
              <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Tuesday">Tu</button>
              <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Wednesday">We</button>
              <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Thirsday">Th</button>
              <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Friday">Fr</button>
              <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Saturday">Sa</button>
              <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Sunday">Su</button>
            </div>
            <div className='crt_offer_work_day_div'>
              <select id="beggin_time_of_work" className='crt_offer_work_day_select' name="beggin_time_of_work"  onChange={handleChange} value={data.beggin_time_of_work}>
                <option id="0hb" value="0">00:00</option>
                <option id="1hb" value="1">01:00</option>
                <option id="2hb" value="2">02:00</option>
                <option id="3hb" value="3">03:00</option>
                <option id="4hb" value="4">04:00</option>
                <option id="5hb" value="5">05:00</option>
                <option id="6hb" value="6">06:00</option>
                <option id="7hb" value="7">07:00</option>
                <option id="8hb" value="8">08:00</option>
                <option id="9hb" value="9">09:00</option>
                <option id="10hb" value="10">10:00</option>
                <option id="11hb" value="11">11:00</option>
                <option id="12hb" value="12">12:00</option>
                <option id="13hb" value="13">13:00</option>
                <option id="14hb" value="14">14:00</option>
                <option id="15hb" value="15">15:00</option>
                <option id="16hb" value="16">16:00</option>
                <option id="17hb" value="17">17:00</option>
                <option id="18hb" value="18">18:00</option>
                <option id="19hb" value="19">19:00</option>
                <option id="20hb" value="20">20:00</option>
                <option id="21hb" value="21">21:00</option>
                <option id="22hb" value="22">22:00</option>
                <option id="23hb" value="23">23:00</option>
              </select>
              <select id="end_time_of_work" className='crt_offer_work_day_select' name="end_time_of_work" onChange={handleChange} value={data.end_time_of_work}>
                <option id="0he" value="0">00:00</option>
                <option id="1he" value="1">01:00</option>
                <option id="2he" value="2">02:00</option>
                <option id="3he" value="3">03:00</option>
                <option id="4he" value="4">04:00</option>
                <option id="5he" value="5">05:00</option>
                <option id="6he" value="6">06:00</option>
                <option id="7he" value="7">07:00</option>
                <option id="8he" value="8">08:00</option>
                <option id="9he" value="9">09:00</option>
                <option id="10he" value="10">10:00</option>
                <option id="11he" value="11">11:00</option>
                <option id="12he" value="12">12:00</option>
                <option id="13he" value="13">13:00</option>
                <option id="14he" value="14">14:00</option>
                <option id="15he" value="15">15:00</option>
                <option id="16he" value="16">16:00</option>
                <option id="17he" value="17">17:00</option>
                <option id="18he" value="18">18:00</option>
                <option id="19he" value="19">19:00</option>
                <option id="20he" value="20">20:00</option>
                <option id="21he" value="21">21:00</option>
                <option id="22he" value="22">22:00</option>
                <option id="23he" value="23">23:00</option>
              </select>
            </div>
            <div className='crt_offer_work_day_div'>
            <select id="lesson_time" className='crt_offer_work_day_select' name="lesson_time" onChange={handleChange} value={data.lesson_time}>
                <option id="30lesson" value="30">30</option>
                <option id="60lesson" value="60">60</option>
                <option id="90lesson" value="90">90</option>
                <option id="120lesson" value="120">120</option>
              </select>
            </div>
            <div className='crt_offer_work_day_div'>
              <select id="break_betwen_lessons" className='crt_offer_work_day_select' name="break_betwen_lessons" onChange={handleChange} value={data.break_betwen_lessons}>
                <option id="10min" value="10">10</option>
                <option id="20min" value="20">20</option>
                <option id="30min" value="30">30</option>
                <option id="40min" value="40">40</option>
                <option id="50min" value="50">50</option>
                <option id="60min" value="60">60</option>
                <option id="90min" value="90">90</option>
                <option id="120min" value="120">120</option>
              </select>
              {/*<input type="time" name="" id="input_time_to_a" className='' step="1800"/>*/}
              <button className='crt_offer_work_day_add_button' onClick={AddTimeToBye}>Add</button>
            </div>
            <div className='crt_offer_work_day_div_work_grafic'>
                {components.map((component, index) => ( 
                      <div className='crt_offer_work_day_work_grafic' onClick={ChangeWorkDay} name="Monday" key={index}>
                        <span>{component.time}</span>
                        <div>{component.price} ₽</div>
                      </div>
                  ))}
              
            </div>
            <button className="crt_offer_save_button" onClick={handleSubmit1}>
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