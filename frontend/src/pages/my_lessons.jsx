import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Offer from '/src/pages/offer.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';

function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="finded_img"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}



function MyLessons() {

    
  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);
  

  
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


    const [search, setSearch] = useState(false);
    const openSearch = () =>{
      setSearch(true);
    }
    const closeSearch = () =>{
      setSearch(false);
    }
    
    document.querySelector("title").textContent = "Offers";
    const params = useParams();

axios.defaults.withCredentials = true;


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}



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




    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/userinfo/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });



  const [data2, setData2] = useState({price_min: 0, price_max: 1000, format: 'individual', target: 'exam', age: '5-12', microphone: 'yes'});
  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
};




  if (loading) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="saved_finded_panel">
  <div className="sborishe_chelov">
    <div className="offer_of_lang_finded_sort_panel" onClick={openSearch}></div>
{/*(() => {
        if (data1.length === 0) {
            return (<>
                      <NotFoundSave iwant={"no_offers"}/>
                </>)
        }
        else{

            return (<>
                
                {data1.map((data) => (

                    <Link to={`/${data.chel}/offer/${data.id}/`} key={data.id} target='_blank'>
                      <div className="offer_of_lang_finded">
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                          <h1 className="finded_name">{data.name}</h1>
                          <ImageWithFallback src={data.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
                            {data.isFav === false ? (
                              <img src="/src/static/img/srce.png" alt="" className="src_img" />
                            ) : (
                              <img src="/src/static/img/srcered.png" alt="" className="src_img" />
                            )}
                          <div className="part_with_text">
                            <p className="finded_price" style={{color: "rgb(0, 184, 0)" }}>{data.price} ₽</p>
                            <p className="finded_online_status">online</p>
                            <div className="finded_review">
                              <img src="/src/static/img/11.png" alt="" className="img_review" />
                              <h1 className="review_text"> {data.review}</h1>
                            </div>
                            <div className="description_lol">
                              {data.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    ))}
                </>)

        }
      })()}*/}


  </div>
</div>
</>

  )
}

export default MyLessons
