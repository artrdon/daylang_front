import arrLangNavigPanel from "../../languages/nav_panel";
import { useWebSocket } from '../once/web_socket_provider.jsx';


export default function Public_oferta() {

  const websocket = useWebSocket();
  const lang = websocket.lang;
  

  document.querySelector("title").textContent = arrLangNavigPanel[lang]['privacy_policy'];  

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <iframe 
        src="/src/static/docks/public_oferta.pdf"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Публичная оферта"
      >
        <p>Ваш браузер не поддерживает PDF. <a href="/src/static/docks/public_oferta.pdf">Скачайте файл</a>.</p>
      </iframe>
    </div>
  );
}