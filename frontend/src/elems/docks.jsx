import arrLangNavigPanel from '/languages/nav_panel.js'


function Docks({lang}) {


return (
    <>

    <div style={{ color: "white", width: "calc(100% - 60px)", height: 30, position: "absolute", bottom: 0, zIndex: 1000, margin: 10, padding: 20}} id="not_for_fon" >
        <p><a href={'/src/static/docks/pryvacy.pdf'} className='app_policy_text_color'>{arrLangNavigPanel[lang]['privacy_policy']}</a></p>
    </div>

    </>

  )
}

export default Docks
