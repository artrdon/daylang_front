import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';


function About() {

    const [count, setCount] = useState(0)
    document.querySelector("title").textContent = "About us";

const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const response = await axios.get('http://api.daylang.ru/userinfo/');
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
</>

  );
  if (error) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

console.log(data);
    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={data12[1]} photo={data.photo} balance={data.balance}/>

<div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="crt_offer_gray_thing">
        <div className="crt_offer_blank">
          <div style={{ width: 570, marginLeft: "auto", marginRight: "auto", position: "relative", fontSize: 20 }}>
            <span translate="no">ООО "ДЭЙЛЭНГ"</span>
            <span style={{ display: "block" }} translate="no">
              ИНН: 218283626, ОГРН: 6232322727237
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</>

  )
}

export default About
