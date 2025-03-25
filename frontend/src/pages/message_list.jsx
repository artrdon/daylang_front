import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Message from '/src/pages/message.jsx'
import Message_list_load from '/src/load_elems/messlistload.jsx'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import axios from 'axios';

function Message_list() {

  const [groups, setGroup] = useState([0]);
  const [ws, setWs] = useState(null);

useEffect(() => {

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/some_path/${groups.join(',')}/`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        console.log(data);
        if (data.tip === "delete"){
            document.getElementById(`chatnum${data.chat_id}`).children[0].children[0].children[0].children[2].textContent = data.last_mess;
            console.log(data);
            return;
        }

        if (data.tip === "change"){
         //   document.getElementById(`mess${data.id}`).children[0].children[0].firstChild.textContent = data.text;
            document.getElementById(`chatnum${data.chat_id}`).children[0].children[0].children[0].children[2].textContent = data.last_mess;
            console.log(data);
            return;
        }
        /*setMessage(data.message);
        const newComponent = {
            id: data.id,
            text: data.message,
            sender: data.sender, // Уникальный идентификатор
        };
        setComponents((components) => [...components, newComponent]);*/
        if (data.tip === "send"){
            document.getElementById(`chatnum${data.chat_id}`).children[0].children[0].children[0].children[2].textContent = data.message;

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
    setIsVisible(!confirm); // Меняем состояние на противоположное
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

    langua = lang;

const delete_chat = async (e, idd,) => {

            e.preventDefault();

        try {
            const response = await axios.post(`http://127.0.0.1:8000/delete_chat/${idd}/`, {},  {
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
        confirming();
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/userinfo/');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getchatlist/');
        if (response.data != null){
            for (let i = 0; i < response.data[0].length; i++){
                console.log(response.data[0][i].id);
                setGroup((groups) => [...groups, response.data[0][i].id]);
            }
        }
        setData1(response.data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return ( <> <AppLoad lang={langua}/>
                            <Message_list_load/>
                        </> );
  if (error) return <p>Error: {error}</p>;

  if (loading1) return ( <> <AppLoad lang={langua}/>
                            <Message_list_load/>
                        </> );
  if (error1) return <p>Error: {error}</p>;

console.log(data1);

    return (
        <>
        <App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={data1[1]} photo={data.photo} balance={data.balance}/>

<div className="message_list_find_panel">
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div className="panel_of_messs">
      <div style={{ height: "100%", overflow: "auto" }}>

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
                    {data1[0].map((da) => (

                        (() => {
                            if (da.me === true) {
                              return (<>
                                  <div key={da.id} id={`chatnum${da.id}`} style={{maxHeight: 92}}>
                        <Link to={`/message_list/${da.id}/`}>
                          <div className="panel_of_one_mes">
                            <div className="place_of_autor_mes">
                              <img src={da.photo} alt="pupil" className="img_of_autor_mes"/>
                              <div style={{position: "relative", bottom: 50, left: 10, display: "inline-block", maxWidth: "90%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>
                                <span className="ime" translate="no" style={{position: "relative", top: 0, fontSize: 20, marginRight: 5}}>
                                  {da.ime} {da.prezime}
                                </span>
                              </div>
                              <div className="last_message">{da.last_mess}</div>
                            </div>
                          </div>

                        </Link>
                        <button style={{ backgroundColor: "#3d3d3d", zIndex: 100, position: "relative", left: "calc(100% - 50px)", borderRadius: "50%", top: -80, border: "1px solid black"}} onClick={() => toggleVisibility(da.id)}>
                            <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center"}}>
                                <div style={{ width: 7, height: 7,  backgroundColor: "#afafaf", position: "absolute", borderRadius: "50%", top: 7}}></div>
                                <div style={{ width: 7, height: 7,  backgroundColor: "#afafaf", position: "absolute", borderRadius: "50%", top: 17}}></div>
                                <div style={{ width: 7, height: 7,  backgroundColor: "#afafaf", position: "absolute", borderRadius: "50%", top: 27}}></div>
                            </div>

                        </button>
                        {(() => {
                            if (da.unreaded_mess != 0) {
                              return (<>
                                  <button style={{ backgroundColor: "black", zIndex: 100, position: "relative", left: "calc(100% - 150px)", borderRadius: "50%", top: -95, border: "1px solid black"}}>
                                        <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", color: "white"}}>
                                            <span>{da.unreaded_mess}</span>
                                        </div>
                                  </button>
                                  </>);
                            }
                          })()}

                           {visibleId === da.id && <div style={{ zIndex: 101, position: "absolute", right: -50 }} className={`sett${da.id}`}>
                                <div style={{ width: 100, height: "auto", backgroundColor: "#2e2e2e", zIndex: 101, position: "relative", top: -124, borderRadius: 20, }}>
                                    <button style={{ width: "100%", height: 50, backgroundColor: "#00000000", color: "white", border: "1px solid black", borderTopRightRadius: 20, borderTopLeftRadius: 20,}} onClick={confirming}>
                                        Delete
                                    </button>
                                    <button style={{ width: "100%", height: 50, backgroundColor: "#00000000", color: "white", border: "1px solid black", borderBottomRightRadius: 20, borderBottomLeftRadius: 20, }} onClick={() => toggleVisibility(da.id)}>
                                        Quit
                                    </button>
                                </div>
                            </div>}
                        </div>
                                  </>);
                            } else{
                                return (<>
                                  <div key={da.id} id={`chatnum${da.id}`} style={{maxHeight: 92}}>
                            <Link to={`/message_list/${da.id}/`}>
                              <div className="panel_of_one_mes">
                                <div className="place_of_autor_mes">
                                  <img src={da.photo} alt="pupil" className="img_of_autor_mes"/>
                                  <div style={{position: "relative", bottom: 50, left: 10, display: "inline-block", maxWidth: "90%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>
                                    <span className="ime" translate="no" style={{position: "relative", top: 0, fontSize: 20, marginRight: 5}}>
                                      {da.name}
                                    </span>
                                  </div>
                                  <div className="last_message">{da.last_mess}</div>
                                </div>
                              </div>

                            </Link>
                            <button style={{ backgroundColor: "#3d3d3d", zIndex: 100, position: "relative", left: "calc(100% - 50px)", borderRadius: "50%", top: -80, border: "1px solid black"}} onClick={() => toggleVisibility(da.id)}>
                                <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center"}}>
                                    <div style={{ width: 7, height: 7,  backgroundColor: "#afafaf", position: "absolute", borderRadius: "50%", top: 7}}></div>
                                    <div style={{ width: 7, height: 7,  backgroundColor: "#afafaf", position: "absolute", borderRadius: "50%", top: 17}}></div>
                                    <div style={{ width: 7, height: 7,  backgroundColor: "#afafaf", position: "absolute", borderRadius: "50%", top: 27}}></div>
                                </div>

                            </button>
                            {(() => {
                                if (da.unreaded_mess != 0) {
                                  return (<>
                                      <button style={{ backgroundColor: "black", zIndex: 100, position: "relative", left: "calc(100% - 150px)", borderRadius: "50%", top: -95, border: "1px solid black"}}>
                                            <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", color: "white"}}>
                                                <span>{da.unreaded_mess}</span>
                                            </div>
                                      </button>
                                      </>);
                                }
                              })()}

                               {visibleId === da.id && <div style={{ zIndex: 101, position: "absolute", right: -50 }} className={`sett${da.id}`}>
                                    <div style={{ width: 100, height: "auto", backgroundColor: "#2e2e2e", zIndex: 101, position: "relative", top: -124, borderRadius: 20, }}>
                                        <button style={{ width: "100%", height: 50, backgroundColor: "#00000000", color: "white", border: "1px solid black", borderTopRightRadius: 20, borderTopLeftRadius: 20,}} onClick={confirming}>
                                            Delete
                                        </button>
                                        <button style={{ width: "100%", height: 50, backgroundColor: "#00000000", color: "white", border: "1px solid black", borderBottomRightRadius: 20, borderBottomLeftRadius: 20, }} onClick={() => toggleVisibility(da.id)}>
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

{confirm && <div style={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
    <img src="/src/static/img/creep.png" alt="" style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,  opacity: 0.5, zIndex: 1000}} />
    <div style={{ width: 600, height: "auto", backgroundColor: "#2e2e2e", position: "relative", top: -124, borderRadius: 20,  zIndex: 1001}}>
        <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "#004aff", height: "70px", alignItems: "center", borderTopRightRadius: 5,  borderTopLeftRadius: 5}}>
            <h3 id="form-title">Are you serious want to delete the chat</h3>
        </div>
        <div style={{ width: "100%", height: "70px"}}>
            <button style={{ width: "50%", height: "100%" }}  onClick={(e) => delete_chat(e, visibleId)}>YES</button>
            <button style={{ width: "50%", height: "100%" }} onClick={confirming}>NO</button>
        </div>
    </div>
</div>}

</>

  )
}

export default Message_list
