import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Настройка worker

function Privacy() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <iframe 
      src="/src/static/docks/pryvacy.pdf"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none'
      }}
      title="PDF Viewer"
    >
      Ваш браузер не поддерживает PDF. 
      <a href="/example.pdf">Скачать PDF</a>
    </iframe>
  );
}

export default Privacy