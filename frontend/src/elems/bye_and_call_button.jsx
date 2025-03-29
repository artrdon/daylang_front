import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'

function Bye_and_call({bye, am_teach}) {

    const [count, setCount] = useState(0)


return (
    <>

    {(() => {
        if (!am_teach) {
          return (<>  <div style={{  zIndex: 101, position: "absolute", right: 0, marginTop: 5, width: 80, height: 60 }} onClick={() => bye()}>
                        <img src={"/src/static/img/korzina.png"} alt={"Call_Bye"} style={{height: 60, paddingLeft: 10}}/>
                      </div> </>)
        }
      })()}


    {(() => {
        if (am_teach) {
          return (<>  <div style={{  zIndex: 101, position: "absolute", right: 0, marginTop: 10, width: 80, height: 60 }}>
                        <img src={"/src/static/img/call.png"} alt={"Call_Bye"} style={{height: 50, paddingLeft: 15}}/>
                      </div> </>)
        }
      })()}

    </>

  )
}

export default Bye_and_call
