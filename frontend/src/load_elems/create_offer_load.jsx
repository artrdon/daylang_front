import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'

function Create_offer_load() {

    const [count, setCount] = useState(0)


    return (
        <>
       <div  className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
     <form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="crt_offer_gray_thing">
          <div className="crt_offer_blank">
            <p
              style={{
                width: 570,
                margin: 40,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 30
              }}
            >
              Create offer
            </p>
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>Name</span>
            </div>
            <div className="input_field_name"></div>

            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>Description</span>
            </div>
            <div className="input_field_description"></div>

            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>Price</span>
            </div>
            <div className="input_field_name"></div>


            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 40,
                fontSize: 20
              }}
            >
              <span>Load photo</span>
            </div>
            <input
              accept="image/png"
              id="icon404873"
              name="icon"
              type="file"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "relative",
                display: "inline-block",
                top: 18,
                left: 250
              }}
            />
            <div
              style={{
                width: 570,
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                top: 50,
                fontSize: 20,
                height: 500
              }}
            >
              <img
                alt=""
                style={{
                  width: 300,
                  height: 300,
                  position: "relative",
                  top: 50,
                  display: "block",
                }}
                src="/src/static/img/nema.png"
              />
            </div>
              <button
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: "gray",
                  margin: 20,
                  fontSize: 30
                }}
                type="submit"
              >
                Save
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

export default Create_offer_load
