import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useState } from 'react';

// Указываем путь к worker-у PDF.js (обязательно для корректной работы)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="/src/static/docks/pryvacy.pdf"  // Путь к PDF-файлу (может быть URL или Blob)
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Страница {pageNumber} из {numPages}
      </p>
      <button 
        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
        disabled={pageNumber <= 1}
      >
        Назад
      </button>
      <button 
        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
        disabled={pageNumber >= numPages}
      >
        Вперед
      </button>
    </div>
  );
}