import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import arrLangNavigPanel from '/languages/nav_panel.js'
import Message from '/src/pages/message.jsx'
import Docks from '/src/elems/docks.jsx'

function ImageWithFallbackPanel({ src, fallbackSrc, alt, }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className="avatar_in_panel show_nav_in_mob_nav_panel_img"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }
  

function ShowNavInMob({setshowOtherInNav, show, lang, myphoto, ifteach, username, ref, money, firstname, lastname, change_theme, theme}) {
  
      useEffect(() => {
        let start = 0;
        let end = 0;
    
        document.addEventListener('touchstart', () => {
          start = event.changedTouches[0].clientX;
        });
    
        document.addEventListener('touchend', () => {
          end = event.changedTouches[0].clientX;
          let delta = start - end;
          //console.log(delta);
          if (delta > 40) {
            setshowOtherInNav(false);
            document.querySelector('body').style.overflow = 'auto';
          }
        });
      }, []);

return (
    <>
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 1000, position: "fixed"}} onClick={show} ></div>
    <div className={`show_nav_in_mob_nav_panel`} ref={ref}>
        <div style={{ overflow: "auto", width: "100%", height: "100%" }}>
                {ifteach === true ? 
                    (
                      <div className='show_nav_in_mob_main_info'>
                        <Link className="show_nav_in_mob_nav_panel_botton_main" to={`/t/user/${username}/`}>
                            <ImageWithFallbackPanel src={myphoto} alt='me' fallbackSrc="/src/static/img/nema.png"/>
                            <span className='show_nav_in_mob_button_text_color' style={{overflowWrap: 'anywhere', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',}}>{firstname} {lastname}</span>
                            
                        </Link>
                        <div className="show_nav_in_mob_nav_panel_botton_main">
                            <div style={{display: 'block'}}>
                              <p className='top_panel_balance'>Current balance: {money}₽</p>
                            </div>
                        </div>
                        <div className="show_nav_in_mob_nav_panel_botton_main">
                            <p className='top_panel_balance'>Theme </p>
                            <button className="change_theme_button" onClick={change_theme}>
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
                    ) 
                    : 
                    (
                      <div className='show_nav_in_mob_main_info'>
                        <Link className="show_nav_in_mob_nav_panel_botton_main" to={`/p/user/${username}/`}>
                            <ImageWithFallbackPanel src={myphoto} alt='me' fallbackSrc="/src/static/img/nema.png"/>
                            <span className='show_nav_in_mob_button_text_color' style={{overflowWrap: 'anywhere', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',}}>{firstname} {lastname}</span>
                        </Link>
                        <div className="show_nav_in_mob_nav_panel_botton_main">
                            <p className='top_panel_balance'>Theme </p>
                            <button className="change_theme_button" onClick={change_theme}>
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
                    )
                }
                
                <Link className="show_nav_in_mob_nav_panel_botton" to="/settings/">
                <img
                    src="/src/static/img/setting.png"
                    alt="settings"
                    className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img"
                />
                <span className='show_nav_in_mob_button_text_color'>{arrLangNavigPanel[lang]['setting']}</span>
                </Link>
                <Link className="show_nav_in_mob_nav_panel_botton" to="/support/">
                <img
                    src="/src/static/img/support.png"
                    alt="support"
                    className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img"
                />
                <span className='show_nav_in_mob_button_text_color'>{arrLangNavigPanel[lang]['support']}</span>
                </Link>
                <Link className="show_nav_in_mob_nav_panel_botton" to="/about_us/">
                <img src="/src/static/img/dj.png" alt="about us" className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img" />
                <span className='show_nav_in_mob_button_text_color'>{arrLangNavigPanel[lang]['about']}</span>
                </Link>
                <div style={{borderTop: '1px solid'}}></div>
                <Link className="show_nav_in_mob_nav_panel_botton" to='/src/static/docks/pryvacy.pdf'>
                {/*<img
                    src="/src/static/img/support.png"
                    alt="support"
                    className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img"
                />*/}
                <span className='show_nav_in_mob_button_text_color'>Политика конфиденциальности</span>
                </Link>
        </div>
    </div>

    </>

  )
}

export default ShowNavInMob
