import { useState, }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import arrLangNavigPanel from '/languages/nav_panel.js'
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


function AppMessLoad({ lang, messNumb, lessons }) {

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

  return (
      <>
  <div className="message_top_banner">
    <div className='top_panel_under_topbanner'>
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
        <span className="text_in_panel" id="not_for_fon">{arrLangNavigPanel[lang]['find']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/srce.png"
          alt="saved"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" id="not_for_fon">{arrLangNavigPanel[lang]['saved']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/messagebutwhite.png"
          alt="mess"
          className="app_navig_panel_img on_desktop_panel"
        />
        
        {messNumb > 0 && messNumb < 100 && <div className="app_message_indicator" id="id_of_a_message_count">{messNumb}</div>}
        {messNumb > 99 && <div className="app_message_indicator handredmore" id="id_of_a_message_count">+99</div>}

        <span className="text_in_panel" id="not_for_fon">{arrLangNavigPanel[lang]['messages']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/my_lessons.png"
          alt="my lesson"
          className="app_navig_panel_img on_desktop_panel"
        />
        
        {lessons > 0 && lessons < 100 && <div className="app_lessons_indicator" id="id_of_a_message_count">{lessons}</div>}
        {lessons > 99 && <div className="app_lessons_indicator handredmore" id="id_of_a_message_count">+99</div>}


        <span className="text_in_panel" id="not_for_fon">{arrLangNavigPanel[lang]['my_lessons']}</span>
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
        <span className="text_in_panel">{arrLangNavigPanel[lang]['setting']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon">
        <img
          src="/src/static/img/support.png"
          alt="support"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel">{arrLangNavigPanel[lang]['support']}</span>
      </Link>
      <Link className="navig_panel_button" id="not_for_fon">
        <img src="/src/static/img/dj.png" alt="about us" className="app_navig_panel_img on_desktop_panel" />
        <span className="text_in_panel">{arrLangNavigPanel[lang]['about']}</span>
      </Link>
      <Docks lang={lang}/>
    </div>
  </div>


</>

  )
}

export default AppMessLoad
