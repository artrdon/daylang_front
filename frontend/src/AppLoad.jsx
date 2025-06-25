import { useState, useEffect, state, handleChange, handleSubmit, setStat }  from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Docks from '/src/elems/docks.jsx'
import arrLangNavigPanel from '/languages/nav_panel.js'
import axios from 'axios';


function AppLoad({ lang, lessons }) {
    
  return (
      <>
  <div className="top_banner">
    <div className='top_panel_under_topbanner'>
        <h1 className="name_of_comp" translate="no">
          DayLang
        </h1>
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
          src="/src/static/img/my_lessons.png"
          alt="my lessons"
          className="app_navig_panel_img on_desktop_panel"
        />

        
        <span className="text_in_panel" >{arrLangNavigPanel[lang]['my_words']}</span>
      </Link>
      
      <div className="navig_panel_button" id="only_for_fon">
        <img
          src="/src/static/img/nema.png"
          alt="nema"
          className="avatar_in_panel"
        />
        <span className="text_in_panel" key="about">{arrLangNavigPanel[lang]['me']}</span>
      </div>

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
    </div>
    <div className='border_for_areas_of_nav_panel'>
      <Link className="navig_panel_button" id="not_for_fon">
        <img src="/src/static/img/TGLogo.svg" alt="We" className="app_navig_panel_img on_desktop_panel" style={{filter: 'brightness(100%)'}} />
        <span className="text_in_panel">Мы в Telegram</span>
      </Link>
    </div>
    <Link className="navig_panel_button" id="not_for_fon">
      <span className="text_in_panel">{arrLangNavigPanel[lang]['privacy_policy']}</span>
    </Link>
    <Link className="navig_panel_button" id="not_for_fon">
      <span className="text_in_panel">Оферта</span>
    </Link>
  
  </div>


</>

  )
}

export default AppLoad
