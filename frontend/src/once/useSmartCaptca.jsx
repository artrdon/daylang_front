import { useEffect, useState } from 'react';

export function useSmartCaptcha(siteKey) {
  const [captchaReady, setCaptchaReady] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkCaptchaLoaded = () => {
      if (window.smartCaptcha) {
        setCaptchaReady(true);
        return true;
      }
      return false;
    };

    if (!checkCaptchaLoaded()) {
      const timer = setInterval(() => {
        if (checkCaptchaLoaded()) {
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, []);

  const executeCaptcha = () => {
    return new Promise((resolve, reject) => {
      if (!captchaReady) {
        reject(new Error('Captcha not loaded'));
        return;
      }

      const container = document.createElement('div');
      container.style.display = 'none';
      document.body.appendChild(container);

      window.smartCaptcha.render(container, {
        sitekey: siteKey,
        invisible: true,
        callback: (token) => {
          document.body.removeChild(container);
          setToken(token);
          resolve(token);
        },
        errorCallback: () => {
          document.body.removeChild(container);
          reject(new Error('Captcha failed'));
        }
      });

      window.smartCaptcha.execute();
    });
  };

  return { executeCaptcha, token, captchaReady };
}