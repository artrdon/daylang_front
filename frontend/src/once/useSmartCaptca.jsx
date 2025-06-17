import { useEffect, useState, useCallback, useRef } from 'react';

export function useSmartCaptcha(siteKey) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const widgetId = useRef(null);

  // 1. Добавляем необходимые meta-теги динамически
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.httpEquiv = "Permissions-Policy";
    meta.content = "accelerometer=()";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // 2. Загружаем скрипт капчи
  useEffect(() => {
    if (window.smartCaptcha) return;

    const script = document.createElement('script');
    script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js?render=explicit';
    script.async = true;
    
    script.onload = () => {
      console.log('Yandex SmartCaptcha loaded');
    };
    
    script.onerror = () => {
      setError('Failed to load captcha script');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.smartCaptcha && widgetId.current) {
        window.smartCaptcha.remove(widgetId.current);
      }
    };
  }, []);

  // 3. Инициализация и выполнение капчи
  const executeCaptcha = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!window.smartCaptcha) {
        reject(new Error('Captcha script not loaded'));
        return;
      }

      const container = document.createElement('div');
      container.id = `captcha-container-${Date.now()}`;
      container.style.display = 'none';
      document.body.appendChild(container);

      try {
        widgetId.current = window.smartCaptcha.render(container, {
          sitekey: siteKey,
          invisible: true,
          callback: (token) => {
            setToken(token);
            resolve(token);
            setTimeout(() => {
              if (document.body.contains(container)) {
                document.body.removeChild(container);
              }
            }, 1000);
          },
          'error-callback': () => {
            setError('Captcha verification failed');
            reject(new Error('Captcha failed'));
            document.body.removeChild(container);
          }
        });

        window.smartCaptcha.execute(widgetId.current);
      } catch (err) {
        document.body.removeChild(container);
        reject(err);
      }
    });
  }, [siteKey]);

  // 4. Сброс капчи
  const resetCaptcha = useCallback(() => {
    if (window.smartCaptcha && widgetId.current) {
      window.smartCaptcha.reset(widgetId.current);
    }
    setToken(null);
    setError(null);
  }, []);

  return { 
    executeCaptcha, 
    resetCaptcha, 
    token, 
    error,
    isReady: !!window.smartCaptcha
  };
}