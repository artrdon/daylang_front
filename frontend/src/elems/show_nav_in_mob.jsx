import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import arrLangNavigPanel from '/languages/nav_panel.js'

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
  

function ShowNavInMob({setByeFunc, setshowOtherInNav, show, lang, myphoto, username, ref, money, firstname, lastname, change_theme, theme, showHistoryOfTopUp}) {
  
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
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 1000, position: "fixed"}} onClick={show} />
    <div className={`show_nav_in_mob_nav_panel`} ref={ref}>
        <div style={{ overflow: "auto", width: "100%", height: "100%" }}>
        <div className='show_nav_in_mob_main_info'>
                        <Link className="show_nav_in_mob_nav_panel_botton_main" to={`/user/${username}/`}>
                            <ImageWithFallbackPanel src={myphoto} alt='me' fallbackSrc="/src/static/img/nema.png"/>
                            <span className='show_nav_in_mob_button_text_color' style={{overflowWrap: 'anywhere', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',}}>{firstname} {lastname}</span>
                            
                        </Link>
                        <div className="show_nav_in_mob_nav_panel_botton_main">
                            <div style={{display: 'block'}}>
                              <p className='top_panel_balance'>{arrLangNavigPanel[lang]['balance']}: {money} <img src="/src/static/img/coin.png" alt="internal_currency" className='internal_currency'/></p>
                            </div>
                        </div>
                        <button className="show_nav_in_mob_nav_panel_botton_main" onClick={setByeFunc}>
                            <div style={{display: 'block'}}>
                              <p className='top_panel_balance'>{arrLangNavigPanel[lang]['top_up']}</p>
                            </div>
                        </button>
                        <button className="show_nav_in_mob_nav_panel_botton_main" onClick={showHistoryOfTopUp}>
                            <div style={{display: 'block'}}>
                              <p className='top_panel_balance'>{arrLangNavigPanel[lang]['history_of_operations']}</p>
                            </div>
                        </button>
                        <div className="show_nav_in_mob_nav_panel_botton_main">
                            <p className='top_panel_balance'>{arrLangNavigPanel[lang]['theme']} </p>
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
                <Link className="show_nav_in_mob_nav_panel_botton" to="https://t.me/day_lang" target='_blank'>
                  <img src="/src/static/img/TGLogo.svg" alt="We" className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img" />
                  <span className='show_nav_in_mob_button_text_color'>Мы в Telegram</span>
                </Link>
                <div style={{borderTop: '1px solid'}}></div>
                <a className="show_nav_in_mob_nav_panel_botton" href='/privacy/' target='_blank'>
                  <span className='show_nav_in_mob_button_text_color'>{arrLangNavigPanel[lang]['privacy_policy']}</span>
                </a>
                <a className="show_nav_in_mob_nav_panel_botton" href='/public_oferta/' target='_blank'>
                  <span className='show_nav_in_mob_button_text_color'>Оферта</span>
                </a>
                <div style={{borderTop: '1px solid'}}></div>
        </div>
    </div>

    </>

  )
}

export default ShowNavInMob
