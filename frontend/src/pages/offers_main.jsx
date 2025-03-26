import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Offers_main_load from '/src/load_elems/offers_main_load.jsx'
import Add_button from '/src/elems/add_button.jsx'
import axios from 'axios';


function Offers_on_main() {

    const [count, setCount] = useState(0)
    let params = useParams();
    if (params.user === "undefined")
{
    window.location.replace(`/log/`);
    return;
}

    document.querySelector("title").textContent = "My offers";

    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  const [usernow, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  const [real, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);


axios.defaults.withCredentials = true;


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
        const response = await axios.get(`http://api.daylang.ru/usersettings/${params.user}/`);
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
        const response = await axios.get(`http://api.daylang.ru/userinfo/${params.user}/`);
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

//if (real != null && real.i_am_teacher === true)


      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.daylang.ru/gettingoffer/${params.user}/`);
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
        const response = await axios.get(`http://api.daylang.ru/userinfo/`);
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
        const response = await axios.get('http://api.daylang.ru/getchatlist/');
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
      <Offers_main_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Offers_main_load/>
</>

  );
  if (error1) return <p>Error: {error}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua}/>
      <Offers_main_load/>
</>

  );
  if (error2) return <p>Error: {error}</p>;


  if (loading3) return (
      <>
      <AppLoad lang={langua}/>
      <Offers_main_load/>
</>

  );
  if (error3) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Offers_main_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLang[lang]['offers']}`;

    return (
        <>
<App name={usernow.first_name} lastname={usernow.last_name} username={usernow.username} lang={langua} if_teach={usernow.i_am_teacher} mess_count={data12[1]} photo={data.photo} balance={data.balance}/>


<div className="find_panel">
  <div className="me_under_find">
    <img src={data.photo} alt="" className="me_avatar"/>
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

<div id="offers_page" >
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
      <div className="me_div_of_button" >
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
      <div className="me_div_of_button me_selected">
        <span className="me_span_of_button" >
          <span className="me_span_of_button_text">{arrLang[lang]['offers']}</span>
        </span>
      </div>
    </button>
    </Link>
  </div>
  <div className="place_of_teach" style={{ position: "relative", top: 400 }}>

    {(() => {
        if (data.if === "yes") {
      return (<>
          <Add_button/>
          </>)
        }
      })()}


{data1.map((dat) => (
    <Link to={`/${data.username}/offer/${dat.id}/`} key={dat.id}>
      <div className="offer_of_lang" id={dat.id}>
        <div className="first_sloj">
          <img src={dat.photo} alt="nekicovek nekicovekovic" className="offer_image" />
          <div className="feedback_review_down_block">
            <h1 className="name_of_offer" >
              {dat.name}
            </h1>
            <div className="block_of_price_and_status">
              <p className="price_and_status feedback_review_price_text"  >
                {dat.price} ₽
              </p>
            </div>
            <div className="block_of_review">
              <img src="/src/static/img/11.png" alt="" className="img_of_review" />
              <h1 className="header_of_review"> {dat.review}</h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
))}
  </div>
</div>




</div>




</>

  )
}

export default Offers_on_main
