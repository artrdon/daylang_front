import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import arrLangSettings from '/languages/settings.js'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import arrLangCreateOffer from '../../languages/create_offer';


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




function SettingsForm({ language, name, surname, about_myself, about_my_degree, if_teacher, photo, degree_photo, sessions, work_day_begin_int, work_day_end_int, lang }) {


     function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const [pre_degree_photo, setPre_degree_photo] = useState([])
    //const lang = getCookie('lang');
  //  let [langua, setData10] = useState(null);
    //const [data, setData] = useState({beggin_time_of_work: "8", end_time_of_work: "16", workday: '', break_betwen_lessons: '30', lesson_time: '30'});

 //   langua = lang;


    const handleDegreeLoad = (e) => {
      setComponents([]);
      setPre_degree_photo([]);
      for (let i = 0; i < e.target.files.length; i++){
        setComponents((components) => [...components, e.target.files[i]]);
        setPre_degree_photo((pre_degree_photo) => [...pre_degree_photo, URL.createObjectURL(e.target.files[i])]);
       // console.log(e.target.files[i]);
      }
    };
    const AddTimeToBye = () =>{
      let time_to_work = 60 * (Number(settingChange.end_time_of_work) - Number(settingChange.beggin_time_of_work));
      const lesson_time = Number(settingChange.lesson_time);
      const break_betwen_lessons = Number(settingChange.break_betwen_lessons);
      let array_of_components = [];
      let beg_time = Number(settingChange.beggin_time_of_work) * 60;
      let end_time = Number(settingChange.end_time_of_work) * 60;
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
          };
          array_of_components.push(newComponent);
          beg_time += lesson_time + break_betwen_lessons;
        }
      }
      setComponents(array_of_components);
      return;
    }
    


    //const [data, setData] = useState(null);
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
    const [settingChange, setData1] = useState({language: language, name: name, surname: surname, about_myself: about_myself, about_my_degree: about_my_degree, photo: photo, beggin_time_of_work: work_day_begin_int, end_time_of_work: work_day_end_int, workday: '',});
    const [components, setComponents] = useState([]);
    let sett = [];

    //axios.defaults.withCredentials = true;


    const [file, setFile] = useState(photo);

    
    const ChangeWorkDay = (e) => {
        setData1({ ...settingChange, ['workday']: e.target.name });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0]
        //console.log(file);
        if (file) {
          document.getElementById('avatarka').src = URL.createObjectURL(file)
          //console.log(URL.createObjectURL(file));
        }
       // await handleSubmitPhoto(e);
    };

    const handleSubmitPhoto = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        console.log("zagruzaju photo");
        try {
            const response = await axios.post(`${APIURL}/change_avatar/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error);
        }
    };


    
  const handleSubmitDegreePhoto = async (e) => {
      e.preventDefault();
      console.log("beggining of degree");
      const formData = new FormData();
      for (let i = 0; i < components.length; i++){
        formData.append(`image_${i}`, components[i]);
        console.log(components[i]);
      }
      if (components.length === 0)
        return;
      console.log("zagruzaju photo");
      console.log(formData);
      try {
          const response = await axios.post(`${APIURL}/degree_load/`, formData, {
              headers: {
                 // 'Content-Type': 'multipart/form-data',
                  'X-CSRFToken': getCookie('csrftoken'),
              },
          });
          console.log(response.data);
          /*settingChange.photo = response.data;
          console.log(settingChange);*/
      } catch (error) {
          console.error('Ошибка при загрузке фото:', error);
      }
  };


//onLoad = () => setData1({ ...settingChange, about_myself: "lol" });

    const handleChange = (e) => {
        setData1({ ...settingChange, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleSubmitPhoto(e);
            await handleSubmitDegreePhoto(e);
            const response = await axios.post(`${APIURL}/usersettings/`, settingChange, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log(settingChange.language);
            document.cookie = `lang=${settingChange.language}; path=/;max-age=31556926`;
            console.log('Response:', response.data);
           // location.reload();

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
       //
    };

    
    const deleteSession = async (e, id) => {
        e.preventDefault();
        console.log('Current cookies:', document.cookie);
        const csrfToken = getCookie('csrftoken');
        console.log('Extracted CSRF token:', csrfToken);
        try {
            const response = await axios.post(`${APIURL}/delete_session/`, id,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken,
                },
                withCredentials: true,
              }
            );
            if (response.data)
              document.getElementById(`session_id_${response.data}`).remove();

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };


    const exit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/logout/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', response.data);

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
    };
    console.log(getCookie('csrftoken'));

    return (
        <>
<div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
     <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p className="crt_offer_name_of_fields">
              {arrLangSettings[lang]['main']}
            </p>
            <div className="crt_offer_name_of_fields">
              <span>{arrLangSettings[lang]['language']}</span>
              <select id="languages" className="setting_language_selector" onChange={handleChange} value={settingChange.language} name="language">
                <option id="rus" value={"russian"}>Русский</option>
                <option id="eng" value={"english"}>English</option>
                <option id="srbc" value={"serbian-cir"}>Српски</option>
                <option id="srbl" value={"serbian-lat"}>Srpski</option>
                <option id="germ" value={"germany"}>Deutsch</option>
                <option id="span" value={"spanish"}>Español</option>
              </select>
              
            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>{arrLangSettings[lang]['name']}</span>
              <input
                maxLength={30}
                placeholder={arrLangSettings[lang]['name']}
                name="name"
                type="text"
                className="input_field_name"
                value={settingChange.name}
                onChange={handleChange}
              />

            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>{arrLangSettings[lang]['last_name']}</span>
              <input
                maxLength={30}
                placeholder={arrLangSettings[lang]['last_name']}
                type="text"
                name="surname"
                className="input_field_name"
                value={settingChange.surname}
                onChange={handleChange}
              />
            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>{arrLangSettings[lang]['about_myself']}</span>
              <textarea
                maxLength={700}
                placeholder={arrLangSettings[lang]['about_myself']}
                name="about_myself"
                id=""
                className="input_field_description"
                value={settingChange.about_myself}
                onChange={handleChange}
              />
            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>{arrLangSettings[lang]['load_photo']}</span>
            </div>
            
            <div className="crt_offer_photo_div">
              <ImageWithFallback src={settingChange.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
              <input accept="image" id="icon404873" name="photo" type="file" tabIndex={-1} aria-hidden="true" onChange={handleFileChange} hidden/>
              <label htmlFor="icon404873" className='crt_offer_load_photo'>{arrLangSettings[lang]['load_photo']}</label>
            </div>

            {if_teacher === false ? (
              null
            ) : (
                <>
              <p className="crt_offer_name_of_fields">
                {arrLangSettings[lang]['degree']}
              </p>
              <div className="crt_offer_name_of_fields">
                <span>{arrLangSettings[lang]['about_my_degree']}</span>
                <textarea
                  maxLength={300}
                  placeholder={arrLangSettings[lang]['about_my_degree']}
                  name="about_my_degree"
                  id=""
                  className="input_field_description"
                  value={settingChange.about_my_degree}
                  onChange={handleChange}
                />

              </div>
              
              <div className="crt_offer_name_of_fields">
                <span>{arrLangSettings[lang]['load_photo_of_degree']}</span>
              </div>
              
              <div className="crt_offer_photo_div">
                {degree_photo.map((photo) => (
                  <img
                    alt="degree photo"
                    className="settings_page_degree_photo"
                    src={photo.photo}
                    key={photo.id}
                  />
                ))}
                {pre_degree_photo.map((photo, index) => (
                  <img
                    alt="degree photo"
                    className="settings_page_degree_photo"
                    src={photo}
                    key={index}
                  />
                ))}
                <input accept="image/png" id="icon404" name="icon" type="file" aria-hidden="true" onChange={handleDegreeLoad} multiple hidden/>
                <label htmlFor="icon404" className='crt_offer_load_photos_more'>{arrLangSettings[lang]['load_photo_of_degree']}</label>

              </div>

              <div className="crt_offer_name_of_fields">
                <span>{arrLangSettings[lang]['work']}</span>
              </div>
              <div className='crt_offer_work_day_div'>
                <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Monday">{arrLangSettings[lang]['monday']}</button>
                <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Tuesday">{arrLangSettings[lang]['tuesday']}</button>
                <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Wednesday">{arrLangSettings[lang]['wednesday']}</button>
                <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Thirsday">{arrLangSettings[lang]['thursday']}</button>
                <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Friday">{arrLangSettings[lang]['friday']}</button>
                <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Saturday">{arrLangSettings[lang]['saturday']}</button>
                <button className='crt_offer_work_day_days' onClick={ChangeWorkDay} name="Sunday">{arrLangSettings[lang]['sunday']}</button>
              </div>
              <div className='crt_offer_work_day_div'>
                <select id="beggin_time_of_work" className='crt_offer_work_day_select' name="beggin_time_of_work"  onChange={handleChange} value={settingChange.beggin_time_of_work}>
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
                <select id="end_time_of_work" className='crt_offer_work_day_select' name="end_time_of_work" onChange={handleChange} value={settingChange.end_time_of_work}>
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
              </>
            )}

              <div className="crt_offer_name_of_fields">
                <span>{arrLangSettings[lang]['sessions']}</span>
                <div className="input_field_description">
                  {sessions.map((session) => (
                    <div className='settings_session_div' key={`session${session.id}`} id={`session_id_${session.id}`}>
                      {session.type !== 'ordinary' && <p className='settings_sessiond_div_p'>{session.type}</p>}
                      <p className='settings_sessiond_div_p'>{session.device}</p>
                      <p className='settings_sessiond_div_p'>{session.os}</p>
                      <p className='settings_sessiond_div_p'>{session.browzer}</p>
                      <button className='settings_delete_div_button' onClick={(e) => deleteSession(e, session.id)} type='button'>
                        {arrLangSettings[lang]['delete']}
                      </button>
                    </div>
                  ))}
                  

                </div>
              </div>

              <button
                className='crt_offer_save_button'
                type="submit"
              >
                {arrLangSettings[lang]['save']}
              </button>

              <button
                className='crt_offer_save_button'
                type='button'
                onClick={exit}
              >
                {arrLangSettings[lang]['exit']}
              </button>

          </div>
        </div>
      </div>
    </form>
  </div>
</div>




</>

  )
}

export default SettingsForm
