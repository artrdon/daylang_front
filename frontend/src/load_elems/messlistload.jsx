import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'


function Message_list_load() {


    return (
        <>
        <div className="find_panel" style={{ width: "100%", height: "calc(100% - 70px)", }}>
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div className="panel_of_messs">
      <div style={{ height: "100%", overflow: "auto" }}>
          <div className="panel_of_one_mes">

          </div>
      </div>
    </div>
  </div>
</div>

        </>

  )
}

export default Message_list_load
