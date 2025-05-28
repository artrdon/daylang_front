import React from 'react';
import LoadingSpinner from '../elems/loading_spinner.jsx';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import vars from '/api.js'
import '/src/static/ai_speak.css'

function TestAI() {

    const audio = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
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

    const speak = (text) => {
        if (audio.current) {
            audio.current.pause();
            audio.current = null;
        }

        const audioSrc = `data:${text['format']};base64,${text['audio']}`;
        audio.current = new Audio(audioSrc);
        audio.current.play();
        setIsSpeaking(true);

        audio.current.onended = () => {
            console.log("Воспроизведение завершено");
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

        try {
            setWaitForAnswer(true);
            const response = await axios.post(`${vars['APIURL']}/airequest/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            console.log('Response:', response.data);    
            const newAnswer = {
                myPromt: response.data['myText'],
                AIAnswer: response.data['text'],
            };
            setAnswers((answers) => [...answers, newAnswer]);
            
            if (typeof response.data === 'string') {
                speak(response.data)
                
                setPromt({promt: ""});
                setWaitForAnswer(false);
            } else if (response.data.text) {
                speak(response.data)

                setPromt({promt: ""});
                setWaitForAnswer(false);
            } else {
                speak(response.data)
                
                setPromt({promt: ""});
                setWaitForAnswer(false);
            }
            
        } catch (error) {
            console.error('There was an error!', error.request.data);
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

    return (
        <>
<div>
    {!waitForAnswer && <> 
        {!isSpeaking && <> 
        {/*<textarea name="promt" id="" value={promt.promt} onChange={handleInput} style={{position: "fixed", bottom: 0, left: 400, width: 500, height: 100, color: "black", backgroundColor: "white", resize: "none"}}></textarea>
        <button onClick={send_request} style={{width: 200, height: 100, backgroundColor: "white", color: "black"}}>send_request</button>*/} 
        {!isRecording && <button onClick={startRecording} className='ai_speak_start_end_record_button' >start talking</button>}
        {isRecording && <button onClick={stopRecording} className='ai_speak_start_end_record_button' >end talking</button>} </>}
        {isSpeaking && <> <button onClick={pause} className='ai_speak_stop_resume_cancel_button'>pause</button>
        <button onClick={resume} className='ai_speak_stop_resume_cancel_button'>resume</button>
        <button onClick={cancel} className='ai_speak_stop_resume_cancel_button'>cancel</button> </>}
    </>}
    {waitForAnswer && <LoadingSpinner/>}
</div>
</>

  )
}

export default TestAI
