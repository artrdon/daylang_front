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


function AppMessLoad({ lang }) {
  const [count, setCount] = useState(0)
  const theme = getCookie('theme');

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
      <Link to="/">
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
            alt=""
            className="change_theme_button_img"
            id="theme_img"
          />
                ) :
              (
              <img
                src="/src/static/img/sunce.png"
                alt=""
                className="change_theme_button_img"
                id="theme_img"
              />
                )
                }
    </button>
      <div className="my_account_panel">
        <img src="/src/static/img/giga.jpg" alt="pupil" className="avatar" />
        <span className="ime_i" translate="no">
          loading...
        </span>
        <span className="familija" translate="no">
          loading...
        </span>
      </div>
  </div>
  <div className="message_navig_panel">
    <div style={{ borderBottom: "1px solid rgb(138, 138, 138)" }}>
      <Link className="navig_panel_button" to="/">
        <img
          src="/src/static/img/search.png"
          alt=""
          style={{ width: 50, height: 50, marginLeft: 10 }}
        />
        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['find']}</span>
      </Link>
      <Link className="navig_panel_button" to="/message_list/">
        <img
          src="/src/static/img/messagebutwhite.png"
          alt=""
          style={{ width: 50, height: 50, marginLeft: 10 }}
        />

        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['messages']}</span>
      </Link>
      <Link className="navig_panel_button" to="/saved/">
        <img
          src="/src/static/img/srce.png"
          alt=""
          style={{ width: 50, height: 50, marginLeft: 10 }}
        />
        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['saved']}</span>
      </Link>
      <Link className="navig_panel_button" id="only_for_fon">
        <img
          src="/src/static/img/giga.jpg"
          alt=""
          className="avatar"
        />
      </Link>
    </div>
    <div style={{ borderBottom: "1px solid rgb(138, 138, 138)" }}  id="not_for_fon">
      <Link className="navig_panel_button" id="not_for_fon" to="/settings/">
        <img
          src="/src/static/img/setting.png"
          alt=""
          style={{ width: 50, height: 50, marginLeft: 10 }}
        />
        <span className="text_in_panel">{arrLang[lang]['setting']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon" to="/message_list/support/">
        <img
          src="/src/static/img/support.png"
          alt=""
          style={{ width: 50, height: 50, marginLeft: 10 }}
        />
        <span className="text_in_panel">{arrLang[lang]['support']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon" to="/about_us/">
        <img src="/src/static/img/dj.png" alt="" style={{ width: 50, height: 50, marginLeft: 10 }} />
        <span className="text_in_panel">{arrLang[lang]['about']}</span>
      </Link>
    </div>
  </div>


</>

  )
}

export default AppMessLoad
