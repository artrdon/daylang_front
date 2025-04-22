import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import Finded from '/src/pages/finded.jsx'
import Type_offer from '/src/elems/offer_type.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function Find() {

  
  const [groups, setGroup] = useState([]);
  const [ws, setWs] = useState(null);
  const [messNumb, setMessNumb] = useState(null);




    document.querySelector("title").textContent = "DayLang";

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

if (lang != undefined){
    langua = lang;
}
else{
    document.cookie = `lang=English; path=/;max-age=31556926`;
    langua = "English";
}
    var arrLang = {
      'English': {
          'teacher': 'Teacher',
          'teacher_description': 'Teacher can help u if u dont speak fluently or correct you grammar mistakes and just make ur level of language up',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Русский': {
          'teacher': 'Преподаватель',
          'teacher_description': 'Преподаватель может помочь вам, если вы не говорите бегло, или исправить ваши грамматические ошибки, и просто повысить ваш уровень владения языком',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Srpski': {
          'teacher': 'Nastavnik',
          'teacher_description': 'Nastavnik vam može pomoći ako ne govorite tečno ili ispraviti gramatičke greške i jednostavno povećati nivo znanja jezika',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Српски': {
          'teacher': 'Наставник',
          'teacher_description': 'Наставник вам може помоћи ако не говорите течно или исправити граматичке грешке и једноставно повећати ниво знања језика',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Deutsch': {
          'teacher': 'Lehrer',
          'teacher_description': 'Der Lehrer kann dir helfen, wenn du nicht fließend sprichst oder deine Grammatikfehler korrigierst und einfach dein Sprachniveau verbesserst',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'Español': {
          'teacher': 'Profesor',
          'teacher_description': 'El profesor puede ayudarte si no hablas con fluidez o corriges tus errores gramaticales y simplemente subes de nivel el idioma',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      },
      'عربي': {
          'teacher': 'المعلم',
          'teacher_description': 'يمكن للمعلم مساعدتك إذا كنت لا تتحدث بطلاقة أو تصحح أخطائك النحوية وتجعل مستوى لغتك مرتفعا',
          'eng': 'English',
          'germ': 'Germany',
          'rus': 'Russian',
          'chin': 'Chinese',
          'fren': 'French',
          'ital': 'Italian',
          'span': 'Spanish',
          'serb': 'Serbian',
      }

    }


const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



axios.defaults.withCredentials = true;

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
        const response = await axios.get(`${APIURL}/getchatlist/`);
        if (response.data != null){
            for (let i = 0; i < response.data[0].length; i++){
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


  useEffect(() => { 

    const socket = new WebSocket(`${WSAPIURL}/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const dataMess = JSON.parse(event.data);

        if (dataMess.tip === "delete"){
            let i_read = true;
            for (let i = 0; dataMess.if_readed.length > i; i++){
                if (dataMess.if_readed[i] === data.username){
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




  if (loading) return (
      <>
      <AppLoad lang={langua}/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
</>

  );
  if (error12) return <p>Error: {error12}</p>;

    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="find_panel">
  <div className="tag_select_panel">
    <h1 className='find_page_teacher'>{arrLang[lang]['teacher']}</h1>
    <p className='find_page_teacher_description'>
      {arrLang[lang]['teacher_description']}
    </p>
    <div className='find_page_div_over_offer_types'>
      <div className='find_page_div_of_offer_types'>


        <Type_offer lang={lang}/>

      </div>
    </div>
  </div>
  <div style={{ width: "100%", height: 100, backgroundColor: "#25252500" }}></div>
</div>



</>

  )
}

export default Find
