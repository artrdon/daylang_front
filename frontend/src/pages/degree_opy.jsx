import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import Degree_load from '/src/load_elems/degree_load.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="me_avatar"
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}


function Degree() {

    
  const [groups, setGroup] = useState([0]);
  const [photoArray, setPhotoArray] = useState([]);
  const [ws, setWs] = useState(null);
  const [messNumb, setMessNumb] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = () =>{
      setPhotoIndex(prev => prev + 1);
  }
  const previosPhoto = () =>{
      setPhotoIndex(prev => prev - 1);
  }


  const [count, setCount] = useState(0)
  let params = useParams();
  if (params.user === "undefined")
  {
    window.location.replace(`/log/`);
    return;
  }

  document.querySelector("title").textContent = "Degree";

  const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  const [data3, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);

  const [scaledButtonId, setScaledButtonId] = useState(null);
  const [showPhotoBig, setShowPhotoBig] = useState(false);

  const toggleVisibility = () => {
      setShowPhotoBig(!showPhotoBig);
  };

  

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/usersettings/${params.user}/`);
        setData1(response.data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);

//if (data1 != null && data1.i_am_teacher === true)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/get_degree_load/${params.user}/`);
        setData3(response.data);
        console.log(response.data);
        setPhotoArray((photoArray) => [...photoArray, response.data]);
      } catch (err) {
        setError3(err.message);
      } finally {
        setLoading3(false);
      }
    };

    fetchData();
  }, []);



  if (loading1) return (
      <>
      <Degree_load/>
</>

  );
  if (error1) return <p>Error: {error1}</p>;

  //  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | ${arrLang[lang]['degree']}`;

  if (loading3) return (
      <>
      <Degree_load/>
</>

  );
  if (error3) return <p>Error: {error3}</p>;

  


    return (
        <>


<div className="degree_page_around">
    <p className="degree_description_about" >{data1.about_my_degree}</p>
    <br />
    <br />
    {data3.map((photo) => (
            <button className="degree_button" onClick={() => toggleVisibility()} key={photo.id} style={{ transform: scaledButtonId === photo.id ? 'scale(4)' : 'scale(1)', transition: 'transform 0.3s ease',}}>
                <img src={photo.photo} alt="" className="degree_img" />
            </button>
    ))}
    </div>


{showPhotoBig && <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "fixed", width: "100vw",zIndex: 10000}}>
  <div style={{ height: "100vh", width: "100vw", backgroundColor: "black", opacity: "30%", zIndex: 10, position: "fixed"}} onClick={() => toggleVisibility()} ></div>
      
          <button className="degree_button" style={{ transform: 'scale(4)', transition: 'transform 0.3s ease', zIndex: 11}}>
              <img src={photoArray[0][photoIndex].photo} alt={`degreephotoBig`} className="degree_img" />
          </button>
          {photoArray[0].length > (photoIndex + 1) && 
            <div style={{ position: "fixed", right: 0, zIndex: 11 }} onClick={nextPhoto}>
              <img src="/src/static/img/next_photo.png" alt="" style={{width: 100, height: 100}}/>
            </div>}
          {photoIndex > 0 && 
            <div style={{ position: "fixed", left: 0, zIndex: 11 }} onClick={previosPhoto}>
              <img src="/src/static/img/next_photo.png" alt="" style={{width: 100, height: 100, transform: "rotate(180deg)"}}/>
            </div>}
          
  </div>}

</>

  )
}

export default Degree
