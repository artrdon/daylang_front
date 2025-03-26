import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import App from '/src/App.jsx'
import axios from 'axios';


function SettingsForm({ language, name, surname, about_myself, about_my_degree, if_teacher, photo }) {

    const [count, setCount] = useState(0)
     function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

        var arrLang = {
      'English': {
          'main': "Main",
          'degree': 'Degree / Certificate',
          'language': 'Language',
          'name': 'First name',
          'last_name': 'Last name',
          'about_myself': 'About myself',
          'load_photo': 'Load photo',
          'about_my_degree': 'About my degree',
          'load_photo_of_degree': 'Load photo of the degree',
          'exit': 'Exit',
          'save': 'Save',
      },
      'Русский': {
          'main': "Главная",
          'degree': 'Диплом / Сертификат',
          'language': 'Язык',
          'name': 'Имя',
          'last_name': 'Фамилия',
          'about_myself': 'Обо мне',
          'load_photo': 'Загрузить фото',
          'about_my_degree': 'О моём образовании',
          'load_photo_of_degree': 'Загрузить фото диплома',
          'exit': 'Выйти',
          'save': 'Сохранить',
      },
      'Srpski': {
          'main': "Glavni",
          'degree': 'Diploma / Sertificat',
          'language': 'Jezik',
          'name': 'Ime',
          'last_name': 'Prezime',
          'about_myself': 'O sebi',
          'load_photo': 'Otpremite fotografiju',
          'about_my_degree': 'O mojoj naprednoj diplomi',
          'load_photo_of_degree': 'Otpremite fotografiju diplome',
          'exit': 'Izlaz',
          'save': 'Sačuvaj',
      },
      'Српски': {
          'main': "Главни",
          'degree': 'Диплома / Сертификат',
          'language': 'Jезик',
          'name': 'Име',
          'last_name': 'Презиме',
          'about_myself': 'О себи',
          'load_photo': 'Отпремите фотографију',
          'about_my_degree': 'О мојој напредној дипломи',
          'load_photo_of_degree': 'Отпремите фотографију дипломе',
          'exit': 'Излаз',
          'save': 'Сачувај',
      },
      'Deutsch': {
          'main': "Wichtigsten",
          'degree': 'Abschluss / Zertifikat',
          'language': 'Sprachlich',
          'name': 'Vorname',
          'last_name': 'Nachname',
          'about_myself': 'Über mich selbst',
          'load_photo': 'Foto laden',
          'about_my_degree': 'Über meinen Abschluss',
          'load_photo_of_degree': 'Foto des Abschlusses laden',
          'exit': 'Ausfahrt',
          'save': 'Speichern',
      },
      'Español': {
          'main': "Principal",
          'degree': 'Título / Certificado',
          'language': 'Idioma',
          'name': 'Nombre',
          'last_name': 'Apellido',
          'about_myself': 'Sobre mí',
          'load_photo': 'Cargar foto',
          'about_my_degree': 'Sobre mi título',
          'load_photo_of_degree': 'Cargar foto del título',
          'exit': 'Salir',
          'save': 'Guardar',
      },
      'عربي': {
          'main': "الرئيسية",
          'degree': 'درجة / شهادة',
          'language': 'اللغة',
          'name': 'الاسم',
          'last_name': 'اللقب',
          'about_myself': 'عن نفسي',
          'load_photo': 'تحميل الصورة',
          'about_my_degree': 'حول شهادتي',
          'load_photo_of_degree': 'تحميل صورة من الدرجة',
          'exit': 'خروج',
          'save': 'حفظ',
      }

    }



    const csrfToken = getCookie('csrftoken');


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [settingChange, setData1] = useState({language: language, name: name, surname: surname, about_myself: about_myself, about_my_degree: about_my_degree, photo: photo});
    let sett = [];

    axios.defaults.withCredentials = true;


    const [file, setFile] = useState(photo);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);

       // await handleSubmitPhoto(e);
    };

    const handleSubmitPhoto = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        console.log("zagruzaju photo");
        try {
            const response = await axios.post('http://api.daylang.ru/change_avatar/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log(response.data);
            settingChange.photo = response.data;
            console.log(settingChange);
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
            const response = await axios.post('http://api.daylang.ru/usersettings/', settingChange, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            document.cookie = `lang=${settingChange.language}; path=/;max-age=31556926`;
            console.log('Response:', response.data);
            location.reload();

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
       //
    };

    const exit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://api.daylang.ru/logout/', {
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

//console.log(photo);
    return (
        <>
<div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
     <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p className="crt_offer_name_of_fields" style={{margin: 40,marginLeft: "auto", marginRight: "auto", fontSize: 30}}>
              {arrLang[lang]['main']}
            </p>
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['language']}</span>
            </div>
            <select id="languages" className="setting_language_selector" onChange={handleChange} value={settingChange.language} name="language">
              <option id="rus">Русский</option>
              <option id="eng">English</option>
              <option id="srbc">Српски</option>
              <option id="srbl">Srpski</option>
              <option id="germ">Deutsch</option>
              <option id="span">Español</option>
              <option id="arab">عربي</option>
            </select>
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['name']}</span>
            </div>
            <input
              maxLength={30}
              placeholder="Name"
              name="name"
              type="text"
              className="input_field_name"
              value={settingChange.name}
              onChange={handleChange}
            />
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['last_name']}</span>
            </div>
            <input
              maxLength={30}
              placeholder="Last name"
              type="text"
              name="surname"
              className="input_field_name"
              value={settingChange.surname}
              onChange={handleChange}
            />
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['about_myself']}</span>
            </div>
            <textarea
              maxLength={700}
              placeholder="Description"
              name="about_myself"
              id=""
              className="input_field_description"
              value={settingChange.about_myself}
              onChange={handleChange}
            />
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['load_photo']}</span>
            </div>
            <input
              accept="image"
              id="icon404873"
              name="photo"
              type="file"

              onChange={handleFileChange}
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "relative",
                display: "inline-block",
                top: 18,
                left: 0
              }}
            />
            <div className="crt_offer_photo_div">
              <img alt="" className="crt_offer_photo" src={settingChange.photo} style={{ borderRadius: "50%" }}/>
            </div>

            {if_teacher === false ? (
              null
            ) : (
                <>
              <p className="crt_offer_name_of_fields" style={{margin: 40,marginLeft: "auto", marginRight: "auto", fontSize: 30}}>
              {arrLang[lang]['degree']}
            </p>
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['about_my_degree']}</span>
            </div>
            <textarea
              maxLength={300}
              placeholder="Description"
              name="about_my_degree"
              id=""
              className="input_field_description"
              style={{ height: 200 }}
              value={settingChange.about_my_degree}
              onChange={handleChange}
            />
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['load_photo_of_degree']}</span>
            </div>
            <input
              accept="image/jpg"
              id="icon404873"
              name="icon"
              type="file"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "relative",
                display: "inline-block",
                top: 18,
                left: 0
              }}
            />
            <div className="crt_offer_photo_div">
              <img
                alt=""
                style={{
                  width: 200,
                  height: "auto",
                  position: "relative",
                  top: 0,
                  display: "block",
                  margin: 10,
                }}
                src="/src/static/img/ielts.jpg"
              />
            </div>

              </>
            )}


            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                marginTop: 50,
                marginBottom: 100,
              }}
            >
              <button
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: "gray",
                  margin: 20,
                  fontSize: 30
                }}
                onClick={exit}
              >
                {arrLang[lang]['exit']}
              </button>

              <button
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: "gray",
                  margin: 20,
                  fontSize: 30
                }}
                type="submit"
              >
                {arrLang[lang]['save']}
              </button>
              </div>
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
