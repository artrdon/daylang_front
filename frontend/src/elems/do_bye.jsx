import { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import Calendar from 'react-calendar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';


function ImageWithFallback({ src, fallbackSrc, alt, }) {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        className="finded_img"
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }
  

function DoBye({setdate, date, removeDataSetter, name_of_offer, price, photo, review_score, description }) {
    let currentDate = new Date();
    let year = currentDate.getFullYear();

    let month = currentDate.getMonth() + 1;
    if (month < 10){
      month = "0" + String(month);
    }

    let reg_month = currentDate.getMonth() + 2;
    if (reg_month < 10){
      reg_month = "0" + String(reg_month); 
    }

    let day = currentDate.getDate() + 1;
    if (day < 10){
      day = "0" + String(day);
    }
    console.log(`${year}-${month}-${day}`);


    const [data, setData] = useState(null);
    const [components, setComponents] = useState([{time: "00:00 - 00:00", price: 0}]);
  
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/bye/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            /*console.log('Response:', response.data);
            if (response.data === "serializer.data"){
                location.reload();
            }*/

        } catch (error) {
            console.error('There was an error!', error.response.data);
        }

    };

    const { data: data3, isLoading: loading3, isError: error3, error: errorDetails3 } = useQuery({
      queryKey: ['offerinfo_bychat', params.id], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/offerinfo_bychat/${params.id}/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });

    
    useEffect(() => {
      if (data3){
      let time_to_work = 60 * (Number(data3.end_of_work_day) - Number(data3.begin_of_work_day));
      const lesson_time = Number(data3.during_of_lesson);
      const break_betwen_lessons = Number(data3.during_of_break);
      let array_of_components = [];
      let beg_time = Number(data3.begin_of_work_day) * 60;
      let end_time = Number(data3.end_of_work_day) * 60;
      console.log(time_to_work);
      for (let i = 0; i < time_to_work; time_to_work -= (lesson_time + break_betwen_lessons)){
        if (time_to_work - lesson_time >= 0){
          if (beg_time + lesson_time > end_time){
            break;
          }
          let beg_time_hour = Math.floor(beg_time / 60);
          let beg_time_minute = beg_time % 60;
          let end_time_hour = Math.floor((beg_time + lesson_time) / 60);
          let end_time_minute = (beg_time + lesson_time) % 60;
          const newComponent = {
            time: `${beg_time_hour}:${beg_time_minute} - ${end_time_hour}:${end_time_minute}`,
            price: data3.price,
          };
          array_of_components.push(newComponent);
          beg_time += lesson_time + break_betwen_lessons;
        }
      }
      setComponents(array_of_components);
    }
    }, [data3]);
  
    if (loading3) return (<>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
            <div style={{ position: "absolute", zIndex: 1000, background: "black", width: "100vw", height: "100vh", opacity: "30%" }}  onClick={removeDataSetter}>
            </div>
            <form>
                <div style={{ position: "relative", zIndex: 1001, margin: "auto", display: "block", width: 500, height: "auto", backgroundColor: "rgb(46, 46, 46)", padding: 50, borderRadius: 10}}>
                </div>
            </form>
            
          </div>
           
    </>);
    if (error3) return <p>Error: {error3}</p>;

console.log(data3);

return ( 
    <>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
            <div style={{ position: "absolute", zIndex: 1000, background: "black", width: "100vw", height: "100vh", opacity: "30%" }}  onClick={removeDataSetter}>
            </div>
            <form>
                <div style={{ position: "relative", zIndex: 1001, margin: "auto", display: "block", width: 500, height: "auto", backgroundColor: "rgb(46, 46, 46)", padding: 50, borderRadius: 10}}>
                    <div style={{width: "calc(100% - 40px)", height: 150, margin: 20, borderRadius: 20, border: "1px solid gray"}}>
                        <h1 className="message_finded_name">{data3.name_of_offer}</h1>
                        <ImageWithFallback src={data3.photo} alt="nekicovek nekicovekovic" fallbackSrc="/src/static/img/nema.png"/>
                        <div className="part_with_text">
                            <p className="message_finded_price" style={{color: "rgb(0, 184, 0)" }}>{data3.price} ₽</p>
                            <div className="message_finded_review">
                              <img src="/src/static/img/11.png" alt="" className="img_review" />
                              <p className="review_text">{data3.review_score}</p>
                            </div>
                            <p className="message_description_lol">
                                {data3.description}
                            </p>
                          </div>
                    </div>
                    <input type="date" min={`${year}-${month}-${day}`} max={`${year}-${reg_month}-${day}`} name="" id="" style={{outline: "none", width: "auto", fontSize: 30, display: "block", borderRadius: 5, border: 0, margin: 20}}/>
                    <input type="time" name="" id="" style={{outline: "none", width: "auto", fontSize: 30, display: "block", borderRadius: 5, border: 0, margin: 20}}/>
                    <div className='crt_offer_work_day_div_work_grafic'>
                        {components.map((component, index) => ( 
                              <div className='crt_offer_work_day_work_grafic' name="Monday" key={index}>
                                <span>{component.time}</span>
                                <div>{component.price} ₽</div>
                              </div>
                          ))}
                      
                    </div>
                    <button type='submit' style={{outline: "none", width: "calc(100% - 40px)", fontSize: 30, display: "block", borderRadius: 5, border: 0, margin: 20, padding: 10}}>Pay {data3.price} ₽</button>
                </div>
            </form>
            
          </div>

    </>

  )
}

export default DoBye
