import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import Offer from '/src/pages/offer.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import DeepSearchComp from '../elems/deep_search_component.jsx';
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import FindedAndSavedOffers from '/src/elems/finded_and_saved_offers.jsx'

function Finded() {

    
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

    
    const arrLang = {
      'English': {
          'create_offer': 'Create offer',
          'name': 'Name',
          'description': 'Description',
          'price': "Price",
          'load_photo': 'Load photo',
          'save': 'Save',
      },
      'Русский': {
          'create_offer': 'Создать предложение',
          'name': 'Название',
          'description': 'Описание',
          'price': "Цена",
          'load_photo': 'Загрузить фото',
          'save': 'Сохранить',
      },
      'Srpski': {
          'create_offer': 'Napravite predlog',
          'name': 'Naziv',
          'description': 'Opis',
          'price': "Cena",
          'load_photo': 'Otpremite fotografiju',
          'save': 'Sačuvaj',
      },
      'Српски': {
          'create_offer': 'Направите предлог',
          'name': 'Назив',
          'description': 'Опис',
          'price': "Цена",
          'load_photo': 'Отпремите фотографију',
          'save': 'Сачувај',
      },
      'Deutsch': {
          'create_offer': 'Angebot erstellen',
          'name': 'Titel',
          'description': 'Beschreibung',
          'price': "Preis",
          'load_photo': 'Foto laden',
          'save': 'Speichern',
      },
      'Español': {
          'create_offer': 'Crear oferta',
          'name': 'Nombre',
          'description': 'Descripción',
          'price': "Precio",
          'load_photo': 'Cargar foto',
          'save': 'Guardar',
      },
      'عربي': {
          'create_offer': 'إنشاء عرض',
          'name': 'العنوان',
          'description': 'الوصف',
          'price': "السعر",
          'load_photo': 'تحميل الصورة',
          'save': 'حفظ',
      }

    }


    const [search, setSearch] = useState(false);
    const openSearch = () =>{
      setSearch(true);
    }
    const closeSearch = () =>{
      setSearch(false);
    }
    
    document.querySelector("title").textContent = "Offers";
    const params = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [data1, setData1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [error1, setError1] = useState(null);


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
          const response = await axios.get(`${APIURL}/userinfo/`);
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
          const response = await axios.get(`${APIURL}/creatingoffer/${params.language}/`);
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




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/creatingoffer/${data.language}/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);
            if (response.data === "serializer.data"){
                location.reload();
            }

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }

    };


  if (loading) return (<AppLoad lang={langua}/>);
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
       <AppLoad lang={langua}/>

{/*<div className="finded_panel" style={{ width: "100%", display: "flex", justifyContent: "center", left: "unset", backgroundColor: "#00000000"}}>
  <div className="sborishe_chelov">
      <div className="offer_of_lang_finded">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <h1 className="finded_name" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere",  }}></h1>
          <img
            src="/src/static/img/nema.png"
            alt="nekicovek nekicovekovic"
            className="finded_img"
          />
          <img src="/src/static/img/srce.png" alt="" className="src_img" />
          <div className="part_with_text">
            <p className="finded_price"></p>
            <br />
            <p className="finded_online_status">online</p>
            <div className="finded_review">
              <img src="/src/static/img/11.png" alt="" className="img_review" />
              <h1 className="review_text"> </h1>
            </div>
            <div className="description_lol">
            </div>
          </div>
        </div>
      </div>
  </div>
</div>*/}

</>

  );
  if (error1) return <p>Error: {error1}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
</>

  );
  if (error12) return <p>Error: {error12}</p>;

  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="saved_finded_panel">
  <div className="sborishe_chelov">
    <div className="offer_of_lang_finded_sort_panel" onClick={openSearch}></div>
{(() => {
        if (data1.length === 0) {
            return (<>
                      <NotFoundSave iwant={"no_offers"}/>
                </>)
        }
        else{

            return (<>
                
                {data1.map((data) => (

                      <FindedAndSavedOffers chel={data.chel} id={data.id} name={data.name} photo={data.photo} isFav={data.isFav} review={data.review} price={data.price} description={data.description} key={data.id}/>
                    ))}
                </>)

        }
      })()}

<div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
  </div>
</div>
{search && <DeepSearchComp closeSearch={closeSearch} />}
{/*search && <div style={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", }}>
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,  opacity: 0.5, zIndex: 1000, backgroundColor: "black"}} onClick={closeSearch}></div>
    <div style={{ width: 600, height: "auto", backgroundColor: "#2e2e2e", position: "fixed", top: 150, borderRadius: 5,  zIndex: 1001}}>
        <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
            <p id="form-title">Are you serious want to delete the chat</p>
        </div>
        <div style={{ width: "100%", height: "auto"}}>
            <div style={{ margin: 40, overflow: "auto", height: 430}}>
              <div style={{height: "calc(100% - 70px)", }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="crt_offer_blank">
                          <div className="finded_crt_offer_name_of_fields">
                            <span>Format</span>
                          </div>
                          <select id="formate" className="finded_setting_language_selector" onChange={handleChange} value={data.format} name="format">
                            <option id="ind" value="individual">Individual</option>
                            <option id="gro" value="group">Group</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>Target</span>
                          </div>
                          <select id="target" className="finded_setting_language_selector" onChange={handleChange} value={data.target} name="target">
                            <option id="exam" value="exam">Exam</option>
                            <option id="selfdev" value="self_development">Self development</option>
                            <option id="trav" value="travelling">Travelling</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>Age</span>
                          </div>
                          <select id="age" className="finded_setting_language_selector" onChange={handleChange} value={data.age} name="age">
                            <option id="5-12" value="5-12">5-12</option>
                            <option id="13-17" value="13-17">13-17</option>
                            <option id="18-30" value="18-30">18-30</option>
                            <option id="31+" value="31+">31+</option>
                            <option id="all" value="all">all</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>I have microphone</span>
                          </div>
                          <select id="microphone" className="finded_setting_language_selector" onChange={handleChange} value={data.microphone} name="microphone">
                            <option id="yes" value="yes">Yes</option>
                            <option id="no" value="no">No</option>
                          </select>

                          <div className="finded_crt_offer_name_of_fields">
                            <span>{arrLang[lang]['price']}</span>
                          </div>
                          <input maxLength={30} placeholder={arrLang[lang]['price']} name="price_min" type="number" min="0" max="1000000" className="finded_input_field_name" onChange={handleChange} value={data2.price_min}/>
                          <div className="finded_crt_offer_name_of_fields">
                            <span>{arrLang[lang]['price']}</span>
                          </div>
                          <input maxLength={30} placeholder={arrLang[lang]['price']} name="price_max" type="number" min="0" max="1000000" className="finded_input_field_name" onChange={handleChange} value={data2.price_max}/>
                        </div>
                      </div>
              </div>
              
            </div>
            <a href={`/finded/${params.language}/${data2.format}/${data2.target}/${data2.age}/${data2.microphone}/${data2.price_min}/${data2.price_max}/`}>
              <div style={{width: "calc(100% - 80px)", height: 70, backgroundColor: "white", margin: 40, marginTop: 0, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p style={{color: "black", fontSize: 30}}>Find</p>
              </div>
            </a>
        </div>
    </div>
</div>*/}


</>

  )
}

export default Finded
