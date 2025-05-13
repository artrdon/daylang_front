import { Container, Row, Col, Card } from 'react-bootstrap';
import React from 'react';
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';
import { useWebSocket } from '../once/web_socket_provider.jsx';

function About() {

  
 /* const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);
  const websocket = useWebSocket();
  const [messNumb, setMessNumb] = useState(websocket.messNumb);
    useEffect(() => {
        setMessNumb(websocket.messNumb);
    }, [websocket.messNumb]);

    document.querySelector("title").textContent = "About us";


axios.defaults.withCredentials = true;


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


const theme = getCookie('theme');
//console.log(getCookie('theme'));


if (getCookie('theme') === "dark"){
  if (document.querySelector('body') != null)
      document.querySelector('body').className = "dark_theme";
}
else{
  if (document.querySelector('body') != null)
      document.querySelector('body').className = "light_theme";
}


    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;




    const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
      queryKey: ['userinfo'], // Уникальный ключ запроса
      queryFn: async () => {
        const response = await axios.get(`${APIURL}/userinfo/`);
        return response.data; // Возвращаем только данные
      },
      // Опциональные параметры:
      retry: 2, // Количество попыток повтора при ошибке
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      refetchOnWindowFocus: false, // Отключаем повторный запрос при фокусе окна
    });
  


  if (loading) return (
      <>
      <AppLoad lang={langua} messNumb={messNumb}/>
</>

  );
  if (error) return <p>Error: {error}</p>;
*/
//console.log(data);
    return (
        <>
{/*<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="ctr_offer_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="crt_offer_gray_thing">
        <div className="crt_offer_blank">
          <div className='under_crt_offer_blank'>
            <span translate="no">ООО "ДЭЙЛЭНГ"</span>
            <span style={{ display: "block" }} translate="no">
              ИНН: 218283626, ОГРН: 6232322727237
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>*/}

    <Container className="about-page py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4">О нашей платформе</h1>
          <p className="lead text-center">
            Мы соединяем студентов с лучшими преподавателями иностранных языков со всего мира
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <h2 className="mb-4">Наша миссия</h2>
          <p>
            Мы верим, что изучение языков должно быть доступным, удобным и эффективным. 
            Наша платформа создана, чтобы помочь вам найти идеального преподавателя, 
            который соответствует вашим целям, расписанию и бюджету.
          </p>
          <p>
            Будь то подготовка к экзамену, деловой язык или просто разговорная практика - 
            у нас есть специалисты для любых задач.
          </p>
        </Col>
        <Col md={6}>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
              alt="Изучение языков" 
              className="img-fluid rounded"
            />
          </div>
        </Col>
      </Row>

      <Row className="features-section mb-5">
        <Col>
          <h2 className="text-center mb-5">Почему выбирают нас</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 feature-card">
                <Card.Body>
                  <div className="feature-icon mb-3">
                    <i className="fas fa-search"></i>
                  </div>
                  <Card.Title>Удобный поиск</Card.Title>
                  <Card.Text>
                    Фильтры по языку, цене, рейтингу и специализации помогут найти 
                    идеального преподавателя за минуты
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 feature-card">
                <Card.Body>
                  <div className="feature-icon mb-3">
                    <i className="fas fa-chalkboard-teacher"></i>
                  </div>
                  <Card.Title>Квалифицированные преподаватели</Card.Title>
                  <Card.Text>
                    Все преподаватели проходят проверку квалификации и опыта перед 
                    добавлением на платформу
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 feature-card">
                <Card.Body>
                  <div className="feature-icon mb-3">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <Card.Title>Гибкое расписание</Card.Title>
                  <Card.Text>
                    Занимайтесь когда удобно - утром, днем или вечером, 
                    в будни или выходные
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="stats-section py-4 mb-5">
        <Col className="text-center">
          <h2 className="mb-4">Мы в цифрах</h2>
          <Row>
            <Col md={3} className="mb-3">
              <div className="stat-number">500+</div>
              <div className="stat-label">преподавателей</div>
            </Col>
            <Col md={3} className="mb-3">
              <div className="stat-number">15+</div>
              <div className="stat-label">языков</div>
            </Col>
            <Col md={3} className="mb-3">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">уроков ежемесячно</div>
            </Col>
            <Col md={3} className="mb-3">
              <div className="stat-number">98%</div>
              <div className="stat-label">довольных студентов</div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="team-section mb-5">
        <Col>
          <h2 className="text-center mb-5">Наша команда</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="team-member">
                <Card.Img variant="top" src="https://randomuser.me/api/portraits/women/44.jpg" />
                <Card.Body>
                  <Card.Title>Анна Иванова</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Основатель</Card.Subtitle>
                  <Card.Text>
                    Лингвист с 10-летним опытом преподавания и создания языковых программ
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-member">
                <Card.Img variant="top" src="https://randomuser.me/api/portraits/men/32.jpg" />
                <Card.Body>
                  <Card.Title>Петр Сидоров</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Технический директор</Card.Subtitle>
                  <Card.Text>
                    Отвечает за разработку и удобство платформы
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-member">
                <Card.Img variant="top" src="https://randomuser.me/api/portraits/women/68.jpg" />
                <Card.Body>
                  <Card.Title>Мария Петрова</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Директор по подбору преподавателей</Card.Subtitle>
                  <Card.Text>
                    Обеспечивает высокие стандарты квалификации наших преподавателей
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="cta-section py-5">
        <Col className="text-center">
          <h2 className="mb-4">Готовы начать изучение языка?</h2>
          <Link to={'/'}>main</Link>
          <Link className="btn btn-primary btn-lg mr-3">Найти преподавателя</Link>
          <Link className="btn btn-outline-primary btn-lg">Стать преподавателем</Link>
        </Col>
      </Row>
    </Container>
  

</>

  )
}

export default About
