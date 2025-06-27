import { useState } from 'react'
import arrLangSettings from '/languages/settings.js'
import axios from 'axios';


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




function SettingsForm({ language, name, surname, about_myself, photo, sessions, lang }) {
  const env = import.meta.env;
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const [settingChange, setData1] = useState({language: language, name: name, surname: surname, about_myself: about_myself, photo: photo});
    
    const [file, setFile] = useState(photo);

    

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0]
        if (file) {
          document.getElementById('avatarka').src = URL.createObjectURL(file)
        }
    };

    const handleSubmitPhoto = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post(`${env.VITE_APIURL}/change_avatar/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
          //  console.log(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error.response?.data);
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
            const response = await axios.post(`${env.VITE_APIURL}/usersettings/`, settingChange, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            document.cookie = `lang=${settingChange.language}; path=/;max-age=31556926`;
            if (response?.status === 200)
              location.reload();
        } catch (error) {
            console.error('There was an error!', error.response?.data);
        }
       //
    };

    
    const deleteSession = async (e, id) => {
        e.preventDefault();
        const csrfToken = getCookie('csrftoken');
        try {
            const response = await axios.post(`${env.VITE_APIURL}/delete_session/`, id,
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
            console.error('There was an error!', error.response?.data);
        }
    };


    const exit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${env.VITE_APIURL}/logout/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', response.data);

        } catch (error) {
            console.error('There was an error!', error.response?.data);
        }
    };

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
              <input accept="image/png" id="icon404873" name="photo" type="file" tabIndex={-1} aria-hidden="true" onChange={handleFileChange} hidden/>
              <label htmlFor="icon404873" className='crt_offer_load_photo'>{arrLangSettings[lang]['load_photo']}</label>
            </div>


              <div className="crt_offer_name_of_fields">
                <span>{arrLangSettings[lang]['sessions']}</span>
                <div className="input_field_description">
                  <div style={{overflow: "auto", height: "100%"}}>
                    {sessions.map((session) => (
                      <div className='settings_session_div' key={`session${session.id}`} id={`session_id_${session.id}`}>
                        {session.type !== 'ordinary' && <p className='settings_sessiond_div_p'>{session.type}</p>}
                        <p className='settings_sessiond_div_p'>Устройство: {session.device}</p>
                        <p className='settings_sessiond_div_p'>Операционная система: {session.os}</p>
                        <p className='settings_sessiond_div_p'>Браузер: {session.browzer}</p>
                        <button className='settings_delete_div_button' onClick={(e) => deleteSession(e, session.id)} type='button'>
                          {arrLangSettings[lang]['delete']}
                        </button>
                      </div>
                    ))}
                  </div>
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
