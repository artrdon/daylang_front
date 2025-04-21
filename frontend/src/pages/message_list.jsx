import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import Message_list_load from '/src/load_elems/messlistload.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function Message_list() {

  const [groups, setGroup] = useState([]);
  const [ws, setWs] = useState(null);
  const [wsGroup, setWsGroup] = useState(null);
  const [messNumb, setMessNumb] = useState(null);

useEffect(() => {

    const socket = new WebSocket(`${WSAPIURL}/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const dataMess = JSON.parse(event.data);

        console.log(dataMess);
        if (dataMess.tip === "delete_chat"){
            document.getElementById(`chatnum${dataMess.id}`).remove();
            confirmingF();
            return;
        }
        if (dataMess.tip === "delete"){
            document.getElementById(`chatnum${dataMess.chat_id}`).children[0].children[0].children[0].children[2].textContent = dataMess.last_mess;
            console.log(dataMess.if_readed);
            let i_read = true;
            for (let i = 0; dataMess.if_readed.length > i; i++){
                console.log(dataMess.if_readed[i]);
                console.log(data.username);
                if (dataMess.if_readed[i] === data.username){
                  console.log("i_read");
                  i_read = false;
                }
            }
            if (i_read)
            {
              setMessNumb(prev => prev - 1);
              setComponents(prev => ({
                ...prev,
                [dataMess.chat_id]: prev[`${dataMess.chat_id}`] - 1
              })); 
            }
              
            return;
        }

        if (dataMess.tip === "change"){
            document.getElementById(`chatnum${dataMess.chat_id}`).children[0].children[0].children[0].children[2].textContent = dataMess.last_mess;
            return;
        }
        if (dataMess.tip === "send"){
            document.getElementById(`chatnum${dataMess.chat_id}`).children[0].children[0].children[0].children[2].textContent = dataMess.message;
            document.getElementById(`parent_of_messages`).prepend(document.getElementById(`chatnum${dataMess.chat_id}`));
            setMessNumb(prev => prev + 1);
            setComponents(prev => ({
              ...prev,
              [dataMess.chat_id]: prev[`${dataMess.chat_id}`] + 1
            }));            
            return;
        }

         //   document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [groups]);

const [visibleId, setVisibleId] = useState(null); // Состояние для хранения id видимого элемента
const [confirm, setIsVisible] = useState(false);

  // Функция, которая будет вызываться при нажатии на кнопку
  const confirming = () => {
    setIsVisible(true);
  };

  const confirmingF = () => {
    setIsVisible(false);
  };

  // Функция для переключения видимости элемента
  const toggleVisibility = (id) => {
    if (visibleId === id) {
      setVisibleId(null); // Если элемент уже видим, скрываем его
    } else {
      setVisibleId(id); // Иначе показываем элемент с этим id
    }
  };

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


function change_theme() {
    if (document.querySelector('body').className === "dark_theme")
    {

        document.querySelector('body').className = "light_theme";
        document.cookie = "theme=light; path=/;max-age=31556926";
        document.getElementById('theme_img').setAttribute("src", `/src/static/img/sunce.png`);
    }
    else
    {
        document.querySelector('body').className = "dark_theme";
        document.cookie = "theme=dark; path=/;max-age=31556926";
        document.getElementById('theme_img').setAttribute("src", `/src/static/img/moon.png`);
    }
}


    const csrfToken = getCookie('csrftoken');

    const [count, setCount] = useState(0)

    document.querySelector("title").textContent = "Messages";

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [data1, setData1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [error1, setError1] = useState(null);

axios.defaults.withCredentials = true;


    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);
    const [componentGroup, setComponentGroup] = useState([]);

    langua = lang;

const delete_chat = async (e, idd,) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "delete_chat", id: idd }));
    //document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
  } else {
    console.error('WebSocket is not open');
  }
        /*e.preventDefault();

        try {
            const response = await axios.post(`${APIURL}/delete_chat/${idd}/`, {},  {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', response.data);


        } catch (error) {
            console.error('There was an error!', error.response.data);
        }
        document.getElementById(`chatnum${idd}`).remove();
        confirming();*/
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/userinfo/`);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [components, setComponents] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/getchatlist/`);
        if (response.data != null){
            for (let i = 0; i < response.data[0].length; i++){
                setGroup((groups) => [...groups, response.data[0][i].id]);
            }
        }
        setData1(response.data);
        setMessNumb(response.data[1]);
        const newComponent = {};
        for (let i = 0; i < response.data[0].length; i++){
          newComponent[response.data[0][i].id] = response.data[0][i].unreaded_mess;
        }
        setComponents(prev => ({ ...prev, ...newComponent }));
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    if (data === null){
        return;
    }
    const socket = new WebSocket(`${WSAPIURL}/ws/plus_group/${data.username}/`);

    socket.onopen = () => {
        console.log('WebSocket connectedG');
    };

    socket.onmessage = (event) => {
        const dataMess = JSON.parse(event.data);
        console.log(dataMess);
        if (dataMess['tip'] === "create_chat")
        {
          const newComponent = {
            name: dataMess['output']['name'],
            id: dataMess['output']['id'],
            me: dataMess['output']['me'],
            ime: dataMess['output']['ime'],
            prezime: dataMess['output']['prezime'],
            photo: dataMess['output']['photo'],
          };
          setComponentGroup((componentGroup) => [...componentGroup, newComponent]);
          setGroup((groups) => [...groups, dataMess['output']['id']]);
          setComponents(prev => ({
            ...prev,          // Копируем все существующие компоненты
            [dataMess['output']['id']]: 0 // Добавляем/обновляем один конкретный компонент
          }));
        }
        //   document.getElementById("mesfield").scrollTo(0, document.getElementById("mesfield").scrollHeight);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnectedG');
    };

    socket.onerror = (error) => {
      console.error('WebSocket errorG:', error);
    };

    setWsGroup(socket);

    return () => {
      socket.close();
    };
  }, [data]);



  if (loading) return ( <> <AppLoad lang={langua}/>
                            <Message_list_load/>
                        </> );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return ( <> <AppLoad lang={langua}/>
                            <Message_list_load/>
                        </> );
  if (error1) return <p>Error: {error1}</p>;


    return (
        <>
        <App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={messNumb} photo={data.photo} balance={data.balance}/>

<div className="message_list_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div className="panel_of_messs">
      <div style={{ height: "100%", overflow: "auto" }} id="parent_of_messages">

          {(() => {
        if (data1[0].length === 0) {
          return (<>
                      <NotFoundSave iwant={"messages"}/>
                </>)
        }
        else{
            if (data1 === "unauthenticated_ttt") {
              return (<>
                          <NotFoundSave iwant={"messages"}/>
                    </>)
            }
            else{
                return (<>
                  {componentGroup.map((component) => ( 
                    
                    (() => {
                      if (component.me === true) {
                        return (<>
                <div key={component.id} id={`chatnum${component.id}`} className='message_list_chat_num'>
                  <Link to={`/message_list/${component.id}/`}>
                    <div className="panel_of_one_mes">
                      <div className="place_of_autor_mes">
                        <img src={component.photo} alt="pupil" className="img_of_autor_mes"/>
                        <div className='message_list_name_of_group'>
                          <span className="ime message_list_span_of_mess" translate="no">
                            {component.ime} {component.prezime}
                          </span>
                        </div>
                        <div className="last_message">{component.last_mess}</div>
                      </div>
                    </div>

                  </Link>
                  <button className='message_list_chat_panel_more_button' onClick={() => toggleVisibility(component.id)}>
                      <div className='message_list_chat_panel_more_button_div_of_points'>
                          <div className='message_list_chat_panel_more_button_points_one'></div>
                          <div className='message_list_chat_panel_more_button_points_two'></div>
                          <div className='message_list_chat_panel_more_button_points_three'></div>
                      </div>

                  </button>
                      {components[`${component.id}`] > 0 && <button className='message_list_unreaded_messages'>
                            <div className='message_list_unreaded_messages_div'>
                                <span>{components[`${component.id}`]}</span>
                            </div>
                      </button>}

                     {visibleId === component.id && <div className={`message_list_chat_delete_panel sett${component.id}`}>
                          <div className='message_list_chat_delete_panel_div'>
                              <button className='message_list_chat_delete_panel_delete' onClick={confirming}>
                                  Delete
                              </button>
                              <button className='message_list_chat_delete_panel_quit' onClick={() => toggleVisibility(component.id)}>
                                  Quit
                              </button>
                          </div>
                      </div>}
                  </div>
                            </>);
                      } else{
                          return (<>
                            <div key={component.id} id={`chatnum${component.id}`} className='message_list_chat_num'>
                      <Link to={`/message_list/${component.id}/`}>
                        <div className="panel_of_one_mes">
                          <div className="place_of_autor_mes">
                            <img src={component.photo} alt="pupil" className="img_of_autor_mes"/>
                            <div className='message_list_name_of_group'>
                              <span className="ime message_list_span_of_mess" translate="no">
                                {component.name}
                              </span>
                            </div>
                            <div className="last_message">{component.last_mess}</div>
                          </div>
                        </div>

                      </Link>
                      <button className='message_list_chat_panel_more_button' onClick={() => toggleVisibility(component.id)}>
                          <div className='message_list_chat_panel_more_button_div_of_points'>
                              <div className='message_list_chat_panel_more_button_points_one'></div>
                              <div className='message_list_chat_panel_more_button_points_two'></div>
                              <div className='message_list_chat_panel_more_button_points_three'></div>
                          </div>

                      </button>
                      {components[`${component.id}`] > 0 && <button className='message_list_unreaded_messages'>
                            <div className='message_list_unreaded_messages_div'>
                                <span>{components[`${component.id}`]}</span>
                            </div>
                      </button>}

                         {visibleId === component.id && <div className={`message_list_chat_delete_panel sett${component.id}`}>
                              <div className='message_list_chat_delete_panel_div'>
                                  <button className='message_list_chat_delete_panel_delete' onClick={confirming}>
                                      Delete
                                  </button>
                                  <button className='message_list_chat_delete_panel_quit' onClick={() => toggleVisibility(component.id)}>
                                      Quit
                                  </button>
                              </div>
                          </div>}
                      </div>
                            </>);

                          }

                    })()

                    ))}
                    {data1[0].map((da) => (

                        (() => {
                            if (da.me === true) {
                              return (<>
                                  <div key={da.id} id={`chatnum${da.id}`} className='message_list_chat_num'>
                        <Link to={`/message_list/${da.id}/`}>
                          <div className="panel_of_one_mes">
                            <div className="place_of_autor_mes">
                              <img src={da.photo} alt="pupil" className="img_of_autor_mes"/>
                              <div className='message_list_name_of_group'>
                                <span className="ime message_list_span_of_mess" translate="no">
                                  {da.ime} {da.prezime}
                                </span>
                              </div>
                              <div className="last_message">{da.last_mess}</div>
                            </div>
                          </div>

                        </Link>
                        <button className='message_list_chat_panel_more_button' onClick={() => toggleVisibility(da.id)}>
                            <div className='message_list_chat_panel_more_button_div_of_points'>
                                <div className='message_list_chat_panel_more_button_points_one'></div>
                                <div className='message_list_chat_panel_more_button_points_two'></div>
                                <div className='message_list_chat_panel_more_button_points_three'></div>
                            </div>

                        </button>
                            {components[`${da.id}`] > 0 && <button className='message_list_unreaded_messages'>
                                  <div className='message_list_unreaded_messages_div'>
                                      <span>{components[`${da.id}`]}</span>
                                  </div>
                            </button>}

                           {visibleId === da.id && <div className={`message_list_chat_delete_panel sett${da.id}`}>
                                <div className='message_list_chat_delete_panel_div'>
                                    <button className='message_list_chat_delete_panel_delete' onClick={confirming}>
                                        Delete
                                    </button>
                                    <button className='message_list_chat_delete_panel_quit' onClick={() => toggleVisibility(da.id)}>
                                        Quit
                                    </button>
                                </div>
                            </div>}
                        </div>
                                  </>);
                            } else{
                                return (<>
                                  <div key={da.id} id={`chatnum${da.id}`} className='message_list_chat_num'>
                            <Link to={`/message_list/${da.id}/`}>
                              <div className="panel_of_one_mes">
                                <div className="place_of_autor_mes">
                                  <img src={da.photo} alt="pupil" className="img_of_autor_mes"/>
                                  <div className='message_list_name_of_group'>
                                    <span className="ime message_list_span_of_mess" translate="no">
                                      {da.name}
                                    </span>
                                  </div>
                                  <div className="last_message">{da.last_mess}</div>
                                </div>
                              </div>

                            </Link>
                            <button className='message_list_chat_panel_more_button' onClick={() => toggleVisibility(da.id)}>
                                <div className='message_list_chat_panel_more_button_div_of_points'>
                                    <div className='message_list_chat_panel_more_button_points_one'></div>
                                    <div className='message_list_chat_panel_more_button_points_two'></div>
                                    <div className='message_list_chat_panel_more_button_points_three'></div>
                                </div>

                            </button>
                            {components[`${da.id}`] > 0 && <button className='message_list_unreaded_messages'>
                                  <div className='message_list_unreaded_messages_div'>
                                      <span>{components[`${da.id}`]}</span>
                                  </div>
                            </button>}

                               {visibleId === da.id && <div className={`message_list_chat_delete_panel sett${da.id}`}>
                                    <div className='message_list_chat_delete_panel_div'>
                                        <button className='message_list_chat_delete_panel_delete' onClick={confirming}>
                                            Delete
                                        </button>
                                        <button className='message_list_chat_delete_panel_quit' onClick={() => toggleVisibility(da.id)}>
                                            Quit
                                        </button>
                                    </div>
                                </div>}
                            </div>
                                  </>);

                                }

                          })()



                        ))}
                    </>)
                }
        }
      })()}


      </div>
    </div>
  </div>
</div>

{confirm && <div className='message_list_delete_chat'>
    <img src="/src/static/img/creep.png" alt="areusure" className='message_list_delete_chat_dark'/>
    <div className='message_list_delete_chat_panel'>
        <div className='message_list_delete_chat_panel_up'>
            <h3 id="form-title">Are you serious want to delete the chat</h3>
        </div>
        <div className='message_list_delete_chat_panel_button_panel'>
            <button className='message_list_delete_chat_panel_button' onClick={(e) => delete_chat(e, visibleId)}>YES</button>
            <button className='message_list_delete_chat_panel_button' onClick={confirmingF}>NO</button>
        </div>
    </div>
</div>}

</>

  )
}

export default Message_list
