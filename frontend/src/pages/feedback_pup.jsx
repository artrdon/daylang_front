import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Feedback_pup_load from '/src/load_elems/feedback_pup_load.jsx'
import axios from 'axios';


function Feedback_pup() {

    const [count, setCount] = useState(0)
    let params = useParams();
    if (params.user === "undefined")
{
    window.location.replace(`/log/`);
    return;
}

    document.querySelector("title").textContent = "Feedback";

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


    const [data4, setData4] = useState(null);
  const [loading4, setLoading4] = useState(true);
  const [error4, setError4] = useState(null);

axios.defaults.withCredentials = true;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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
        const response = await axios.get(`http://127.0.0.1:8000/userinfo/${params.user}/`);
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
        const response = await axios.get(`http://127.0.0.1:8000/usersettings/${params.user}/`);
        if (response.data.i_am_teacher === true)
        {
            window.location.replace(`/t/user/${params.user}/feedback/`)
        }
        setData1(response.data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/userinfo/`);
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
        const response = await axios.get(`http://127.0.0.1:8000/reviewsmy/${params.user}/`);
        setData3(response.data);
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
        const response = await axios.get(`http://127.0.0.1:8000/reviews/${params.user}/`);
        setData4(response.data);
      } catch (err) {
        setError4(err.message);
      } finally {
        setLoading4(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getchatlist/');
        setData12(response.data);
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
      <Feedback_pup_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Feedback_pup_load/>
</>

  );
  if (error1) return <p>Error: {error}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua}/>
      <Feedback_pup_load/>
</>

  );
  if (error2) return <p>Error: {error}</p>;


  if (loading3) return (
      <>
      <AppLoad lang={langua}/>
      <Feedback_pup_load/>
</>

  );
  if (error3) return <p>Error: {error}</p>;

  if (loading4) return (
      <>
      <AppLoad lang={langua}/>
      <Feedback_pup_load/>
</>

  );
  if (error4) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Feedback_pup_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLang[lang]['feedback']}`;

    return (
        <>
        <App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={langua} if_teach={usernow.i_am_teacher} mess_count={data12[1]} photo={usernow.photo}/>

              <div className="find_panel">
  <div className="me_under_find">
    <img src={data.photo} alt="" className="me_avatar"/>
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

<div id="feedback_page" >
  <div className="page_of_type">
     <Link to={`/p/user/${data.username}/`}>
    <button style={{ backgroundColor: "rgba(240, 248, 255, 0)" }}>
      <div className="me_div_of_button">
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
      <div className="me_div_of_button  me_selected">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['feedback']}</span>
        </span>
      </div>
    </button>
    </Link>
  </div>
  <div className="feedback_review_score" >
    <h1>
      <img src="/src/static/img/11.png" alt="" className="feedback_review_img" /> {data3}
    </h1>
    <br />
    <br />
    {data4.map((rew) => (

    <div className="feedback_review_container" key={rew.id}>
      <div className="feedback_review_div_container">
        <img src="/src/static/img/noob.jpg" alt="pupil" className="avatar" />
        <span className="ime_review" translate="no">
          {rew.name} {rew.last_name}
        </span>
        <img src={`/src/static/img/${rew.score}.png`} alt="" className="feedback_review_zvezde" />
      </div>
      <p className="feedback_review_text" >
        {rew.text}
        </p>
    </div>
    ))}

  </div>
</div>



</div>







</>

  )
}

export default Feedback_pup
