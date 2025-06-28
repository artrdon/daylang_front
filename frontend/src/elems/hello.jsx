import { useState, useEffect } from 'react'
import '../static/hello.css'
import { useNavigate } from 'react-router-dom';


function Hello({lang}) {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const cookie = getCookie('iamnew');
    const navigate = useNavigate();
    const [cook, setCook] = useState(null);
    const [page, setPage] = useState(0);
   
    const nextPage = () => {
        setPage(prev => (prev + 1));
    }
    const prevPage = () => {
        setPage(prev => (prev - 1));
    }

    useEffect(() => {
        if (cookie != undefined){
            setCook(true);
        }
        else {
            setCook(false);
        }
    }, []);
    
    

    const allowCookieLog = () => {
        document.cookie = `iamnew=yes; path=/;max-age=31556926`;
        setCook(false);
        navigate('/log');
    }
    const allowCookieReg = () => {
        document.cookie = `iamnew=yes; path=/;max-age=31556926`;
        setCook(false);
        navigate('/reg');
    }

    const demoMode = () => {
        navigate('/demo_speak');
    }
    if (cook === null) return;


return (
    <>
    {!cook && 
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100svh"}} id='id_of_fuking_cookieiamnew'>
        <div className='do_bye_transparency_fon'/>
        <div className='hello_main_page'>
            {page === 0 &&
                <div className='hello_main_info'>
                    <h3 className='hello_main_info_h3'>DayLang</h3>
                    <p className='hello_main_info_p'>
                        Мы создали платформу, где вы можете практиковать английский язык в комфортной обстановке, 
                        без страха ошибиться. Технология искусственного интеллекта понимает вас и
                        поддерживает беседу.
                    </p>
                </div>
            }
            {page === 1 &&
                <div className='hello_main_info'>
                    <h3 className='hello_main_info_h3'>Живое общение</h3>
                    <p className='hello_main_info_p'>
                        Разговаривайте на любые темы, как с настоящим собеседником
                    </p>
                </div>
            }
            {page === 2 &&
                <div className='hello_main_info'>
                    <h3 className='hello_main_info_h3'>Мгновенная обратная связь</h3>
                    <p className='hello_main_info_p'>
                        Получайте корректные варианты ваших фраз и полезные подсказки
                    </p>
                </div>
            }
            {page === 3 &&
                <div className='hello_main_info'>
                    <h3 className='hello_main_info_h3'>Доступно в любое время</h3>
                    <p className='hello_main_info_p'>
                        Практикуйтесь когда удобно - не нужно подстраиваться под чужое расписание
                    </p>
                </div>
            }
            {page === 4 &&
            <>
                <div className='hello_main_info'>
                    <h3 className='hello_main_info_h3'>Что дальше?</h3>
                    <p className='hello_main_info_p'>
                        Мы постоянно работаем над улучшением нашего сервиса, чтобы сделать изучение английского 
                        языка максимально эффективным и приятным. Ваш прогресс и комфорт - наш главный приоритет.
                    </p>
                    <button className='hello_main_button' onClick={allowCookieLog}>
                        Войти в аккаунт
                    </button>
                    <button className='hello_main_button' onClick={allowCookieReg}>
                        Создать аккаунт
                    </button>
                    <button className='hello_main_button' onClick={demoMode}>
                        Попробовать бесплатно
                    </button>
                </div>
                
            </>
                
            }
            <div className='hello_swith_buttons_panel'>
                {page < 4 && 
                    <button className='arrow-tail' onClick={nextPage} style={{ backgroundColor: "transparent" }}></button>
                }
                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute"}}>
                    <div className={`hello_page_circle_unselected${page === 0 ? ' select' : ''}`}></div>
                    <div className={`hello_page_circle_unselected${page === 1 ? ' select' : ''}`}></div>
                    <div className={`hello_page_circle_unselected${page === 2 ? ' select' : ''}`}></div>
                    <div className={`hello_page_circle_unselected${page === 3 ? ' select' : ''}`}></div>
                    <div className={`hello_page_circle_unselected${page === 4 ? ' select' : ''}`}></div>
                </div>
                {page > 0 && 
                    <button className='arrow-tail' style={{ transform: "rotate(180deg)", right: "unset", left: 0, backgroundColor: "transparent"}} onClick={prevPage}></button>
                }
                
                
            </div>
            
        </div>
    </div>
    }
    </>

  )
}

export default Hello
