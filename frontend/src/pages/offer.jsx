import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import Offer_load from '/src/load_elems/offer_load.jsx'
import SetReviewBlock from '/src/elems/set_review_block.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';

function Offer() {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');

    const [count, setCount] = useState(0)
    let params = useParams();

    document.querySelector("title").textContent = "Offer";
    let isfav = null;

    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

    const [data2, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);


    const [data3, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);


    const [data5, setData5] = useState(null);
  const [loading5, setLoading5] = useState(true);
  const [error5, setError5] = useState(null);

      const [data7, setData7] = useState(null);
  const [loading7, setLoading7] = useState(true);
  const [error7, setError7] = useState(null);

  const [favor, setData6] = useState({username: params.username, id: params.id});


axios.defaults.withCredentials = true;


    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

        var arrLang = {
      'English': {
          'reviews': 'Reviews',
          'message': "Send message",
          'update': "Update",
          'set_review': 'Leave a review',
          'feedback': 'Feedback'
      },
      'Русский': {
          'reviews': 'Отзывы',
          'message': "Отправить сообщение",
          'update': "Обновить",
          'set_review': 'Оставить отзыв',
          'feedback': 'Отзыв'
      },
      'Srpski': {
          'reviews': 'Recenzije',
          'message': "Pošaljite poruku",
          'update': "Ažuriranje",
          'set_review': 'Ostavite povratne informacije',
          'feedback': 'Povratne informacije'
      },
      'Српски': {
          'reviews': 'Рецензије',
          'message': "Пошаљите поруку",
          'update': "Ажурирање",
          'set_review': 'Оставите повратне информације',
          'feedback': 'Повратне информације'
      },
      'Deutsch': {
          'reviews': 'Gästebewertungen',
          'message': "Nachricht senden",
          'update': "Erneuern",
          'set_review': 'Feedback geben',
          'feedback': 'Feedback'
      },
      'Español': {
          'reviews': 'Reseñas',
          'message': "Enviar mensaje",
          'update': "Renovar",
          'set_review': 'Deja un comentario',
          'feedback': 'Comentarios'
      },
      'عربي': {
          'reviews': 'التعليقات',
          'message': "ارسل رسالة",
          'update': "تحديث",
          'set_review': 'اترك مراجعة',
          'feedback': 'ردود الفعل'
      }

    }



//const para = { username: {params.username}, id: {params.id}};


const save_to_fav = async (e) => {

            e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/save_to_fav/', favor, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);
            if (response.data === "unauthenticated_ttt")
            {
                window.location.replace(`/log/`);
                return;
            }


        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
        save_to_favor();
        if (isfav === false)
        {
            isfav = true;
            return 0;
        }
        else
        {
            isfav = false;
            return 0;
        }
    }




// up post and down get request

  const [data12, setData12] = useState(null);
  const [loading12, setLoading12] = useState(true);
  const [error12, setError12] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/userinfo/');
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
        const response = await axios.get(`http://127.0.0.1:8000/usersettings/${params.username}/`);
        setData7(response.data);
      } catch (err) {
        setError7(err.message);
      } finally {
        setLoading7(false);
      }
    };

    fetchData();
  }, []);
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gettingoffer/${params.username}/${params.id}/`);
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
        const response = await axios.get(`http://127.0.0.1:8000/userinfo/${params.username}/`);
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
        const response = await axios.get(`http://127.0.0.1:8000/reviews_two/`); //`http://127.0.0.1:8000/reviews/`
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
        const response = await axios.get('http://127.0.0.1:8000/creatingoffer/');
        setData5(response.data);
      } catch (err) {
        setError5(err.message);
      } finally {
        setLoading5(false);
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
      <Offer_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>

</>

  );
  if (error1) return <p>Error: {error}</p>;

  if (loading2) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>

</>

  );
  if (error2) return <p>Error: {error}</p>;


  if (loading3) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>

</>

  );
  if (error3) return <p>Error: {error}</p>;

  if (loading5) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>

</>

  );
  if (error5) return <p>Error: {error}</p>;

    if (loading7) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>
</>

  );
  if (error7) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Offer_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;


    document.querySelector("title").textContent = `${data1.name}`;
    if (data1 != null){
        isfav = data1.isFav;
    }

console.log(data1);
    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={data12[1]} photo={data.photo} balance={data.balance}/>

