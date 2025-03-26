import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import SettingsForm from '/src/elems/settingfrom.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';


function CreateOffer() {

    const [count, setCount] = useState(0)

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

var Lang = {
      'English': {
          'English': 'English',
          'Germany': 'Germany',
          'Russian': 'Russian',
          'Chinese': 'Chinese',
          'French':  'French',
          'Italian': 'Italian',
          'Spanish': 'Spanish',
          'Serbian': 'Serbian',
      },
      'Русский': {
          'English': 'Английский',
          'Germany': 'Немецкий',
          'Russian': 'Русский',
          'Chinese': 'Китайский',
          'French':  'Французский',
          'Italian': 'Итальянский',
          'Spanish': 'Испанский',
          'Serbian': 'Сербский',
      },
      'Srpski': {
          'English': 'Engleski',
          'Germany': 'Nemačka',
          'Russian': 'Ruski',
          'Chinese': 'Kineski',
          'French':  'Francuski',
          'Italian': 'Italijanski',
          'Spanish': 'Španski',
          'Serbian': 'Srpski',
      },
      'Српски': {
          'English': 'Енглески',
          'Germany': 'Немачка',
          'Russian': 'Руски',
          'Chinese': 'Кинески',
          'French':  'Француски',
          'Italian': 'Италијански',
          'Spanish': 'Шпански',
          'Serbian': 'Српски',
      },
      'Deutsch': {
          'English': 'Englischsprachig',
          'Germany': 'Deutschland',
          'Russian': 'Russisch',
          'Chinese': 'Chinesisch',
          'French':  'Französisch',
          'Italian': 'Italienisch',
          'Spanish': 'Spanisch',
          'Serbian': 'Serbisch',
      },
      'Español': {
          'English': 'Inglés',
          'Germany': 'Alemania',
          'Russian': 'Ruso',
          'Chinese': 'Chino',
          'French':  'Francés',
          'Italian': 'Italiano',
          'Spanish': 'Español',
          'Serbian': 'Serbio',
      },
      'عربي': {
          'English': 'الإنجليزية',
          'Germany': 'ألمانيا',
          'Russian': 'الروسية',
          'Chinese': 'الصينية',
          'French':  'الفرنسية',
          'Italian': 'الإيطالية',
          'Spanish': 'الإسبانية',
          'Serbian': 'الصربية',
      }

    }


    const csrfToken = getCookie('csrftoken');

    document.querySelector("title").textContent = "Create Offer";

    const [data, setData] = useState({name: '', description: '', price: '', language: 'Other', format: 'Individual', target: 'Exam', age: '5-12', microphone: 'Yes'});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [data1, setData1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [error1, setError1] = useState(null);

    axios.defaults.withCredentials = true;

  const [data12, setData12] = useState(null);
  const [loading12, setLoading12] = useState(true);
  const [error12, setError12] = useState(null);

      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.daylang.ru/userinfo/');
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



    const handleChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
        };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://api.daylang.ru/creatingoffer/${data.language}/`, data, {
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




  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Create_offer_load/>
</>

  );
  if (error1) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Create_offer_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

    return (
        <>
<App name={data1.first_name} lastname={data1.last_name} username={data1.username} lang={langua} if_teach={data1.i_am_teacher} mess_count={data12[1]} photo={data1.photo} balance={data.balance}/>


<div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
     <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p className="crt_offer_name_of_fields" style={{margin: 40,marginLeft: "auto", marginRight: "auto", fontSize: 30}} >
              {arrLang[lang]['create_offer']}
            </p>
            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['name']}</span>
            </div>
            <input maxLength={40} placeholder={arrLang[lang]['name']} name="name" type="text" className="input_field_name" onChange={handleChange} value={data.name}/>

            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['description']}</span>
            </div>
            <textarea maxLength={700} placeholder={arrLang[lang]['description']} name="description" id="" className="input_field_description" onChange={handleChange} value={data.description}/>

            <div className="crt_offer_name_of_fields">
              <span>Language</span>
            </div>
            <select id="languages" className="setting_language_selector" onChange={handleChange} value={data.language} name="language">
              <option id="rus" value="Russian">{Lang[lang]["Russian"]}</option>
              <option id="eng" value="English">{Lang[lang]["English"]}</option>
              <option id="srbl" value="Serbian">{Lang[lang]["Serbian"]}</option>
              <option id="germ" value="Germany">{Lang[lang]["Germany"]}</option>
              <option id="span" value="Spanish">{Lang[lang]["Spanish"]}</option>
              <option id="chin" value="Chinese">{Lang[lang]["Chinese"]}</option>
              <option id="ital" value="Italian">{Lang[lang]["Italian"]}</option>
              <option id="franc" value="French">{Lang[lang]["French"]}</option>
              <option id="oth" value="Other">Other</option>
            </select>

            <div className="crt_offer_name_of_fields">
              <span>Format</span>
            </div>
            <select id="formate" className="setting_language_selector" onChange={handleChange} value={data.format} name="format">
              <option id="ind" value="Individual">Individual</option>
              <option id="gro" value="Group">Group</option>
            </select>

            <div className="crt_offer_name_of_fields">
              <span>Target</span>
            </div>
            <select id="target" className="setting_language_selector" onChange={handleChange} value={data.target} name="target">
              <option id="exam" value="Exam">Exam</option>
              <option id="selfdev" value="Self development">Self development</option>
              <option id="trav" value="Travelling">Travelling</option>
            </select>

            <div className="crt_offer_name_of_fields">
              <span>Age</span>
            </div>
            <select id="age" className="setting_language_selector" onChange={handleChange} value={data.age} name="age">
              <option id="5-12" value="5-12">5-12</option>
              <option id="13-17" value="13-17">13-17</option>
              <option id="18-30" value="18-30">18-30</option>
              <option id="31+" value="31+">31+</option>
              <option id="all" value="all">all</option>
            </select>

            <div className="crt_offer_name_of_fields">
              <span>I have microphone</span>
            </div>
            <select id="microphone" className="setting_language_selector" onChange={handleChange} value={data.microphone} name="microphone">
              <option id="yes" value="Yes">Yes</option>
              <option id="no" value="No">No</option>
            </select>

            <div className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['price']}</span>
            </div>
            <input maxLength={30} placeholder={arrLang[lang]['price']} name="price" type="number" min="0" max="1000000" className="input_field_name" onChange={handleChange} value={data.price}/>


            <div  className="crt_offer_name_of_fields">
              <span>{arrLang[lang]['load_photo']}</span>
            </div>
            <input accept="image/png" id="icon404873" name="icon" type="file" tabIndex={-1} aria-hidden="true" style={{position: "relative", display: "inline-block", top: 18, left: 0 }}/>
            <div className="crt_offer_photo_div">
              <img alt="" className="crt_offer_photo" src="/src/static/img/giga.jpg"/>
            </div>
              <button style={{width: 200, height: 50,backgroundColor: "gray", margin: 20, fontSize: 30, marginBottom: 100, }} type="submit">
                {arrLang[lang]['save']}
              </button>

          </div>
        </div>
      </div>
    </form>
  </div>
</div>


</>

  )
}

export default CreateOffer
