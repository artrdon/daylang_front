import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function SetReviewBlock({set_rew, feedback}) {


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');
    let params = useParams();

    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setData4] = useState({user: params.username, offer: params.id, setter: '', score: '', text: ''});
  let sett = [];
    const [notScore, setNotScore] = useState(false);
axios.defaults.withCredentials = true;



//onLoad = () => setData1({ ...settingChange, about_myself: "lol" });

 const handleInput = (e) => {
    setData4({ ...review, text: e.target.value });
    setNotScore(false);
  };


    const handleSubmit = async (e) => {

            e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/reviews/`, review, {
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
            if (response.data === "not score"){
                setNotScore(true);
                return;
            }

            location.reload();

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }

    }


    const star = (par) => {
        if (par === 1)
        {
            document.getElementById("star1").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star2").setAttribute('src', `/src/static/img/starfeedback.png`);
            document.getElementById("star3").setAttribute('src', `/src/static/img/starfeedback.png`);
            document.getElementById("star4").setAttribute('src', `/src/static/img/starfeedback.png`);
            document.getElementById("star5").setAttribute('src', `/src/static/img/starfeedback.png`);
            setData4({ ...review, score: par });
        }
        if (par === 2)
        {
            document.getElementById("star1").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star2").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star3").setAttribute('src', `/src/static/img/starfeedback.png`);
            document.getElementById("star4").setAttribute('src', `/src/static/img/starfeedback.png`);
            document.getElementById("star5").setAttribute('src', `/src/static/img/starfeedback.png`);
            setData4({ ...review, score: par });
        }
        if (par === 3)
        {
            document.getElementById("star1").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star2").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star3").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star4").setAttribute('src', `/src/static/img/starfeedback.png`);
            document.getElementById("star5").setAttribute('src', `/src/static/img/starfeedback.png`);
            setData4({ ...review, score: par });
        }
        if (par === 4)
        {
            document.getElementById("star1").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star2").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star3").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star4").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star5").setAttribute('src', `/src/static/img/starfeedback.png`);
            setData4({ ...review, score: par });
        }
        if (par === 5)
        {
            document.getElementById("star1").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star2").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star3").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star4").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            document.getElementById("star5").setAttribute('src', `/src/static/img/starfeedbackgold.png`);
            setData4({ ...review, score: par });
        }
    }



    return (
        <>
<div style={{ display: "block", paddingBottom: 100, position: "relative", top: 100, border: "1px solid gray", borderTopLeftRadius: 50, borderTopRightRadius: 50,  }}>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <button onClick={() => star(1)} style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star1"
              />
            </button>
            <button onClick={() => star(2)} style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star2"
              />
            </button>
            <button onClick={() => star(3)} style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star3"
              />
            </button>
            <button onClick={() => star(4)} style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star4"
              />
            </button>
            <button onClick={() => star(5)} style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star5"
              />
            </button>
          </div>
        </div>
        <br />
        <br />
        <div className="offer_set_review_div">
          <div>
            <textarea
              id="mess"
              maxLength={950}
              className="input_panel"
              style={{ left: "-60px", width: "100%",}}
              value={review.text}
              onChange={handleInput}
            ></textarea>
            <button
              className="sending_button"
              onClick={handleSubmit}
              style={{ bottom: "unset", left: 305 }}
            >
              <img src="/src/static/img/send.png" alt="" className="img_send" />
            </button>
          </div>
        </div>
        {notScore && <p style={{position: "absolute", bottom: 0}}>set score</p>}
      </div>



</>

  )
}

export default SetReviewBlock