<div className="find_panel">
  <div className="div_of_foto_and_button" id="divoffb">
    <div className="foto_main" style={{display: "flex", justifyContent: "center", alignItem : "center"}}>
        <img
          src={data1.photo}
          alt=""
          style={{ width: "100%", height: "auto", margin: "auto", display: "block" }}
          id="divoffb_img"
        />

    </div>


    {data1.pisal === false ? (
          data1.itsme === false ? (
          <Link to={`/create_chat/${params.username}/${data1.name}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['message']}
              </button>
            </Link>
                ) : (
          <Link to={`/update_offer/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['update']}
              </button>
            </Link>
            )
                ) : (
          data1.itsme === false ? (
          <Link to={`/message_list/${data1.chat_id}/${data1.chat_name}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['message']}
              </button>
            </Link>
                ) : (
          <Link to={`/update_offer/${params.username}/${params.id}/`}>
              <button className="button_under_foto" id="divoffb_button">
                {arrLang[lang]['update']}
              </button>
            </Link>
            )
    )}

  </div>
  <div className="review_div">
    <div className="margin_of_offer">
      <h1>
        <span style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", height: 75, display: "block" }}>{data1.name}</span>
      </h1>
      <div className="offer_price_div">
        <div className="offer_price">
          {data1.price} ₽
        </div>
        <button onClick={save_to_fav} className="offer_save_to_fav_button">

         {isfav === false ? (
              <img
                src="/src/static/img/srce.png"
                alt=""
                className="offer_src_img"
                id="favorito"
              />
            ) : (
              <img
                src="/src/static/img/srcered.png"
                alt=""
                className="offer_src_img"
                id="favorito"
              />
            )}

        </button>

          <div style={{ width:"100%", height: 400, marginTop: 50, }}>
              <li style={{margin: 20}}>
                  <span>Есть микрофон?</span> <span>{data1.microphone}</span>
              </li>
              <li style={{margin: 20}}>
                  <span>Цели:</span> <span>{data1.target}</span>
              </li>
              <li style={{margin: 20}}>
                  <span>Возраст:</span> <span>{data1.age}</span>
              </li>
              <li style={{margin: 20}}>
                  <span>Формат:</span> <span>{data1.format}</span>
              </li>
          </div>
      </div>
    </div>
    <div className="div_description" id="phone">
      <div className="description_text" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
        {data1.description}
      </div>
      <Link to={`/t/user/${data2.username}/`}>
        <div className="offer_about_author_div">
        <div className="offer_about_author">
          <img
            src="/src/static/img/giga.jpg"
            alt="pupil"
            className="img_of_autor_mes"
          />
          <div className="offer_author_name_div">
            <span className="ime offer_author_name_span" translate="no">
              {data2.first_name} {data2.last_name}
            </span>
            {(() => {
                if (data7.real_man === true) {
                  return <img src="/src/static/img/confirmed.png" alt="" className="offer_me_real_pers" />;
                }
              })()}
          </div>
          <div className="offer_author_description">{data7.about_myself}</div>
        </div>
      </div>
  </Link>
    </div>
    <div className="margin_of_offer">


      <div>


        <h1 style={{ marginBottom: 30, top: 800, position: "absolute" }}>
          {arrLang[lang]['reviews']}{" "}
          <img
            src="/src/static/img/11.png"
            alt=""
            style={{ width: 30, height: 30 }}
          />{" "}
          {data1.review}
        </h1>
        {data1.itsme === false ? (
          <SetReviewBlock set_rew={arrLang[lang]['set_review']} feedback={arrLang[lang]['feedback']}/>
                ) : null}

        {data3.map((rew) => (
            rew.number_of_offer === Number(params.id) ? (<div className="offer_review_div_div" key={rew.id}>
          <div className="offer_review_div">
            <img src={rew.photo} alt="pupil" className="avatar" />
            <span className="ime_review">{rew.name}  {rew.last_name}</span>
            <img src={`/src/static/img/${rew.score}.png`} alt="" className="offer_score_img"/>
          </div>
          <p className="offer_review_text">
            {rew.text}
          </p>
        </div>) : null
))}
<div style={{ display: "block", paddingBottom: 90, position: "relative", top: 100, border: "1px solid gray", borderBottomLeftRadius: 50, borderBottomRightRadius: 50,  }}>
    <span style={{ position: "absolute", fontSize: 30, margin: 20, cursor: "pointer"}}>Показать больше</span>
</div>
      </div>

    </div>
  </div>
  <div className="div_description" id="comp">
    <div className="description_text">
      {data1.description}
    </div>
    <Link to={`/t/user/${data2.username}/`}>
        <div className="offer_about_author_div">
        <div className="offer_about_author">
          <img
            src={data2.photo}
            alt="pupil"
            className="img_of_autor_mes"
          />
          <div className="offer_author_name_div">
            <span className="ime offer_author_name_span" translate="no">
              {data2.first_name} {data2.last_name}
            </span>
            {(() => {
                if (data7.real_man === true) {
                  return <img src="/src/static/img/confirmed.png" alt="" className="offer_me_real_pers" />;
                }
              })()}
          </div>
          <div className="offer_author_description">{data7.about_myself}</div>
        </div>
      </div>
  </Link>
  </div>

  <div className="div_of_offer_div">

    <div className="offer_div">
        <h3>Возможно вам подойдут</h3>
        {data5.map((dat) => (
      <a href={`/${dat.chel}/offer/${dat.id}/`} key={dat.id}>
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
    </a>
      ))}
    </div>
  </div>
</div>



</>

  )
}

export default Offer
