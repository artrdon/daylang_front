import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import Langs from '/languages/langs.js'
import arrLangCreateOffer from '/languages/create_offer.js'
import App from '/src/App.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

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
      id='image_of_offer'
    />
  );
}



function UpdateOfferComp({ name, description, price, id, language, format, target, age, microphone, photo, message, lang}) {

    const params = useParams();

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

   // const lang = getCookie('lang');
   // let [langua, setData10] = useState(getCookie('lang'));
    let micr = null;
    if (microphone === false){
        micr = "No"
    }
    if (microphone === true){
        micr = "Yes"
    }


    const [data, setData] = useState({name: name, description: description, price: price, language: language, format: format, target: target, age: age, microphone: micr, photo: photo, message: message});
    const [constData, setConstData] = useState({name: name, description: description, price: price, language: language, format: format, target: target, age: age, microphone: micr, photo: photo, message: message});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [full, setFull] = useState({name: `${name.length}`, description: `${description.length}`, message: `${message.length}`});
    const [allowed, setAllowed] = useState({name: null, description: null, message: null});
    const [ifSaveButtonDisabled, setIfSaveButtonDisabled] = useState(true);
    const [photosLink, setPhotosLink] = useState([]);




    axios.defaults.withCredentials = true;
    const [constFile, setConstFile] = useState(photo)
    const [file, setFile] = useState(photo);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0]
        //console.log(file);
        if (file) {
          document.getElementById('image_of_offer').src = URL.createObjectURL(file)
          //console.log(URL.createObjectURL(file));
        }
        //setData(prev => ({...prev, photo: e.target.files[0]}) )
    };

    const handleSubmitPhoto = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        //console.log("zagruzaju photo");
        try {
            const response = await axios.post(`${APIURL}/change_offer_photo/${params.index}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log(response.data);
            data.photo = response.data;
           /* console.log(settingChange);*/
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error);
        }
    };




//onLoad = () => setData1({ ...settingChange, about_myself: "lol" });
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



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmitPhoto(e);
            const response = await axios.post(`${APIURL}/updatingoffer/${id}/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', response.data);
            if (response.data === "serializer.data"){
                location.reload();
            }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
       //
    };

    const delete_offer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/deletingoffer/${id}/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', response.data);
            window.location.replace(`/`);

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }

    };

    const handlPhotosLoad = (e) => {
      for (let i = 0; i < e.target.files.length; i++){
        //setPhotosFile((components) => [...components, e.target.files[i]]);
        setPhotosLink((components) => [...components, URL.createObjectURL(e.target.files[i])]);
        //console.log(e.target.files[i]);
      }
      
     // await handleSubmitPhoto(e);
  };

  useEffect(() => {
    const keys = ['name', 'description', 'price', 'language', 'format', 'target', 'age', 'microphone', 'photo', 'message'];
    const hasChanged = keys.some(key => constData[key] != data[key]);
    if (file != constFile){
      setIfSaveButtonDisabled(false);
      return;
    }
    setIfSaveButtonDisabled(!hasChanged);
  }, [data, constData, file]);

    return (
        <>
<div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
     <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p className="crt_offer_name_of_fields">
              {arrLangCreateOffer[lang]['update_offer']}
            </p>
            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['name']}</span>
              <input
                minLength={20}
                maxLength={40}
                placeholder={arrLangCreateOffer[lang]['name']}
                name="name"
                type="text"
                className="input_field_name"
                onChange={handleChange}
                value={data.name}
              />
              <p className={`crt_offer_font_size_of_min_length ${allowed.name === false && 'crt_offer_unallowed'} ${allowed.name && 'crt_offer_allowed'}`}>{full.name} / 40</p>
              {allowed.name === false && <p className={`crt_offer_font_size_of_min_length ${allowed.name === false && 'crt_offer_unallowed'}`}>{arrLangCreateOffer[lang]['min_count']} 20</p>}
            
            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['description']}</span>
              <textarea
                minLength={120}
                maxLength={700}
                placeholder={arrLangCreateOffer[lang]['description']}
                name="description"
                id=""
                className="input_field_description"
                onChange={handleChange}
                value={data.description}
              />
              <p className={`crt_offer_font_size_of_min_length ${allowed.description === false && 'crt_offer_unallowed'} ${allowed.description && 'crt_offer_allowed'}`}>{full.description} / 700</p>
              {allowed.description === false && <p className={`crt_offer_font_size_of_min_length ${allowed.description === false && 'crt_offer_unallowed'}`}>{arrLangCreateOffer[lang]['min_count']}  120</p>}
            
            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['language']}</span>  
              <select id="languages" className="setting_language_selector" onChange={handleChange} value={data.language} name="language">
                <option id="rus" value="russian">{Langs[lang]["russian"]}</option>
                <option id="eng" value="english">{Langs[lang]["english"]}</option>
                <option id="srbl" value="serbian">{Langs[lang]["serbian"]}</option>
                <option id="germ" value="germany">{Langs[lang]["germany"]}</option>
                <option id="span" value="spanish">{Langs[lang]["spanish"]}</option>
                <option id="chin" value="chinese">{Langs[lang]["chinese"]}</option>
                <option id="ital" value="italian">{Langs[lang]["italian"]}</option>
                <option id="franc" value="french">{Langs[lang]["french"]}</option>
                <option id="rus" value="other">{Langs[lang]["other"]}</option>
              </select>
              
            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['format']}</span>
              <select id="formate" className="setting_language_selector" onChange={handleChange} value={data.format} name="format">
                <option id="ind" value="individual">{arrLangCreateOffer[lang]['individual']}</option>
                <option id="gro" value="group">{arrLangCreateOffer[lang]['group']}</option>
              </select>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['target']}</span>  
              <select id="target" className="setting_language_selector" onChange={handleChange} value={data.target} name="target">
                <option id="exam" value="exam">{arrLangCreateOffer[lang]['exam']}</option>
                <option id="selfdev" value="self_development">{arrLangCreateOffer[lang]['self_dev']}</option>
                <option id="trav" value="travelling">{arrLangCreateOffer[lang]['travelling']}</option>
              </select>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['age']}</span>
              <select id="age" className="setting_language_selector" onChange={handleChange} value={data.age} name="age">
                <option id="5-12" value="5-12">5-12</option>
                <option id="13-17" value="13-17">13-17</option>
                <option id="18-30" value="18-30">18-30</option>
                <option id="31+" value="31+">31+</option>
                <option id="all" value="all">{arrLangCreateOffer[lang]['all']}</option>
              </select>

            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['i_have_microphone']}</span>
              <select id="microphone" className="setting_language_selector" onChange={handleChange} value={data.microphone} name="microphone">
                <option id="yes" value="yes">{arrLangCreateOffer[lang]['yes']}</option>
                <option id="no" value="no">{arrLangCreateOffer[lang]['no']}</option>
              </select>

            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['price']}</span>
              <input
                maxLength={30}
                placeholder={arrLangCreateOffer[lang]['price']}
                name="price"
                type="number"
                min="0"
                max="1000000"
                className="input_field_name"
                onChange={handleChange}
                value={data.price}
              />

            </div>
            

            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['load_photo']}</span>
            </div>
            <div className="crt_offer_photo_div">
              <ImageWithFallback src={photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png" />
              <input accept="image/png" id="icon404873" name="photo" type="file" tabIndex={-1} aria-hidden="true" onChange={handleFileChange} hidden/>
              <label htmlFor="icon404873" className='crt_offer_load_photo'>{arrLangCreateOffer[lang]['load_photo']}</label>
            </div>

            <div className="crt_offer_photo_div">
              <input accept="image/png" id="icon404" name="icon" type="file" tabIndex={-1} aria-hidden="true" onChange={handlPhotosLoad} multiple hidden/>
              <label htmlFor="icon404" className='crt_offer_load_photo'>{arrLangCreateOffer[lang]['load_photo']}</label>
              {photosLink.map((link) => (<img alt="offer_photo" className="crt_offer_photos" src={link} id='image_of_offer'/>
              ))}
            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>{arrLangCreateOffer[lang]['message']}</span>
              <textarea minLength={100} maxLength={400} placeholder={arrLangCreateOffer[lang]['message']} name="message" id="" className="input_field_description" onChange={handleChange} value={data.message}/>
              <p className={`crt_offer_font_size_of_min_length ${allowed.message === false && 'crt_offer_unallowed'} ${allowed.message && 'crt_offer_allowed'}`}>{full.message} / 400</p>
              {allowed.message === false && <p className={`crt_offer_font_size_of_min_length ${allowed.message === false && 'crt_offer_unallowed'}`}>{arrLangCreateOffer[lang]['min_count']} 100</p>}
            
            </div>
            
              <button
                className='crt_offer_save_button'
                type="submit"
                disabled={ifSaveButtonDisabled}
              >
                {arrLangCreateOffer[lang]['update']}
              </button>

                <button
                className='crt_offer_save_button'
                onClick={delete_offer}
              >
                {arrLangCreateOffer[lang]['delete']}
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

export default UpdateOfferComp
