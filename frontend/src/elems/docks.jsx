import arrLangNavigPanel from '/languages/nav_panel.js'


function Docks({lang}) {


return (
    <>

    <div style={{ color: "white", width: "calc(100% - 60px)", position: "absolute", bottom: 0, zIndex: 1000, margin: 10, padding: 20}} id="not_for_fon" >
        <p><a href={'/privacy/'} className='app_policy_text_color' target='_blank'>{arrLangNavigPanel[lang]['privacy_policy']}</a></p>
        <p><a href={'/public_oferta/'} className='app_policy_text_color' target='_blank'>Оферта</a></p>
    </div>

    </>

  )
}

export default Docks
