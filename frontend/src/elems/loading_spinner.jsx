import React from 'react'; // Создадим этот файл ниже

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default LoadingSpinner;