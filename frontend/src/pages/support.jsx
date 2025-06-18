import React from 'react';
import { useState, useEffect } from 'react'
import '../static/support.css';
import arrLangNavigPanel from '../../languages/nav_panel.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';


function Support() {

    const websocket = useWebSocket();
    const [lang, setLang] = useState(websocket.lang);
   
    document.querySelector("title").textContent = arrLangNavigPanel[lang]['support'];
        
    return (
        <div className="support-container">
          <div className="support-hero">
            <h1>Мы здесь, чтобы помочь</h1>
            <p className="hero-subtitle">Наша команда поддержки готова ответить на ваши вопросы</p>
          </div>
          
          <div className="support-content">
            <div className="contact-methods">
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Электронная почта</h3>
                <p>Пишите нам по любым вопросам</p>
                <a href="mailto:sinmak.show@bk.ru" className="contact-link">sinmak.show@bk.ru</a>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📱</div>
                <h3>Telegram</h3>
                <p>Пишите сообщения прямо Telegram-каналу</p>
                <a href="https://t.me/day_lang" target="_blank" rel="noopener noreferrer" className="contact-link">@day_lang</a>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📚</div>
                <h3>База знаний</h3>
                <p>Ответы на частые вопросы</p>
                <a href="#" className="contact-link">Перейти к FAQ</a>
              </div>
            </div>
            
            <div className="support-info">
              <h2>Когда вы получите ответ?</h2>
              <p>
                Мы стремимся отвечать на все обращения в течение 24 часов в рабочие дни.
                На вопросы, заданные в выходные, мы ответим в понедельник.
              </p>
              
              <div className="response-time">
                <div className="time-card">
                  <h4>Электронная почта</h4>
                  <p>До 24 часов</p>
                </div>
                <div className="time-card">
                  <h4>Telegram</h4>
                  <p>До 8 часов</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Support
