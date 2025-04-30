import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams } from "react-router";
import App from '/src/App.jsx'
import axios from 'axios';


function UpReviewBlock() {


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');
    let params = useParams();

    return (
    <>
        <div className="offer_page_up_review_block">
            <br />
            <br />
        </div>
    </>

  )
}

export default UpReviewBlock
