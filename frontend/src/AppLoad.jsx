import { useState, useEffect, state, handleChange, handleSubmit, setStat }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Docks from '/src/elems/docks.jsx'
import arrLangNavigPanel from '/languages/nav_panel.js'
import axios from 'axios';


function AppLoad({ lang, messNumb, lessons }) {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const theme = getCookie('theme');

    
//console.log(if_teach);

  return (
      <>
  <div className="top_banner">
    <div className='top_panel_under_topbanner'>
        <div className="name_of_comp" translate="no">
          DayLang
        </div>
    </div>
    {/*<div className="search_all_pos">
      <div id="search_all">
          <button className="clear_mes_butt"><img src="/src/static/img/delete.png" alt="" className="clear_mes_butt_img" id="delete"/></button>
          <button className="search_butt" ><img src="/src/static/img/search.png" alt="" className="search_butt_img" id="search"/></button>
          <input type="text" name="Find" id="Finding" placeholder="Find" className="search_input_field"/>
      </div>
  </div>*/}
    
          <div className="my_account_panel">
            <img src="/src/static/img/nema.png" alt='user' className='avatar'/>
          </div>
  </div>
  <div className="navig_panel">
    <div className="app_navig_panel_razdel">
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/search.png"
          alt="main"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" key="about">{arrLangNavigPanel[lang]['find']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/srce.png"
          alt="saved"
          className="app_navig_panel_img on_desktop_panel"
        />
        <span className="text_in_panel" >{arrLangNavigPanel[lang]['saved']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/messagebutwhite.png"
          alt="message"
          className="app_navig_panel_img on_desktop_panel"
        />
        

        {messNumb > 0 && <div className="app_message_indicator" id="id_of_a_message_count">{messNumb}</div>}
        <span className="text_in_panel" >{arrLangNavigPanel[lang]['messages']}</span>
      </Link>
      <Link className="navig_panel_button">
        <img
          src="/src/static/img/my_lessons.png"
          alt="my lessons"
          className="app_navig_panel_img on_desktop_panel"
        />
        

        {lessons > 0 && <div className="app_lessons_indicator" id="id_of_a_message_count">{lessons}</div>}
        <span className="text_in_panel" >{arrLangNavigPanel[lang]['my_lessons']}</span>
      </Link>
      
      <a className="navig_panel_button"id="only_for_fon">
        <img
          src="/src/static/img/nema.png"
          alt="nema"
          className="avatar_in_panel"
        />
      </a>

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

export default AppLoad
