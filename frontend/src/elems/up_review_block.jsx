import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import axios from 'axios';


function UpReviewBlock() {

    const [count, setCount] = useState(0)

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');
    let params = useParams();

    return (
    <>
        <div style={{ display: "block", paddingBottom: 100, position: "relative", top: 100, border: "1px solid gray", borderTopLeftRadius: 50, borderTopRightRadius: 50,  }}>
            <br />
            <br />
        </div>
    </>

  )
}

export default UpReviewBlock
