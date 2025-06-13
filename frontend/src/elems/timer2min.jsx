import React, { useState, useEffect } from 'react';

const TwoMinuteTimer = ({ setTimehave, handleSubmit, }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 минуты = 120 секунд
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setTimehave(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const resetTimer = async () => {
    await handleSubmit();
    setIsActive(false);
    setTimeLeft(120);
    setTimehave(true);
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='timer_for_code_time'>
        {formatTime(timeLeft)}
      </div>
      <div>
        {timeLeft <= 0 && <button 
          onClick={resetTimer}
          className="btn login_btn"
        >
          Сброс
        </button>}
        
      </div>
    </div>
  );
};

export default TwoMinuteTimer;