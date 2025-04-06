import { useState, useEffect, state, handleChange, handleSubmit, setStat }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
/*import Find from '/src/pages/find.jsx'
import Finded from '/src/pages/finded.jsx'
import Message_list from '/src/pages/message_list.jsx'
import Saved from '/src/pages/saved.jsx'
import Message from '/src/pages/message.jsx'
import Offer from '/src/pages/offer.jsx'
import Me from '/src/pages/me.jsx'
import Degree from '/src/pages/degree.jsx'
import Feedback from '/src/pages/feedback.jsx'
import Offers_on_main from '/src/pages/offers_main.jsx'
import Settings from '/src/pages/settings.jsx'
import About from '/src/pages/about_us.jsx'
import NotFound from '/src/pages/notfound.jsx'*/
import axios from 'axios';
import Docks from '/src/elems/docks.jsx'

function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="avatar"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}


function AppMessLoad({ lang }) {
  const [count, setCount] = useState(0)

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


const theme = getCookie('theme');
//console.log(getCookie('theme'));


if (getCookie('theme') === "dark"){
    if (document.querySelector('body') != null)
        document.querySelector('body').className = "dark_theme";
}
else{
    if (document.querySelector('body') != null)
        document.querySelector('body').className = "light_theme";
}


function change_theme() {
    if (document.querySelector('body').className === "dark_theme")
    {

        document.querySelector('body').className = "light_theme";
        document.cookie = "theme=light; path=/;max-age=31556926";
        document.getElementById('theme_img').setAttribute("src", `/src/static/img/sunce.png`);
    }
    else
    {
        document.querySelector('body').className = "dark_theme";
        document.cookie = "theme=dark; path=/;max-age=31556926";
        document.getElementById('theme_img').setAttribute("src", `/src/static/img/moon.png`);
    }
}


var arrLang = {
      'English': {
          'find': "Find",
          'messages': 'Messages',
          'saved': 'Saved',
          'setting': 'Settings',
          'support': 'Support',
          'about': 'About Us',
      },
      'Русский': {
          'find': "Найти",
          'messages': 'Сообщения',
          'saved': 'Сохранённые',
          'setting': 'Настройки',
          'support': 'Поддержка',
          'about': 'О нас',
      },
      'Srpski': {
          'find': "Naći",
          'messages': 'Poruke',
          'saved': 'Sačuvano',
          'setting': 'Podešavanja',
          'support': 'Podrška',
          'about': 'O nama',
      },
      'Српски': {
          'find': "Наћи",
          'messages': 'Поруке',
          'saved': 'Сачувано',
          'setting': 'Подешавања',
          'support': 'Подршка',
          'about': 'О нама',
      },
      'Deutsch': {
          'find': "Finden",
          'messages': 'Nachrichten',
          'saved': 'Spielstand',
          'setting': 'Einstellungen',
          'support': 'Unterstützung',
          'about': 'Über uns',
      },
      'Español': {
          'find': "Encuentre",
          'messages': 'Mensajes',
          'saved': 'Guardado',
          'setting': 'Ajustes',
          'support': 'Ayuda',
          'about': 'Quiénes somos',
      },
      'عربي': {
          'find': "ابحث عن",
          'messages': 'الرسائل',
          'saved': 'تم الحفظ',
          'setting': 'الإعدادات',
          'support': 'الدعم',
          'about': 'نبذة عنا',
      }

    }
//console.log(mess_count);

  return (
      <>
  <div className="message_top_banner">
    <div
      style={{
        width: "17%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        left: 20,
        position: "absolute"
      }}
    >
      <Link >
        <div className="name_of_comp" translate="no">
          DayLang
        </div>
      </Link>
    </div>
    {/*<div className="search_all_pos">
      <div id="search_all">
          <button className="clear_mes_butt"><img src="/src/static/img/delete.png" alt="" className="clear_mes_butt_img" id="delete"/></button>
          <button className="search_butt" ><img src="/src/static/img/search.png" alt="" className="search_butt_img" id="search"/></button>
          <input type="text" name="Find" id="Finding" placeholder="Find" className="search_input_field"/>
      </div>
  </div>*/}
    <button className="change_theme_button">
      {theme === "dark" ? (
          <img
            src="/src/static/img/moon.png"
            alt="dark"
            className="change_theme_button_img"
            id="theme_img"
          />
                ) :
              (
              <img
                src="/src/static/img/sunce.png"
                alt="light"
                className="change_theme_button_img"
                id="theme_img"
              />
                )
                }
    </button>
      <p style={{ position: "absolute", right: 130, top: 25, fontSize: 25 }}>₽</p>
      <div className="my_account_panel">
        <ImageWithFallback src="/src/static/img/nema.png" alt='nema' />
      </div>
  </div>
  <div className="message_navig_panel">
    <div style={{ borderBottom: "1px solid rgb(138, 138, 138)" }}>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/search.png"
          alt="search"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['find']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/srce.png"
          alt="saved"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['saved']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/messagebutwhite.png"
          alt="mess"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['messages']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/my_lessons.png"
          alt="my lesson"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['messages']}</span>
      </Link>
      
      <Link className="navig_panel_button" id="only_for_fon">
        <img
          src='/src/static/img/nema.png'
          alt="username"
          className="avatar"
        />
      </Link>
    </div>
    <div style={{ borderBottom: "1px solid rgb(138, 138, 138)" }}  id="not_for_fon">
      <Link className="navig_panel_button" id="not_for_fon">
        <img
          src="/src/static/img/setting.png"
          alt="settings"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel">{arrLang[lang]['setting']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon">
        <img
          src="/src/static/img/support.png"
          alt="support"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel">{arrLang[lang]['support']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon">
        <img src="/src/static/img/dj.png" alt="about us" className="app_navig_panel_img on_desktop_panel" />
        <span className="text_in_panel">{arrLang[lang]['about']}</span>
      </Link>
      <Docks />
    </div>
  </div>


</>

  )
}

export default AppMessLoad
