import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Degree_load from '/src/load_elems/degree_load.jsx'
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


function Degree() {

    
  const [groups, setGroup] = useState([0]);
  const [photoArray, setPhotoArray] = useState([]);
  const [ws, setWs] = useState(null);
  const [messNumb, setMessNumb] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = () =>{
      setPhotoIndex(prev => prev + 1);
  }
  const previosPhoto = () =>{
      setPhotoIndex(prev => prev - 1);
  }

useEffect(() => {

    const socket = new WebSocket(`${APIURL}/ws/some_path/${groups.join(',')}/`);

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

  document.querySelector("title").textContent = "Degree";
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);


  const [usernow, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  const [data3, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);

  const [scaledButtonId, setScaledButtonId] = useState(null);
  const [showPhotoBig, setShowPhotoBig] = useState(false);

  const toggleVisibility = () => {
      setShowPhotoBig(!showPhotoBig);
  };

  

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


  const [data12, setData12] = useState(null);
  const [loading12, setLoading12] = useState(true);
  const [error12, setError12] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/usersettings/${params.user}/`);
        setData1(response.data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);

//if (data1 != null && data1.i_am_teacher === true)

      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/userinfo/${params.user}/`);
        if (response.data.i_am_teacher === false)
        {
            window.location.replace(`/p/user/${params.user}/`)
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
        const response = await axios.get(`${APIURL}/userinfo/`);
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
        const response = await axios.get(`${APIURL}/get_degree_load/${params.user}/`);
        setData3(response.data);
        console.log(response.data);
        setPhotoArray((photoArray) => [...photoArray, response.data]);
      } catch (err) {
        setError3(err.message);
      } finally {
        setLoading3(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/getchatlist/`);
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

  if (loading) return (
      <>
      <AppLoad lang={langua}/>
      <Degree_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Degree_load/>
</>

  );
  if (error1) return <p>Error: {error}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua}/>
      <Degree_load/>
</>

  );
  if (error2) return <p>Error: {error}</p>;

    document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLang[lang]['degree']}`;

  if (loading3) return (
      <>
      <AppLoad lang={langua}/>
      <Degree_load/>
</>

  );
  if (error3) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Degree_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

  /*console.log(photoArray);
  console.log(photoArray[0].length);*/
  


    return (
        <>
        <App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={langua} if_teach={usernow.i_am_teacher} mess_count={messNumb} photo={usernow.photo} balance={usernow.balance}/>

<div className="find_panel">
  <div className="me_under_find">
    <ImageWithFallback src={data.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
    <div className="me_name_surname_panel">
      <span className="me_name" translate="no" >
        {data.first_name}
      </span>
      <span className="me_surname" translate="no">
        {data.last_name}
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


<div id="degree_page" >
  <div className="page_of_type">
      <Link to={`/t/user/${data.username}/`}>
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['main']}</span>
        </span>
      </div>
    </button>
    </Link>
    <Link to={`/t/user/${data.username}/degree`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button  me_selected">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['degree']}</span>
        </span>
      </div>
    </button>
    </Link>

    <Link to={`/t/user/${data.username}/feedback`}>
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
    <Link to={`/t/user/${data.username}/offers`}>
    <button
      style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}
    >
      <div className="me_div_of_button">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['offers']}</span>
        </span>
      </div>
    </button>
    </Link>
  </div>
  <div className="degree_page_around">
    <p className="degree_description_about" >{data1.about_my_degree}</p>
    <br />
    <br />
    {data3.map((photo) => (
            <button className="degree_button" onClick={() => toggleVisibility()} key={photo.id} style={{ transform: scaledButtonId === photo.id ? 'scale(4)' : 'scale(1)', transition: 'transform 0.3s ease',}}>
                <img src={photo.photo} alt="" className="degree_img" />
            </button>
    ))}
    </div>
</div>




</div>


{showPhotoBig && <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "fixed", width: "100vw",zIndex: 10000}}>
  <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 10, position: "fixed"}} onClick={() => toggleVisibility()} ></div>
      
          <button className="degree_button" style={{ transform: 'scale(4)', transition: 'transform 0.3s ease', zIndex: 11}}>
              <img src={photoArray[0][photoIndex].photo} alt={`degreephotoBig`} className="degree_img" />
          </button>
          {photoArray[0].length > (photoIndex + 1) && 
            <div style={{ position: "fixed", right: 0, zIndex: 11 }} onClick={nextPhoto}>
              <img src="/src/static/img/next_photo.png" alt="" style={{width: 100, height: 100}}/>
            </div>}
          {photoIndex > 0 && 
            <div style={{ position: "fixed", left: 0, zIndex: 11 }} onClick={previosPhoto}>
              <img src="/src/static/img/next_photo.png" alt="" style={{width: 100, height: 100, transform: "rotate(180deg)"}}/>
            </div>}
          
  </div>}

</>

  )
}

export default Degree
