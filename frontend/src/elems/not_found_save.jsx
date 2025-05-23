import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import arrLangNotFound from '/languages/not_found_and_so.js';
import axios from 'axios';

function NotFoundSave({ iwant }) {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');



    return (
            <>
            <div className='not_found_no_yet'>
                <p className='not_found_no_yet_font'>{arrLangNotFound[lang][iwant]}</p>
            </div>
        </>
    )
}

export default NotFoundSave