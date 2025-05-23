import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'

function Bye_and_call({bye, am_teach}) {



return (
    <>

    {(() => {
        if (!am_teach) {
          return (<>  <div className='message_korzina' onClick={() => bye()}>
                        <img src={"/src/static/img/korzina.png"} alt={"Call_Bye"} className='message_korzina_img'/>
                      </div> </>)
        }
      })()}


    {(() => {
        if (am_teach) {
          return (<>  <div className='message_call' onClick={() => call()}>
                        <img src={"/src/static/img/call.png"} alt={"Call_Bye"} className='message_call_img'/>
                      </div> </>)
        }
      })()}

    </>

  )
}

export default Bye_and_call
