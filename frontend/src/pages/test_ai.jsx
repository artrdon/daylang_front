import React from 'react';
import LoadingSpinner from '../elems/loading_spinner.jsx';
import { useState, useEffect } from 'react'
import axios from 'axios';
import APIURL from '/api.js'

function TestAI() {

    const [utterance, setUtterance] = useState(new SpeechSynthesisUtterance());
    const [speech, setSpeech] = useState(new webkitSpeechRecognition());
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
    const recognition = new webkitSpeechRecognition();
    let index = 0;
    
    
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
    
    }, []);

 /*   const speak = (text) => {
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
    */
    const send_request = async (e = null) => {
        if (e) e.preventDefault();
        
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
                AIAnswer: response.data['text'],
            };
            setAnswers((answers) => [...answers, newAnswer]);
            
            if (typeof response.data === 'string') {
                const audioSrc = `data:${response.data['format']};base64,${response.data['audio']}`;
                const audio = new Audio(audioSrc);
                audio.play();
                setPromt({promt: ""});
                setWaitForAnswer(false);
            } else if (response.data.text) {
                const audioSrc = `data:${response.data['format']};base64,${response.data['audio']}`;
                const audio = new Audio(audioSrc);
                audio.play();
                setPromt({promt: ""});
                setWaitForAnswer(false);
            } else {
                const audioSrc = `data:${response.data['format']};base64,${response.data['audio']}`;
                const audio = new Audio(audioSrc);
                audio.play();
                setPromt({promt: ""});
                setWaitForAnswer(false);
            }
            
        } catch (error) {
            console.error('There was an error!', error.request.data);
        }
    };

    const text_sintes = async (e = null) => {
        if (e) e.preventDefault();
        
        try {
            const response = await axios.post(`${APIURL}/aistt/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', response.data); 
            console.log(response.data['audio']);   
            try {
                const audioSrc = `data:${response.data['format']};base64,${response.data['audio']}`;
                const audio = new Audio(audioSrc);
                audio.play();
            } catch (error) {
                console.error("Ошибка декодирования аудио:", error);
                // Fallback на текст или альтернативный плеер
            }
            
        } catch (error) {
            console.error('There was an error!', error.request.data);
        }
    };

    const startRecognition = () =>{
        console.log("started recognition");
        if(window.webkitSpeechRecognition) {
            recognition.continuous = true;
            recognition.lang = "en";    // распознавание речи на русском языке
            recognition.start();    // начинаем распознавание
        } else {
            console.log("Распознавание речи НЕ поддерживается");
        }
    }
    const endRecognition = () =>{
        console.log("ended recognition");
        recognition.stop();
        index = 0;
    }

    recognition.onresult = function(event){ 
        const results = event.results;  //   получаем список результатов
        const firstResult = results[index++]; // получаем распознанный результат
        const firstAlternative = firstResult[0];    // получаем первый вариант распознавания
        const transcript = firstAlternative.transcript;  //  распознанный текст
        const confidence = firstAlternative.confidence;    // уровень уверенности 
        console.log(transcript);  
        setPromt(transcript);
        send_request();
        console.log(confidence);
    }

    return (
        <>
<div>
    {!waitForAnswer && <> 
        {!isSpeaking && <> 
        <textarea name="promt" id="" value={promt.promt} onChange={handleInput} style={{position: "fixed", bottom: 0, left: 400, width: 500, height: 100, color: "black", backgroundColor: "white", resize: "none"}}></textarea>
        <button onClick={send_request} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>send_request</button> 
        <button onClick={startRecognition} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>start recogntion</button>
        <button onClick={endRecognition} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>end recognition</button> </>}
        {/*<button onClick={pause} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>pause</button>
        <button onClick={resume} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>resume</button>
        <button onClick={cancel} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>cancel</button>*/}
        <button onClick={text_sintes} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>text synteth</button>
    </>}
    {waitForAnswer && <LoadingSpinner/>}
</div>
</>

  )
}

export default TestAI
