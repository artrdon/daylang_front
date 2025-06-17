import React from 'react';
import '../static/failed_payment.css';
import { Link } from 'react-router';

const FailedPayment = () => {
  return (
    <div className="payment-failed-container">
      <div className="payment-failed-card">
        <div className="payment-failed-icon">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
          </svg>
        </div>
        <h1 className="payment-failed-title">Оплата не прошла</h1>
        <p className="payment-failed-message">К сожалению, произошла ошибка при обработке вашего платежа. Пожалуйста, попробуйте еще раз.</p>
        
        <div className="payment-failed-details">
          <div className="detail-row">
            <span className="detail-label">Код ошибки:</span>
            <span className="detail-value">#PAYMENT_404</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Время:</span>
            <span className="detail-value">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Сумма:</span>
            <span className="detail-value">2 499 ₽</span>
          </div>
        </div>
        
        <Link to={'/'}>
            <div className="payment-failed-actions">
                <button className="retry-button">Вернуться в магазин</button>
            </div>
        </Link>
        
        <div className="support-message">
          Нужна помощь? <a href="/support">Свяжитесь с нашей службой поддержки</a>
        </div>
      </div>
    </div>
  );
};

export default FailedPayment;