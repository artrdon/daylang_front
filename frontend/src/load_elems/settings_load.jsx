import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'


function Settings_load() {

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



    return (
        <>

      <div  className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
     <form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p
              style={{
                width: 570,
                margin: 40,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 30
              }}
            >
              {arrLang[lang]['main']}
            </p>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLang[lang]['language']}</span>
            </div>
            <select id="languages" className="setting_language_selector" defaultValue={arrLang[lang]['language']} name="language">
              <option id="rus">Русский</option>
              <option id="eng">English</option>
              <option id="srbc">Српски</option>
              <option id="srbl">Srpski</option>
              <option id="germ">Deutsch</option>
              <option id="span">Español</option>
              <option id="arab">عربي</option>
            </select>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLang[lang]['name']}</span>
            </div>
            <input
              maxLength={30}
              placeholder={arrLang[lang]['name']}
              name="name"
              type="text"
              className="input_field_name"
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLang[lang]['last_name']}</span>
            </div>
            <input
              maxLength={30}
              placeholder={arrLang[lang]['last_name']}
              type="text"
              name="surname"
              className="input_field_name"
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLang[lang]['about_myself']}</span>
            </div>
            <textarea
              maxLength={700}
              placeholder={arrLang[lang]['about_myself']}
              name="about_myself"
              id=""
              className="input_field_description"
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLang[lang]['load_photo']}</span>
            </div>
            <input
              accept="image/png"
              id="icon404873"
              name="icon"
              type="file"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "relative",
                display: "inline-block",
                top: 18,
                left: 250
              }}
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 50,
                fontSize: 20,
                height: 500
              }}
            >
              <img
                alt=""
                style={{
                  width: 300,
                  height: 300,
                  position: "relative",
                  top: 50,
                  display: "block",
                  borderRadius: "50%"
                }}
                src="/src/static/img/nema.png"
              />
            </div>
            <p
              style={{
                width: 570,
                margin: 40,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 30
              }}
            >
              {arrLang[lang]['degree']}
            </p>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLang[lang]['about_my_degree']}</span>
            </div>
            <textarea
              maxLength={300}
              placeholder={arrLang[lang]['about_my_degree']}
              name="about_my_degree"
              id=""
              className="input_field_description"
              style={{ height: 200 }}
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>{arrLang[lang]['load_photo_of_degree']}</span>
            </div>
            <input
              accept="image/png"
              id="icon404873"
              name="icon"
              type="file"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "relative",
                display: "inline-block",
                top: 18,
                left: 350
              }}
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                marginTop: 50,
                fontSize: 20,
                height: 700
              }}
            >
              <img
                alt=""
                style={{
                  width: 500,
                  height: "auto",
                  position: "relative",
                  top: 0,
                  display: "block"
                }}
                src="/src/static/img/ielts.jpg"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                marginTop: 50
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

export default Settings_load
