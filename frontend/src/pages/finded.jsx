import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import Offer from '/src/pages/offer.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import axios from 'axios';


function Finded() {
    const [count, setCount] = useState(0)

    document.querySelector("title").textContent = "Offers";
    let params = useParams();

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

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

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
        const response = await axios.get(`http://127.0.0.1:8000/creatingoffer/${params.language}/`);
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
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
       <AppLoad lang={langua}/>

<div className="finded_panel" style={{ width: "100%", display: "flex", justifyContent: "center", left: "unset", backgroundColor: "#00000000"}}>
  <div className="sborishe_chelov">
    <Link to={`/`}>
      <div className="offer_of_lang_finded">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <h1 className="finded_name" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere",  }}></h1>
          <img
            src="/src/static/img/giga.jpg"
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
    </Link>
  </div>
</div>

</>

  );
  if (error1) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

  console.log(data1);
  return (
      <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={data12[1]} photo={data.photo} balance={data.balance}/>

<div className="saved_finded_panel">
  <div className="sborishe_chelov">
{(() => {
        if (data1.length === 0) {
            return (<>
                      <NotFoundSave iwant={"no_offers"}/>
                </>)
        }
        else{

            return (<>
                <div className="offer_of_lang_finded_sort_panel"></div>
                {data1.map((data) => (

                    <Link to={`/${data.chel}/offer/${data.id}/`} key={data.id}>
                      <div className="offer_of_lang_finded">
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                          <h1 className="finded_name">{data.name}</h1>
                          <img
                            src={data.photo}
                            alt="nekicovek nekicovekovic"
                            className="finded_img"
                          />
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
      })()}


  </div>
</div>



</>

  )
}

export default Finded
