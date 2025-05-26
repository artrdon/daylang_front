import React from 'react';
import LoadingSpinner from '../elems/loading_spinner.jsx';
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';

function TestAI() {

    const [waitForAnswer, setWaitForAnswer] = useState(false);
    const [promt, setPromt] = useState({promt: ""});
    const [answers, setAnswers] = useState([]);
    const handleInput = (e) => {
        setPromt({ ...promt, [e.target.name]: e.target.value });
    }
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
        
    useEffect(() => {
        if (window.speechSynthesis) {
            console.log("Синтез речи поддерживается");
        } 
        else {
            console.log("Синтез речи НЕ поддерживается");
        }
        if (window.webkitSpeechRecognition) {
            console.log("Распознавание речи поддерживается");
        } else {
            console.log("Распознавание речи НЕ поддерживается");
        }
        if (getCookie('theme') === "dark"){
            if (document.querySelector('body') != null)
                document.querySelector('body').className = "dark_theme";
        }
        else{
            if (document.querySelector('body') != null)
                document.querySelector('body').className = "light_theme";
        }
    
    }, []);

    const speak = (text) => {
        if(window.speechSynthesis) {
            console.log("govory");
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            utterance.lang = "en";           // аббревиатура языка
            utterance.volume = 8;          // громкость
            utterance.rate = 1.1;            // скорость
            utterance.pitch = 1;           // высота
            window.speechSynthesis.speak(utterance);
        } 
        else{
            console.log("Feature not supported");
        }
    }
    
    const send_request = async (e) => {
        e.preventDefault();
        
        try {
            setWaitForAnswer(true);
            const response = await axios.post(`${APIURL}/airequest/`, {answers: answers, promt: promt}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', response.data);    
            const newAnswer = {
                myPromt: promt,
                AIAnswer: response.data,
            };
            setAnswers((answers) => [...answers, newAnswer]);
            let cleanedData;
            if (typeof response.data === 'string') {
                cleanedData = response.data.replace(/\*/g, '');
                speak(cleanedData);
                setPromt({promt: ""});
                setWaitForAnswer(false);
            } else if (response.data.text) {
                cleanedData = response.data.text.replace(/\*/g, '');
                speak(cleanedData);
                setPromt({promt: ""});
                setWaitForAnswer(false);
            } else {
                cleanedData = JSON.stringify(response.data).replace(/\*/g, '');
                speak(cleanedData);
                setPromt({promt: ""});
                setWaitForAnswer(false);
            }
            
        } catch (error) {
            console.error('There was an error!', error.request.data);
        }
    };

    return (
        <>
<div>
    {!waitForAnswer && <> 
        <textarea name="promt" id="" value={promt.promt} onChange={handleInput} style={{position: "fixed", bottom: 0, left: 400, width: 500, height: 100, color: "black", backgroundColor: "white", resize: "none"}}></textarea>
        <button onClick={send_request} style={{width: 200, height: 100, backgroundColor: "white"}}></button>
    </>}
    {waitForAnswer && <LoadingSpinner/>}
</div>
</>

  )
}

export default TestAI
