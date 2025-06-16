import arrLangNavigPanel from "../../languages/nav_panel";
import { useWebSocket } from '../once/web_socket_provider.jsx';


export default function Privacy() {

  const websocket = useWebSocket();
  const lang = websocket.lang;
  

  document.querySelector("title").textContent = arrLangNavigPanel[lang]['privacy_policy'];  
console.log(window.location.pathname);
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