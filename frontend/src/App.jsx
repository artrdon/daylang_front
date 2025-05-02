import { useState, useEffect, state, handleChange, handleSubmit, setState, useRef }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
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
import Cookie from '/src/elems/cookie.jsx'
import Docks from '/src/elems/docks.jsx'
import ShowNavInMob from '/src/elems/show_nav_in_mob.jsx'
import axios from 'axios';

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

function ImageWithFallbackPanel({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="avatar_in_panel"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}



function App({ name, lastname, username, lang, if_teach, mess_count, photo, balance }) {

  const nodeRef = useRef(null);
  const [showOtherInNav, setshowOtherInNav] = useState(false);

  const showNav = () =>{
    if (showOtherInNav)
    {
      setshowOtherInNav(false);
    }
    else{
      setshowOtherInNav(true);
    }
  }

  
  if (window.trustedTypes?.createPolicy) {
    trustedTypes.createPolicy('defaults', {
        createHTML: (html) => html.replace(/<iframe[^>]*onload\s*=[^>]+>/gi, ''),
        createScriptURL: url => url.replace(/javascript:/gi, 'blocked:')
    });
}



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

    const arrLang = {
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

//console.log(if_teach);

  return (
      <>
  <div className="top_banner">
    <div className='top_panel_under_topbanner'>
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
    <button className="change_theme_button" onClick={change_theme}>

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
      {(() => {
        if (if_teach) {
          return <p className='top_panel_balance' >{balance}₽</p>;
        }
      })()}

          {username === undefined ? (
          <Link to={`/log/`}>
              <div className="my_account_panel" style={{ right: 40 }}>
                <img src="/src/static/img/nema.png" alt="log" className="avatar" />
                <span className="ime_i" translate="no" style={{ top: 15, fontSize: 20 }}>
                  Login
                </span>
              </div>
            </Link>
                ) :
              (
              if_teach === true ? (
          <Link to={`/t/user/${username}/`}>
              <div className="my_account_panel">
                <ImageWithFallback src={photo} alt={username} fallbackSrc="/src/static/img/nema.png"/>
              </div>
            </Link>
                ) :
              (
              <Link to={`/p/user/${username}/`}>
                  <div className="my_account_panel">
                    <ImageWithFallback src={photo} alt={username} fallbackSrc="/src/static/img/nema.png"/>
                  </div>
                </Link>
                )
                )


                }
  </div>
  <div className="navig_panel">
    <div className="app_navig_panel_razdel">
      <Link className="navig_panel_button" to="/">
        <img
          src="/src/static/img/search.png"
          alt="main"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" id="not_for_fon" key="about">{arrLang[lang]['find']}</span>
      </Link>
      <Link className="navig_panel_button" to="/saved/">
        <img
          src="/src/static/img/srce.png"
          alt="saved"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['saved']}</span>
      </Link>
      <Link className="navig_panel_button" to="/message_list/">
        <img
          src="/src/static/img/messagebutwhite.png"
          alt="message"
          className="app_navig_panel_img on_desktop_panel"
        />
        

        {mess_count > 0 && <div className="app_message_indicator" id="id_of_a_message_count">{mess_count}</div>}

        <span className="text_in_panel" id="not_for_fon">{arrLang[lang]['messages']}</span>
      </Link>
      <Link className="navig_panel_button" to="/my_lessons/">
        <img
          src="/src/static/img/my_lessons.png"
          alt="my lessons"
          className="app_navig_panel_img on_desktop_panel"
        />
        

        {mess_count > 0 && <div className="app_lessons_indicator" id="id_of_a_message_count">{mess_count}</div>}

        <span className="text_in_panel" id="not_for_fon">My lessons</span>
      </Link>
      
      {username === undefined ? (
          <a className="navig_panel_button" href={`/log/`} id="only_for_fon">
            <img
              src="/src/static/img/nema.png"
              alt="nema"
              className="avatar_in_panel"
            />
          </a>
            ) :
          (
            <button className="navig_panel_button" id="only_for_fon" onClick={showNav}>
              <ImageWithFallbackPanel src={photo} alt={username} fallbackSrc="/src/static/img/nema.png"/>
            </button>
          )


      }

    </div>
    <div style={{ borderBottom: "1px solid rgb(138, 138, 138)" }}  id="not_for_fon">
      <Link className="navig_panel_button" id="not_for_fon" to="/settings/">
        <img
          src="/src/static/img/setting.png"
          alt="settings"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel">{arrLang[lang]['setting']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon" to="/support/">
        <img
          src="/src/static/img/support.png"
          alt="support"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel">{arrLang[lang]['support']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon" to="/about_us/">
        <img src="/src/static/img/dj.png" alt="about us" className="app_navig_panel_img on_desktop_panel" />
        <span className="text_in_panel">{arrLang[lang]['about']}</span>
      </Link>
      <Cookie />
      <Docks />
    </div>
  </div>

<CSSTransition
  in={showOtherInNav}
  timeout={300}
  classNames="show_nav_in_mob_nav_panel"
  unmountOnExit
  nodeRef={nodeRef}
>
    <ShowNavInMob setshowOtherInNav={setshowOtherInNav} ref={nodeRef} show={showNav} lang={lang} myphoto={photo} ifteach={if_teach} username={username}/>

</CSSTransition>

</>

  )
}

export default App
