import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import UpdateOfferComp from '/src/elems/update_offer_comp.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';


function UpdateOffer() {

    const [count, setCount] = useState(0)
    let params = useParams();

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');

    document.querySelector("title").textContent = "Update Offer";


    const [data1, setData1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [error1, setError1] = useState(null);


    const [data2, setData2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);

    axios.defaults.withCredentials = true;


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
        const response = await axios.get(`http://api.daylang.ru/gettingoffer/${params.username}/${params.index}/`);
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



  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Create_offer_load/>
</>

  );
  if (error1) return <p>Error: {error}</p>;


  if (loading2) return (
      <>
      <AppLoad lang={langua}/>
      <Create_offer_load/>
</>

  );
  if (error2) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Create_offer_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

console.log(data2);
    return (
        <>
<App name={data1.first_name} lastname={data1.last_name} username={data1.username} lang={langua} if_teach={data1.i_am_teacher} mess_count={data12[1]} photo={data1.photo} balance={data.balance}/>

<UpdateOfferComp name={data2.name} description={data2.description} price={data2.price} id={params.index} language={data2.lang} format={data2.format} target={data2.target} age={data2.age} microphone={data2.microphone} photo={data2.photo}/>


</>

  )
}

export default UpdateOffer
