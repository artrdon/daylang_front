import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'


function Offer_load() {

    const [count, setCount] = useState(0)


    return (
        <>

    <div className="find_panel">
  <div className="div_of_foto_and_button" id="divoffb">
    <img
      src="/src/static/img/nema.png"
      alt=""
      className="foto_main"
      id="divoffb_img"
    />
      <button className="button_under_foto" id="divoffb_button">
        arrange
      </button>
  </div>
  <div className="review_div">
    <div className="margin_of_offer">
      <br />
      <h1 style={{ width: "auto" }}>
        <span></span>
      </h1>
      <br />
      <br />
      <div style={{ paddingBottom: 50 }}>
        <div style={{ fontSize: 40, position: "relative", left: 10 }}>
        </div>
        <br />
        <button
          style={{
            position: "absolute",
            right: 80,
            top: 60,
            backgroundColor: "#00000000"
          }}
        >
          <img
            src="/src/static/img/srce.png"
            alt=""
            style={{ width: 40, height: 40, zIndex: 10 }}
            id="favorito"
          />
        </button>
      </div>
    </div>
    <div className="div_description" id="phone">
      <div className="description_text">
      </div>
    </div>
    <div className="margin_of_offer">
      <div style={{ display: "block" }}>
        <h1>Set review</h1>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <button  style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star1"
              />
            </button>
            <button style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star2"
              />
            </button>
            <button style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star3"
              />
            </button>
            <button style={{ backgroundColor: "#00000000" }}>
              <img
                src="/src/static/img/starfeedback.png"
                alt=""
                className="star"
                id="star4"
              />
            </button>
            <button style={{ backgroundColor: "#00000000" }}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: 50,
            width: "60%",
            left: 130,
            position: "absolute"
          }}
        >
          <div>
            <div
              id="mess"
              data-text="Feedback"
              contentEditable="true"
              className="input_panel"
              style={{ left: "0px", width: "100%",}}
            />
            <button
              className="sending_button"
              type="submit"
              style={{ bottom: "unset", right: "-94px" }}
            >
              <img src="/src/static/img/send.png" alt="" className="img_send" />
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>
          Reviews{" "}
          <img
            src="/src/static/img/11.png"
            alt=""
            style={{ width: 30, height: 30 }}
          />{" "}
          4.7
        </h1>
        <div style={{ width: "100%", height: "auto" }}>
          <div
            style={{
              position: "relative",
              top: 20,
              left: 20,
              cursor: "pointer",
              width: "calc(100% - 20px)"
            }}
          >
            <img src="/src/static/img/noob.jpg" alt="pupil" className="avatar" />
            <span className="ime_review">Chel</span>
            <span className="familija_review">Chelov</span>
            <img
              src="/src/static/img/1.png"
              alt=""
              style={{
                width: 100,
                height: 20,
                right: 0,
                position: "absolute",
                top: 10,
                marginRight: 20,
                transform: "scale(-1, 1)",
              }}
            />
          </div>
          <p
            style={{
              padding: 20,
              marginTop: 20,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere"
            }}
          >
            dfjkdojkjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjjjdfjkdojkjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          </p>
        </div>
        <div style={{ width: "100%", height: "auto" }}>
          <div
            style={{
              position: "relative",
              top: 20,
              left: 20,
              cursor: "pointer",
              width: "calc(100% - 20px)"
            }}
          >
            <img src="/src/static/img/noob.jpg" alt="pupil" className="avatar" />
            <span className="ime_review">Chel</span>
            <span className="familija_review">Chelov</span>
            <img
              src="/src/static/img/3.png"
              alt=""
              style={{
                width: 100,
                height: 20,
                right: 0,
                position: "absolute",
                top: 10,
                marginRight: 20,
                transform: "scale(-1, 1)",
              }}
            />
          </div>
          <p
            style={{
              padding: 20,
              marginTop: 20,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere"
            }}
          >
            dfjkdojkjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjjjdfjkdojkjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          </p>
        </div>
      </div>
    </div>
  </div>
  <div className="div_description" id="comp">
    <div className="description_text">
    </div>
  </div>
  <div className="div_of_offer_div">
    <div className="offer_div">
        <div className="offer_of_lang">
          <div className="first_sloj">
            <img
              src="/src/static/img/nema.png"
              alt="nekicovek nekicovekovic"
              className="offer_image"
            />
            <div style={{ position: "relative", top: 10 }}>
              <h1 className="name_of_offer">Ticher for u lol</h1>
              <div className="block_of_price_and_status">
                <p className="price_and_status">700 ₽</p>
                <p className="price_and_status">online</p>
              </div>
              <div className="block_of_review">
                <img
                  src="/src/static/img/11.png"
                  alt=""
                  className="img_of_review"
                />
                <h1 className="header_of_review"> 4.7</h1>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>

        </>

  )
}

export default Offer_load
