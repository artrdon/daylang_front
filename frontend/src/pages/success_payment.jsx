import React from 'react';
import '../static/success_payment.css';
import { Link } from 'react-router';

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
          </svg>
        </div>
        <h1 className="success-title">Оплата прошла успешно!</h1>
        <p className="success-message">Спасибо за ваш заказ. Мы отправили подтверждение на вашу электронную почту.</p>
        
        <div className="order-details">
          <div className="detail-row">
            <span className="detail-label">Номер заказа:</span>
            <span className="detail-value">#123456</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Дата:</span>
            <span className="detail-value">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Сумма:</span>
            <span className="detail-value">2 499 ₽</span>
          </div>
        </div>
        
        <Link to={'/'}>
            <button className="continue-button">Вернуться в магазин</button>
        </Link>
        
        <div className="support-message">
          Есть вопросы? <a href="/support">Свяжитесь с нашей службой поддержки</a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;