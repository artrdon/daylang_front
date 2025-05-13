import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
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
    />
  );
}



function UpdateOfferComp({ name, description, price, id, language, format, target, age, microphone, photo, message}) {

    const params = useParams();

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);
    let micr = null;
    if (microphone === false){
        micr = "No"
    }
    if (microphone === true){
        micr = "Yes"
    }

    langua = lang;

        var arrLang = {
      'English': {
          'update_offer': 'Update offer',
          'name': 'Name',
          'description': 'Description',
          'price': "Price",
          'load_photo': 'Load photo',
          'update': 'Update',
          'delete': 'Delete',
      },
      'Русский': {
          'update_offer': 'Обновить предложение',
          'name': 'Название',
          'description': 'Описание',
          'price': "Цена",
          'load_photo': 'Загрузить фото',
          'update': 'Обновить',
          'delete': 'Удалить',
      },
      'Srpski': {
          'update_offer': 'Ažurirajte ponudu',
          'name': 'Naziv',
          'description': 'Opis',
          'price': "Cena",
          'load_photo': 'Otpremite fotografiju',
          'update': 'Ažuriranje',
          'delete': 'Izbriši',
      },
      'Српски': {
          'update_offer': 'Ажурирајте понуду',
          'name': 'Назив',
          'description': 'Опис',
          'price': "Цена",
          'load_photo': 'Отпремите фотографију',
          'update': 'Ажурирање',
          'delete': 'Избриши',
      },
      'Deutsch': {
          'update_offer': 'Angebot aktualisieren',
          'name': 'Titel',
          'description': 'Beschreibung',
          'price': "Preis",
          'load_photo': 'Foto laden',
          'update': 'Erneuern',
          'delete': 'Entfernen',
      },
      'Español': {
          'update_offer': 'Actualizar oferta',
          'name': 'Nombre',
          'description': 'Descripción',
          'price': "Precio",
          'load_photo': 'Cargar foto',
          'update': 'Renovar',
          'delete': 'Eliminar',
      },
      'عربي': {
          'update_offer': 'تحديث العرض',
          'name': 'العنوان',
          'description': 'الوصف',
          'price': "السعر",
          'load_photo': 'تحميل الصورة',
          'update': 'تحديث',
          'delete': 'إزالة',
      }

    }

var Lang = {
      'English': {
          'English': 'English',
          'Germany': 'Germany',
          'Russian': 'Russian',
          'Chinese': 'Chinese',
          'French':  'French',
          'Italian': 'Italian',
          'Spanish': 'Spanish',
          'Serbian': 'Serbian',
      },
      'Русский': {
          'English': 'Английский',
          'Germany': 'Немецкий',
          'Russian': 'Русский',
          'Chinese': 'Китайский',
          'French':  'Французский',
          'Italian': 'Итальянский',
          'Spanish': 'Испанский',
          'Serbian': 'Сербский',
      },
      'Srpski': {
          'English': 'Engleski',
          'Germany': 'Nemačka',
          'Russian': 'Ruski',
          'Chinese': 'Kineski',
          'French':  'Francuski',
          'Italian': 'Italijanski',
          'Spanish': 'Španski',
          'Serbian': 'Srpski',
      },
      'Српски': {
          'English': 'Енглески',
          'Germany': 'Немачка',
          'Russian': 'Руски',
          'Chinese': 'Кинески',
          'French':  'Француски',
          'Italian': 'Италијански',
          'Spanish': 'Шпански',
          'Serbian': 'Српски',
      },
      'Deutsch': {
          'English': 'Englischsprachig',
          'Germany': 'Deutschland',
          'Russian': 'Russisch',
          'Chinese': 'Chinesisch',
          'French':  'Französisch',
          'Italian': 'Italienisch',
          'Spanish': 'Spanisch',
          'Serbian': 'Serbisch',
      },
      'Español': {
          'English': 'Inglés',
          'Germany': 'Alemania',
          'Russian': 'Ruso',
          'Chinese': 'Chino',
          'French':  'Francés',
          'Italian': 'Italiano',
          'Spanish': 'Español',
          'Serbian': 'Serbio',
      },
      'عربي': {
          'English': 'الإنجليزية',
          'Germany': 'ألمانيا',
          'Russian': 'الروسية',
          'Chinese': 'الصينية',
          'French':  'الفرنسية',
          'Italian': 'الإيطالية',
          'Spanish': 'الإسبانية',
          'Serbian': 'الصربية',
      }

    }


    const csrfToken = getCookie('csrftoken');



    const [data, setData] = useState({name: name, description: description, price: price, language: language, format: format, target: target, age: age, microphone: micr, photo: photo, message: message});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    axios.defaults.withCredentials = true;

    const [file, setFile] = useState(photo);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);

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
        };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmitPhoto(e);
            const response = await axios.post(`${APIURL}/updatingoffer/${id}/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
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
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);
            window.location.replace(`/`);

        } catch (error) {
            console.error('There was an error!', error.response.data);
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
              {arrLang[lang]['update_offer']}
            </p>
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['name']}</span>
              <input
                maxLength={40}
                placeholder={arrLang[lang]['name']}
                name="name"
                type="text"
                className="input_field_name"
                onChange={handleChange}
                value={data.name}
              />

            </div>

            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['description']}</span>
              <textarea
                maxLength={700}
                placeholder={arrLang[lang]['description']}
                name="description"
                id=""
                className="input_field_description"
                onChange={handleChange}
                value={data.description}
              />

            </div>

            <div className="crt_offer_name_of_fields">
              <span>language</span>  
              <select id="languages" className="setting_language_selector" onChange={handleChange} value={data.language} name="language">
                <option id="rus" value="russian">{Lang[lang]["Russian"]}</option>
                <option id="eng" value="english">{Lang[lang]["English"]}</option>
                <option id="srbl" value="serbian">{Lang[lang]["Serbian"]}</option>
                <option id="germ" value="germany">{Lang[lang]["Germany"]}</option>
                <option id="span" value="spanish">{Lang[lang]["Spanish"]}</option>
                <option id="chin" value="chinese">{Lang[lang]["Chinese"]}</option>
                <option id="ital" value="italian">{Lang[lang]["Italian"]}</option>
                <option id="franc" value="french">{Lang[lang]["French"]}</option>
                <option id="rus" value="other">Other</option>
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
              <input
                maxLength={30}
                placeholder={arrLang[lang]['price']}
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
              <span>{arrLang[lang]['load_photo']}</span>
            </div>
            <div className="crt_offer_photo_div">
              <ImageWithFallback src={photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
              <input accept="image/png" id="icon404873" name="photo" type="file" tabIndex={-1} aria-hidden="true" onChange={handleFileChange} hidden/>
              <label htmlFor="icon404873"  style={{position: "relative", display: "flex", top: 70, left: 0, width: 300, height: 50, backgroundColor: "rgb(0, 212, 114)", borderRadius: 10, color: "black", fontSize: 30, padding: "auto", justifyContent: "center", alignItems: "center" }}> Загрузить фото </label>
            </div>
            
            <div className="crt_offer_name_of_fields">
              <span>message</span>
              <textarea maxLength={950} placeholder="message" name="message" id="" className="input_field_description" onChange={handleChange} value={data.message}/>

            </div>
            
              <button
                className='crt_offer_save_button'
                type="submit"
              >
                {arrLang[lang]['update']}
              </button>

                <button
                className='crt_offer_save_button'
                onClick={delete_offer}
              >
                {arrLang[lang]['delete']}
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
