import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import Docks from '/src/elems/docks.jsx'

function ImageWithFallbackPanel({ src, fallbackSrc, alt, }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className="avatar_in_panel on_desktop_panel show_nav_in_mob_nav_panel_img"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }
  

function ShowNavInMob({show, lang, myphoto}) {
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
  

return (
    <>
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 10, position: "fixed"}} onClick={show} ></div>
    <div style={{ backgroundColor: "#242424", width: "100vw", height: "80%", position: "fixed", bottom: 0, zIndex: 1000, }}>
        <div style={{ overflow: "auto", width: "100%", height: "100%" }}>
                <Link className="show_nav_in_mob_nav_panel_botton" to="/settings/">
                <ImageWithFallbackPanel src={myphoto} alt='me' fallbackSrc="/src/static/img/nema.png"/>
                <span className='show_nav_in_mob_button_text_color'>Me</span>
                </Link>
                <Link className="show_nav_in_mob_nav_panel_botton" to="/settings/">
                <img
                    src="/src/static/img/setting.png"
                    alt="settings"
                    className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img"
                />
                <span className='show_nav_in_mob_button_text_color'>{arrLang[lang]['setting']}</span>
                </Link>
                <Link className="show_nav_in_mob_nav_panel_botton" to="/message_list/support/">
                <img
                    src="/src/static/img/support.png"
                    alt="support"
                    className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img"
                />
                <span className='show_nav_in_mob_button_text_color'>{arrLang[lang]['support']}</span>
                </Link>
                <Link className="show_nav_in_mob_nav_panel_botton" to="/about_us/">
                <img src="/src/static/img/dj.png" alt="about us" className="app_navig_panel_img on_desktop_panel show_nav_in_mob_nav_panel_img" />
                <span className='show_nav_in_mob_button_text_color'>{arrLang[lang]['about']}</span>
                </Link>
                <Docks />
        </div>
    </div>

    </>

  )
}

export default ShowNavInMob
