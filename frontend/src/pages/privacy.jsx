import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useState } from 'react';


export default function Privacy() {
  

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <iframe 
        src="/src/static/docks/privacy.pdf"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Политика конфиденциальности"
      >
        <p>Ваш браузер не поддерживает PDF. <a href="/src/static/docks/privacy.pdf">Скачайте файл</a>.</p>
      </iframe>
    </div>
  );
}