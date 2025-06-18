import React from 'react';
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../elems/loading_spinner.jsx';
import arrLangNavigPanel from '../../languages/nav_panel.js';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useWebSocket } from '../once/web_socket_provider.jsx';
import SmileTest from './smile.jsx';
import arrLangAI from '../../languages/ai.js';
import '/src/static/ai_speak.css'

function ForbiddenTries() {



    return (
        <>
            <div className="not_found_all_container_404_positing" >
                <div className='not_found_all_container_404'>
                    <div className='not_found_font_404'>
                        <p>403</p>
                        <div style={{display: "flex", justifyContent: 'center'}}>
                        <div className='notfound_link_for_404'>
                            Закончился лимит попыток, приходите через 1 час
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TestAI() {

    const env = import.meta.env;
    const audio = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [data, setData] = useState({requests: 0, end: 0, language: 'english', });
    const [time, setTime] = useState(0);
    //const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const analyserRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    //const [speechStatus, setSpeechStatus] = useState('Ready');
    const [waitForAnswer, setWaitForAnswer] = useState(false);
    const [whatHeSaid, setWhatHeSaid] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [volume, setVolume] = useState(50);
    const [speed, setSpeed] = useState(1.0);
    const [tokens, setTokens] = useState(100);
    const [answers, setAnswers] = useState([{myPromt: `теперь ты преподаватель ${data?.language} языка, ты должен говорить только на нем, можешь обьяснять грамматику на различных примерах, которые я тебе скажу, но твоя основная задача вести диалог на ${data?.language} языке, ты сам должен предагать темы разговора, если я не знаю о чем поговорить, должен переклчатся на русский, если я тебя об этом попрошу.`, AIAnswer: "",}]);
    const [answersForWhatHeSaid, setAnswersForWhatHeSaid]  = useState([]);
    const [tokensInfo, showTokensInfo] = useState(false);
    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
    const params = useParams();

    const [upValue, setUpValue] = useState(-0.01);
    
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const ShowWhatHeSaid = () => {
        setWhatHeSaid(!whatHeSaid);
    }
    const ShowSettingsFunc = () => {
        setShowSettings(!showSettings);
    }
    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
    }
    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
    }
    const handleTokensChange = (e) => {
        const newTokens = parseFloat(e.target.value);
        setTokens(newTokens);
    }
    const showTokensInfoFunc = () => {
        showTokensInfo(!tokensInfo);
    }
    /*setInterval(() => {
        const now = Date.now() / 1000;
        setTime(data.end - now);
    }, 1000);

*/
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
        const zvuk = Number(volume) / 100;
        audio.current.volume = zvuk;
        audio.current.playbackRate = speed;
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
            //setSpeechStatus('Stopped');
        }
        
    };
    const send_request = async (blob) => {
      //  if (e) e.preventDefault();
        
        const formData = new FormData();
        formData.append('audio', blob, 'recording.wav');
        formData.append('answers', JSON.stringify(answers));
        formData.append('id', params.id);
        formData.append('tokens', tokens);

        if (data.requests <= 0){
            alert('У вас больше нет запросов');
            return;
        }
        try {
            setWaitForAnswer(true);
            setData(prevData => ({
                ...prevData,          // Копируем все существующие поля
                requests: prevData.requests - 1  // Уменьшаем `requests` на 1
            }));
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
            setAnswersForWhatHeSaid((answersForWhatHeSaid) => [...answersForWhatHeSaid, newAnswer]);
            
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
            if (error.request?.status === 400){
                alert(error.response.data['error']);
                setWaitForAnswer(false);
                return;
            }
            else if (error.response?.data['error']) {
                alert(error.response.data['error']);
                setWaitForAnswer(false);
                return;
            }
            else {
                alert(error.response.data);
                setWaitForAnswer(false);
                return;
            }
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
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${env.VITE_APIURL}/check_access/${params.id}/`);
            setData(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (audio.current) {
            audio.current.playbackRate = speed;
        }
    }, [speed]);
    
    useEffect(() => {
        if (audio.current) {
            const zvuk = Number(volume) / 100;
            audio.current.volume = zvuk;
        }
    }, [volume]);
  
    
    if (loading) return <LoadingSpinner/>;
    if (error){
        console.log(error)
        if (error.status === 403){
            return <ForbiddenTries />;
        }
        else {
            return <p>Error: {error}</p>;
        }
    } 
    
    document.querySelector("title").textContent = arrLangNavigPanel[lang]['ai'];

    return (
        <>
<div>
    <button className='ai_speak_settings_button' onClick={ShowSettingsFunc}>
        <img
            src="/src/static/img/setting.png"
            alt="settings"
            className="ai_speak_settings_img"
        />
    </button>
    {showSettings && <>
        <div className='do_bye_transparency_fon' style={{zIndex: 1100}}/>
        <div className='ai_speak_what_he_said_panel_div' style={{left: 0, zIndex: 1101}}> 
            <div style={{overflow: "auto", height: "100%"}}>
                <div className='ai_speak_settings_div'>
                    <p className='ai_speak_settings_name'>Осталось запросов: {data.requests}</p>
                   {/*<p className='ai_speak_settings_name'>Осталось времени: {Math.floor(time)}</p>*/}
                </div>

                <div className='ai_speak_settings_div'>
                    <p className='ai_speak_settings_name'>{arrLangAI[lang]['volume']}</p>
                    <input type="range" value={volume} min={0} max={100} onChange={handleVolumeChange} className='ai_speak_settings_reguling'/>
                    <p style={{textAlign: "center"}}>{volume}</p>        
                </div>
                <div className='ai_speak_settings_div'>
                    <p className='ai_speak_settings_name'>{arrLangAI[lang]['speed']}</p>
                    <input type="range" value={speed} min={0.1} max={2.0} step={0.01} onChange={handleSpeedChange} className='ai_speak_settings_reguling'/>  
                    <p style={{textAlign: "center"}}>×{speed}</p>      
                </div>
                <div className='ai_speak_settings_div'>
                    {tokensInfo && <div className='ai_speak_settings_info'>
                        Чем больше токенов, тем больше текст сгенерированного ответа, тем больше время ожидания.
                    </div>}
                    <p className='ai_speak_settings_name' onClick={showTokensInfoFunc} style={{cursor: "pointer"}}>{arrLangAI[lang]['tokens']}</p>
                    <input type="range" value={tokens} min={50} max={300} onChange={handleTokensChange} className='ai_speak_settings_reguling'/>
                    <p style={{textAlign: "center"}}>{tokens}</p>    
                </div>
            </div>
            <button className='ai_speak_what_he_said_panel_close_button' onClick={ShowSettingsFunc}>
                {arrLangAI[lang]['close']}
            </button>
        </div>
    </>}

    <button className='ai_speak_what_he_said_button' onClick={ShowWhatHeSaid} style={{right: 0}}>
        {arrLangAI[lang]['text_trans']}
    </button>
    {whatHeSaid && <>
        <div className='do_bye_transparency_fon' style={{zIndex: 1100}}/>
        <div className='ai_speak_what_he_said_panel_div' style={{right: 0, zIndex: 1101}}>
            <div style={{overflow: "auto", height: "100%"}}>
                {answersForWhatHeSaid.slice().reverse().map((data, index) => (
                    <div key={`${index}AI_MY_DIV`}>
                        <p className='ai_speak_what_he_said_panel_p' key={`${index}AI`}>{data.AIAnswer}</p> 
                        <p className='ai_speak_what_i_said_panel_p' key={`${index}MY`}>{data.myPromt}</p>
                    </div>
                ))}
            </div>
            <button className='ai_speak_what_he_said_panel_close_button' onClick={ShowWhatHeSaid}>
                {arrLangAI[lang]['close']}
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
        {/*!isRecording && <button onMouseUp={startRecording} className='ai_speak_start_end_record_button' >start talking</button>*/}
        {!isRecording && <button onClick={startRecording} className='ai_speak_start_end_record_button' >{arrLangAI[lang]['start_talking']}</button>}
        {isRecording && <button onClick={stopRecording} className='ai_speak_start_end_record_button' >{arrLangAI[lang]['end_talking']}</button>} </>}
         </>}
        {isSpeaking && <> 
        <div style={{width: "100%", position: "absolute", bottom: 0}}>
            <button onClick={pause} className='ai_speak_stop_resume_cancel_button'>{arrLangAI[lang]['pause']}</button>
            <button onClick={resume} className='ai_speak_stop_resume_cancel_button'>{arrLangAI[lang]['resume']}</button>
            <button onClick={cancel} className='ai_speak_stop_resume_cancel_button'>{arrLangAI[lang]['cancel']}</button>
        </div>
         </>}
    
    {waitForAnswer && <LoadingSpinner/>}
</div>
</>

  )
}

export default TestAI
