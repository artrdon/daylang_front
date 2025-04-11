import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import My_pup_load from '/src/load_elems/me_pup_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="me_avatar"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}

function Me_pup() {

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const [messNumb, setMessNumb] = useState(null);

useEffect(() => {

    const socket = new WebSocket(`${WSAPIURL}/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const dataMess = JSON.parse(event.data);

        console.log(dataMess);
        if (dataMess.tip === "delete"){
            let i_read = true;
            for (let i = 0; dataMess.if_readed.length > i; i++){
                console.log(dataMess.if_readed[i]);
                console.log(data.username);
                if (dataMess.if_readed[i] === data.username){
                  console.log("i_read");
                  i_read = false;
                }
            }
            if (i_read)
              setMessNumb(prev => prev - 1);
            return;
        }

        if (dataMess.tip === "send"){
            setMessNumb(prev => prev + 1);
            return;
        }

         //   document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [groups]);


    const [count, setCount] = useState(0)
    let params = useParams();
    if (params.user === "undefined")
{
    window.location.replace(`/log/`);
    return;
}

    document.querySelector("title").textContent = "Me";

    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);

  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [usernow, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

axios.defaults.withCredentials = true;


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


    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;


  const [data12, setData12] = useState(null);
  const [loading12, setLoading12] = useState(true);
  const [error12, setError12] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${WSAPIURL}/usersettings/${params.user}/`);
        setData1(response.data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);


//if (data1 != null && data1.i_am_teacher === false)

      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${WSAPIURL}/userinfo/${params.user}/`);
        if (response.data.i_am_teacher === true)
        {
            window.location.replace(`/t/user/${params.user}/`)
        }
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);






  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${WSAPIURL}/userinfo/`);
        setData2(response.data);
      } catch (err) {
        setError2(err.message);
      } finally {
        setLoading2(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${WSAPIURL}/getchatlist/`);
        if (response.data != null){
            for (let i = 0; i < response.data[0].length; i++){
                console.log(response.data[0][i].id);
                setGroup((groups) => [...groups, response.data[0][i].id]);
            }
        }
        setData12(response.data);
        setMessNumb(response.data[1]);
      } catch (err) {
        setError12(err.message);
      } finally {
        setLoading12(false);
      }
    };

    fetchData();
  }, []);


    var arrLang = {
      'English': {
          'main': "Main",
          'degree': 'Degree / Certificate',
          'feedback': 'Reviews',
          'offers': 'Offers',
      },
      'Русский': {
          'main': "Главная",
          'degree': 'Диплом / Сертификат',
          'feedback': 'Отзывы',
          'offers': 'Предложения',
      },
      'Srpski': {
          'main': "Glavni",
          'degree': 'Diploma / Sertificat',
          'feedback': 'Recenzije',
          'offers': 'Predlozi',
      },
      'Српски': {
          'main': "Главни",
          'degree': 'Диплома / Сертификат',
          'feedback': 'Рецензије',
          'offers': 'Предлози',
      },
      'Deutsch': {
          'main': "Wichtigsten",
          'degree': 'Abschluss / Zertifikat',
          'feedback': 'Gästebewertungen',
          'offers': 'Wohnen',
      },
      'Español': {
          'main': "Principal",
          'degree': 'Título / Certificado',
          'feedback': 'Reseñas',
          'offers': 'Ofertas',
      },
      'عربي': {
          'main': "الرئيسية",
          'degree': 'درجة / شهادة',
          'feedback': 'التعليقات',
          'offers': 'العروض',
      }

    }



  if (loading) return (
      <>
      <AppLoad lang={langua}/>
      <My_pup_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <My_pup_load/>
</>

  );
  if (error1) return <p>Error: {error}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua}/>
      <My_pup_load/>
</>

  );
  if (error2) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <My_pup_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

console.log(data);

document.querySelector("title").textContent = `${data.first_name} ${data.last_name}`;
    return (
        <>
        <App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={langua} if_teach={usernow.i_am_teacher} mess_count={messNumb} photo={usernow.photo} balance={usernow.balance}/>

  <div className="find_panel">
  <div className="me_under_find">
    <ImageWithFallback src={data.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
        {data.first_name} {data.last_name}
      </span>
      {(() => {
        if (data.real_man === true) {
          return <img src="/src/static/img/confirmed.png" alt="" className="me_real_pers" />;
        }
      })()}

    </div>
    {(() => {
        if (data.username === usernow.username) {
          return (<> <a href="/settings/" className="me_setting_ref">
                        <img src="/src/static/img/setting.png" alt="" className="me_setting_img"/>
                     </a> </>)
        }
      })()}

  </div>

<div id="main_page" style={{ display: "block" }}>
  <div className="page_of_type">
     <Link to={`/p/user/${data.username}/`}>
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button me_selected" >
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['main']}</span>
        </span>
      </div>
    </button>
    </Link>

    <Link to={`/p/user/${data.username}/feedback`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['feedback']}</span>
        </span>
      </div>
    </button>
    </Link>
  </div>
  <div className="me_description_offer" >
{data1.about_myself}
  </div>
</div>


</div>


</>

  )
}

export default Me_pup
