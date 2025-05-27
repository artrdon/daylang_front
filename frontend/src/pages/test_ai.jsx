import React from 'react';
import LoadingSpinner from '../elems/loading_spinner.jsx';
import { useState, useEffect } from 'react'
import axios from 'axios';
import APIURL from '/api.js'

function TestAI() {

    const [utterance, setUtterance] = useState(new SpeechSynthesisUtterance());
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [speechStatus, setSpeechStatus] = useState('Ready');
    const [waitForAnswer, setWaitForAnswer] = useState(false);
    const lang = "Английского"
    const [promt, setPromt] = useState({promt: ""});
    const [answers, setAnswers] = useState([{myPromt: `теперь ты преподаватель ${lang} языка, ты должен говорить только на нем, можешь обьяснять грамматику на различных примерах, которые я тебе скажу, но твоя основная задача вести диалог на ${lang} языке, ты сам должен предагать темы разговора, если я не знаю о чем поговорить, должен переклчатся на русский, если я тебя об этом попрошу.`, AIAnswer: "",}]);
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
            
            utterance.text = text;
            utterance.lang = "en";           // аббревиатура языка
            utterance.volume = 8;          // громкость
            utterance.rate = 1.1;            // скорость
            utterance.pitch = 1;           // высота

            // Обработчики событий
            utterance.onstart = () => {
                setIsSpeaking(true);
                setSpeechStatus('Speaking...');
            };
        
            utterance.onend = () => {
                setIsSpeaking(false);
                setSpeechStatus('Finished');
                setTimeout(() => setSpeechStatus('Ready'), 2000);
            };
        
            utterance.onerror = (event) => {
                console.error('SpeechSynthesis error:', event.error);
                setIsSpeaking(false);
                setSpeechStatus(`Error: ${event.error}`);
            };
        
            utterance.onpause = () => {
                //setIsSpeaking(false);
                setSpeechStatus('Paused');
            };
        
            utterance.onresume = () => {
                //setIsSpeaking(true);
                setSpeechStatus('Resumed');
            };
        
            utterance.onboundary = (event) => {
             //   console.log('Reached boundary:', event);
            };
  
            setIsSpeaking(true);
            window.speechSynthesis.speak(utterance);
        } 
        else{
            console.log("Feature not supported");
        }
    }
    const pause = () => {
        window.speechSynthesis.pause(utterance);
    }
    const resume = () => {
        window.speechSynthesis.resume(utterance);
    }
    const cancel = () => {
        window.speechSynthesis.cancel(utterance);
        setIsSpeaking(false);
        setSpeechStatus('Stopped');
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
        {!isSpeaking && <> <textarea name="promt" id="" value={promt.promt} onChange={handleInput} style={{position: "fixed", bottom: 0, left: 400, width: 500, height: 100, color: "black", backgroundColor: "white", resize: "none"}}></textarea>
        <button onClick={send_request} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}></button> </>}
        <button onClick={pause} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>pause</button>
        <button onClick={resume} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>resume</button>
        <button onClick={cancel} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>cancel</button>
    </>}
    {waitForAnswer && <LoadingSpinner/>}
</div>
</>

  )
}

export default TestAI
