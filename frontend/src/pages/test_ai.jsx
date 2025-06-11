import React from 'react';
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../elems/loading_spinner.jsx';
import arrLangNavigPanel from '../../languages/nav_panel.js';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import SmileTest from './smile.jsx';
import '/src/static/ai_speak.css'

function TestAI() {

    const env = import.meta.env;
    const audio = useRef(null);
    const mediaRecorderRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const analyserRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechStatus, setSpeechStatus] = useState('Ready');
    const [waitForAnswer, setWaitForAnswer] = useState(false);
    const [whatHeSaid, setWhatHeSaid] = useState(false);
    const language = "Английского"
    const [answers, setAnswers] = useState([{myPromt: `теперь ты преподаватель ${language} языка, ты должен говорить только на нем, можешь обьяснять грамматику на различных примерах, которые я тебе скажу, но твоя основная задача вести диалог на ${language} языке, ты сам должен предагать темы разговора, если я не знаю о чем поговорить, должен переклчатся на русский, если я тебя об этом попрошу.`, AIAnswer: "",}]);
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
    const params = useParams();

    const [upValue, setUpValue] = useState(-0.01);
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const ShowWhatHeSaid = () => {
        setWhatHeSaid(!whatHeSaid);
    }
    


    const visualize = (analyser) => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            const volume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
            const baseRadius = Math.min(400, 400) * 0.2;
            const pulseRadius = baseRadius + (volume / 255) * baseRadius * 0.5;
            const lol = (100 - pulseRadius) / (-200) - 0.1;
            setUpValue(lol);
            
        };
        
        draw();
      };
    

    const speak = (text) => {
        if (audio.current) {
            audio.current.pause();
            audio.current = null;
        }
        const audioSrc = `data:${text['format']};base64,${text['audio']}`;
        audio.current = new Audio(audioSrc);
        audio.current.play();
        setIsSpeaking(true);
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 32;
        const source = audioContext.createMediaElementSource(audio.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        visualize(analyser);

        audio.current.onended = () => {
            audio.current = null;
            setIsSpeaking(false);
        };
    }
    const pause = () => {
        if (audio.current && !audio.current.paused) {
            audio.current.pause();
        }
    };

    const resume = () => {
        if (audio.current && audio.current.paused) {
            audio.current.play().catch(e => console.error("Resume failed:", e));
        }
    };

    const cancel = () => {
        if (audio.current) {
            audio.current.pause();
            audio.current.currentTime = 0; // Перемотка в начало
            audio.current = null;
            setIsSpeaking(false);
            setSpeechStatus('Stopped');
        }
        
    };
    const send_request = async (blob) => {
      //  if (e) e.preventDefault();
        
        const formData = new FormData();
        formData.append('audio', blob, 'recording.wav');
        formData.append('answers', JSON.stringify(answers));
        formData.append('id', params.id);


        try {
            setWaitForAnswer(true);
            const response = await axios.post(`${env.VITE_APIURL}/airequest/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            const newAnswer = {
                myPromt: response.data['myText'],
                AIAnswer: response.data['text'],
            };
            setAnswers((answers) => [...answers, newAnswer]);
            if (typeof response.data === 'string') {
                speak(response.data)
                setWaitForAnswer(false);
            } else if (response.data.text) {
                speak(response.data)
                setWaitForAnswer(false);
            } else {
                speak(response.data)
                setWaitForAnswer(false);
            }
        } catch (error) {
            console.error('There was an error!', error.request);
        }
    };

    // Функция для конвертации AudioBuffer в WAV
    const audioBufferToWav = async (buffer) => {
        const numOfChan = buffer.numberOfChannels;
        const length = buffer.length * numOfChan * 2;
        const buffer2 = new ArrayBuffer(44 + length);
        const view = new DataView(buffer2);
        const channels = [];
        let offset = 0;
        let pos = 0;

        // write WAVE header
        setUint32(0x46464952);                         // "RIFF"
        setUint32(36 + length);                        // file length - 8
        setUint32(0x45564157);                         // "WAVE"
        setUint32(0x20746d66);                         // "fmt " chunk
        setUint32(16);                                 // length = 16
        setUint16(1);                                  // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(buffer.sampleRate);
        setUint32(buffer.sampleRate * 2 * numOfChan);  // avg. bytes/sec
        setUint16(numOfChan * 2);                      // block-align
        setUint16(16);                                 // 16-bit
        setUint32(0x61746164);                         // "data" - chunk
        setUint32(length);                             // chunk length

        // write interleaved data
        for(let i = 0; i < buffer.numberOfChannels; i++) {
            channels.push(buffer.getChannelData(i));
        }

        while(pos < buffer.length) {
            for(let i = 0; i < numOfChan; i++) {
                let sample = Math.max(-1, Math.min(1, channels[i][pos]));
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0;
                view.setInt16(44 + offset, sample, true);
                offset += 2;
            }
            pos++;
        }

        function setUint16(data) {
            view.setUint16(pos, data, true);
            pos += 2;
        }

        function setUint32(data) {
            view.setUint32(pos, data, true);
            pos += 4;
        }

        return new Blob([buffer2], { type: 'audio/wav' });
    }
    

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: 'audio/webm' // явно указываем формат записи
        });
        
        mediaRecorderRef.current.ondataavailable = (e) => {
            audioChunksRef.current.push(e.data);
        };
        
        mediaRecorderRef.current.onstop = async () => {
            // Сначала создаем blob в формате webm
            const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            // Конвертируем webm в wav
            const audioContext = new AudioContext();
            const audioData = await webmBlob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(audioData);
            
            // Создаем WAV файл
            const wavBlob = await audioBufferToWav(audioBuffer);
            
            await send_request(wavBlob);
            audioChunksRef.current = [];
        };
        
        mediaRecorderRef.current.start();
        setIsRecording(true);
    };


    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${env.VITE_APIURL}/check_access/${params.id}/`);
            setData(response.data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, []);

  
    
    if (loading) return <LoadingSpinner/>;
    if (error) return <p>Error: {error}</p>;
    
    document.querySelector("title").textContent = arrLangNavigPanel[lang]['ai'];

    return (
        <>
<div>
    <button className='ai_speak_what_he_said_button' onClick={ShowWhatHeSaid}>
        what he said
    </button>
    {whatHeSaid && <>
        <div className='ai_speak_what_he_said_panel_div'>
            <div style={{overflow: "auto", height: "100%"}}>
                {answers.map((data, index) => (
                    <p className='ai_speak_what_he_said_panel_p' key={index}>{data.AIAnswer}</p>
                ))}
            </div>
            <button className='ai_speak_what_he_said_panel_close_button' onClick={ShowWhatHeSaid}>
                close
            </button>
        </div>
    </>}
    <div style={{width: "100vw", height: "100svh", position: "fixed", display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center"}}>
        <SmileTest upValue={upValue}/>
    </div>
    {!waitForAnswer && <> 
        {!isSpeaking && <> 
        {/*<textarea name="promt" id="" value={promt.promt} onChange={handleInput} style={{position: "fixed", bottom: 0, left: 400, width: 500, height: 100, color: "black", backgroundColor: "white", resize: "none"}}></textarea>
        <button onClick={send_request} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>send_request</button>*/} 
        {!isRecording && <button onClick={startRecording} className='ai_speak_start_end_record_button' >start talking</button>}
        {isRecording && <button onClick={stopRecording} className='ai_speak_start_end_record_button' >end talking</button>} </>}
        {isSpeaking && <> 
        <div style={{width: "100%", position: "absolute", bottom: 0}}>
            <button onClick={pause} className='ai_speak_stop_resume_cancel_button'>pause</button>
            <button onClick={resume} className='ai_speak_stop_resume_cancel_button'>resume</button>
            <button onClick={cancel} className='ai_speak_stop_resume_cancel_button'>cancel</button>
        </div>
         </>}
    </>}
    {waitForAnswer && <LoadingSpinner/>}
</div>
</>

  )
}

export default TestAI
