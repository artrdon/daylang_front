import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import UpdateOfferComp from '/src/elems/update_offer_comp.jsx'
import Create_offer_load from '/src/load_elems/create_offer_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function UpdateOffer() {

    
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


    const [count, setCount] = useState(0)
    let params = useParams();

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
        const response = await axios.get(`${APIURL}/userinfo/`);
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
        const response = await axios.get(`${APIURL}/gettingoffer/${params.username}/${params.index}/`);
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
<App name={data1.first_name} lastname={data1.last_name} username={data1.username} lang={langua} if_teach={data1.i_am_teacher} mess_count={messNumb} photo={data1.photo} balance={data1.balance}/>

<UpdateOfferComp name={data2.name} description={data2.description} price={data2.price} id={params.index} language={data2.lang} format={data2.format} target={data2.target} age={data2.age} microphone={data2.microphone} photo={data2.photo} message={data2.message}/>


</>

  )
}

export default UpdateOffer
