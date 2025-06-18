import { useState, useEffect, state, handleChange, handleSubmit, setState, useRef }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
import Cookie from '/src/elems/cookie.jsx'
import Docks from '/src/elems/docks.jsx'
import DoBye from './elems/do_bye';
import ShowNavInMob from '/src/elems/show_nav_in_mob.jsx'
import arrLangNavigPanel from '/languages/nav_panel.js'
import HistoryOfTopUpComp from './elems/history_of_topup';
import axios from 'axios';

function ImageWithFallback({ src, fallbackSrc, alt, style}) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="avatar"
      src={imgSrc}
      alt={alt}
      style={style}
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



function App({ name, lastname, username, lang, lessons, photo, balance }) {

  const nodeRef = useRef(null);
  const refForBye = useRef(null);
  const refHistoryTopUp = useRef(null)
  const [showOtherInNav, setshowOtherInNav] = useState(false);
  const [showDesktopPanel, setshowDesktopPanel] = useState(false);
  const [bye, setBye] = useState(false);
  const [historyOfTopUp, setHistoryOfTopUp] = useState(false);

  const showHistoryOfTopUp = () => {
    setHistoryOfTopUp(!historyOfTopUp);
  }

  const ShowDesktop = () =>{
    setshowDesktopPanel(!showDesktopPanel);
  }

  const setByeFunc = () =>{
    setBye(!bye);
  }

  const showNav = () =>{
    if (showOtherInNav)
    {
      setshowOtherInNav(false);
      //document.querySelector('body').style.overflow = 'auto';
    }
    else{
      setshowOtherInNav(true);
      //document.querySelector('body').style.overflow = 'hidden';
    }
  }

  
  /*if (window.trustedTypes?.createPolicy) {
    trustedTypes.createPolicy('defaults', {
        createHTML: (html) => html.replace(/<iframe[^>]*onload\s*=[^>]+>/gi, ''),
        createScriptURL: url => url.replace(/javascript:/gi, 'blocked:')
    });
  }
*/


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    const theme = getCookie('theme');
    //console.log(getCookie('theme'));
    
    
    
    
    const change_theme = () => {
        if (document.querySelector('body').className === "dark_theme")
        {
            document.cookie = "theme=light; path=/;max-age=31556926";
            location.reload();
        }
        else
        {
            document.cookie = "theme=dark; path=/;max-age=31556926";
            location.reload();
        }
    }


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
    
    {username === undefined ? 
    (
      <Link to={`/log/`}>
        <div className="my_account_panel" style={{ right: 40 }}>
          <img src="/src/static/img/nema.png" alt="log" className="avatar" />
          <span className="ime_i" translate="no" style={{ top: 15, fontSize: 20 }}>
            Login
          </span>
        </div>
      </Link>
    )
      :
    (
      <>
          <button onClick={ShowDesktop}>
            <div className="my_account_panel">
              <ImageWithFallback src={photo} alt={username} fallbackSrc="/src/static/img/nema.png"/>
            </div>
          </button>
          {showDesktopPanel &&
            <div className='show_nav_in_desktop'>
              <div className='show_nav_in_desktop_section'>
                <Link to={`/user/${username}/`} style={{width: 50, display: "inline-block", left: 10, position: "relative", borderRadius: "50%"}}>
                  <ImageWithFallback src={photo} alt={username} fallbackSrc="/src/static/img/nema.png" style={{position: "relative", display: "block"}}/>
                </Link>
                <span className="ime message_list_span_of_mess" translate="no" style={{position: "absolute", left: 90, top: 25, width: "calc(100% - 120px)"}}>
                  {name} {lastname}
                </span>
                <div className='show_nav_in_desktop_section_main'>
                    <p className='top_panel_balance_desktop'>{arrLangNavigPanel[lang]['balance']}: {balance} <img src="/src/static/img/coin.png" alt="internal_currency" className='internal_currency_mini'/></p>
                </div>
                <button className='show_nav_in_desktop_section_main' onClick={setByeFunc}>
                    <p className='top_panel_balance_desktop'>{arrLangNavigPanel[lang]['top_up']}</p>
                </button>
                <button className='show_nav_in_desktop_section_main' onClick={showHistoryOfTopUp}>
                    <p className='top_panel_balance_desktop'>{arrLangNavigPanel[lang]['history_of_operations']}</p>
                </button>
                <div className='show_nav_in_desktop_section_main'>
                  
                  <p className='top_panel_balance_desktop'>{arrLangNavigPanel[lang]['theme']}</p>
                  <button className="change_theme_button_desktop" onClick={change_theme}>
                  {theme === "dark" ? (
                    <img
                      src="/src/static/img/moon.png"
                      alt="dark"
                      className="change_theme_button_img"
                      id="theme_img"
                    />
                    )
                    :
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
              </div>
              </div>
            </div>
          }
        </>
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
        <span className="text_in_panel" key="about">{arrLangNavigPanel[lang]['find']}</span>
      </Link>
      {username === undefined &&
        <Link className="navig_panel_button" to="/log/">
          
          <span className="text_in_panel">Login</span>
        </Link>
      }
      {!(username === undefined) &&
        <>
          <Link className="navig_panel_button" to="/my_words/">
            <img
              src="/src/static/img/my_lessons.png"
              alt="my lessons"
              className="app_navig_panel_img on_desktop_panel"
            />

            <span className="text_in_panel">{arrLangNavigPanel[lang]['my_words']}</span>
          </Link>
        </>
      }
      
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
              <span className="text_in_panel" key="about">{arrLangNavigPanel[lang]['me']}</span>
            </button>
          )


      }

    </div>
    <div className='border_for_areas_of_nav_panel' >
      {!(username === undefined) &&
        <>
          <Link className="navig_panel_button" id="not_for_fon" to="/settings/">
            <img
              src="/src/static/img/setting.png"
              alt="settings"
              className="app_navig_panel_img on_desktop_panel"
            />
            <span className="text_in_panel">{arrLangNavigPanel[lang]['setting']}</span>
          </Link>
          <Link className="navig_panel_button" id="not_for_fon" to="/support/">
            <img
              src="/src/static/img/support.png"
              alt="support"
              className="app_navig_panel_img on_desktop_panel"
            />
            <span className="text_in_panel">{arrLangNavigPanel[lang]['support']}</span>
          </Link>
        </>
      }
      <Link className="navig_panel_button" id="not_for_fon" to="/about_us/">
        <img src="/src/static/img/dj.png" alt="about us" className="app_navig_panel_img on_desktop_panel" />
        <span className="text_in_panel">{arrLangNavigPanel[lang]['about']}</span>
      </Link>
      
      <Cookie lang={lang}/>
    </div>
    <div className='border_for_areas_of_nav_panel'>
      <Link className="navig_panel_button" id="not_for_fon" to="https://t.me/day_lang" target='_blank'>
        <img src="/src/static/img/TGLogo.svg" alt="We" className="app_navig_panel_img on_desktop_panel" />
        <span className="text_in_panel">Мы в Telegram</span>
      </Link>
    </div>
    <Link className="navig_panel_button" id="not_for_fon" to='/privacy/'>
      <span className="text_in_panel">{arrLangNavigPanel[lang]['privacy_policy']}</span>
    </Link>
    <Link className="navig_panel_button" id="not_for_fon" to='/public_oferta/' target='_blank'>
      <span className="text_in_panel">Оферта</span>
    </Link>
  
      
  </div>

<CSSTransition
  in={showOtherInNav}
  timeout={300}
  classNames="show_nav_in_mob_nav_panel"
  unmountOnExit
  nodeRef={nodeRef}
>
    <ShowNavInMob showHistoryOfTopUp={showHistoryOfTopUp} setByeFunc={setByeFunc} setshowOtherInNav={setshowOtherInNav} ref={nodeRef} show={showNav} lang={lang} myphoto={photo} username={username} money={balance} firstname={name} lastname={lastname} change_theme={change_theme} theme={theme}/>

</CSSTransition>

<CSSTransition
  in={bye}
  timeout={300}
  classNames="do_bye_panel"
  unmountOnExit
  nodeRef={refForBye}
>
    <DoBye ref={refForBye} setBye={setBye} lang={lang} />

</CSSTransition>


<CSSTransition
  in={historyOfTopUp}
  timeout={300}
  classNames="do_bye_panel"
  unmountOnExit
  nodeRef={refHistoryTopUp}
>
    <HistoryOfTopUpComp ref={refHistoryTopUp} setBye={setHistoryOfTopUp} lang={lang} />

</CSSTransition>

</>

  )
}

export default App
