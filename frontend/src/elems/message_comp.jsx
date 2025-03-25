import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';

function Message_comp({ int, id, click, delet, sender, me, readed, photo, if_teach }) {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');

const [visibleId, setVisibleId] = useState(null); // Состояние для хранения id видимого элемента
const [confirm, setIsVisible] = useState(false);


  // Функция для переключения видимости элемента
  const toggleVisibility = (idd) => {
    if (visibleId === idd) {
      setVisibleId(null); // Если элемент уже видим, скрываем его
    } else {
      setVisibleId(idd); // Иначе показываем элемент с этим id
    }
  };
console.log(if_teach);

    return (
            <>
{(() => {
        if (sender === me) {
          return (<>
              <div style={{marginTop: 40, marginBottom: 20, position: "relative", display: "block", transform: "scale(-1, 1)"   }} id={`mess${id}`}>
                  <div style={{ maxWidth: "50%", position: "relative", left: 70, top: "-20px", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <pre style={{ fontSize: 18,position: "relative", padding: 10, backgroundColor: "rgb(76 88 167)", color: "white", display: "inline-block", whiteSpace: "pre-wrap", overflowWrap: "anywhere", borderRadius: 10, left: -50,MozUserSelect: "none", KhtmlUserSelect: "none", WebkitUserSelect: "none", userSelect: "none", cursor: "pointer", transform: "scale(-1, 1)"}}  onClick={() => toggleVisibility(id)}>
                      {int}
                       {(() => {
                        if (readed === true) {
                            return <div><span style={{ fontSize: 12 }}>\\</span><span style={{ fontSize: 12 }}>14:35</span><span style={{ fontSize: 12, }}>chan.</span></div>;
                        } else{
                            return <div><span style={{ fontSize: 12 }}>\</span><span style={{ fontSize: 12 }}>14:35</span><span style={{ fontSize: 12, }}>chan.</span></div>;
                        }
                      })()}

                    </pre>
                    </div>
                {visibleId === id && <div style={{ zIndex: 101, position: "absolute", right: 0, transform: "scale(-1, 1)" }} className={`sett${id}`}>
                                            <div style={{ width: 100, height: "auto", backgroundColor: "#2e2e2e", zIndex: 101, position: "relative", top: -124, borderRadius: 20, }}>
                                                <button style={{ width: "100%", height: 50, backgroundColor: "#00000000", color: "white", border: "1px solid black", borderTopRightRadius: 20, borderTopLeftRadius: 20,}} onClick={() => delet(id)}>
                                                    Delete
                                                </button>
                                                <button style={{ width: "100%", height: 50, backgroundColor: "#00000000", color: "white", border: "1px solid black", borderBottomRightRadius: 20, borderBottomLeftRadius: 20, }} onClick={() => click(id)}>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
           }
          </div>
              </>);
        }else{
            if (if_teach) {
                return (<>
                <div style={{marginTop: 40, marginBottom: 20, position: "relative", display: "block"}} id={`mess${id}`}>
                    <Link to={`/t/user/${sender}/`} style={{ display: "block", width: 50, height: 50, position: "absolute" }}>
                        <img src={photo} style={{ height: 50, width: 50, borderRadius: 30, position: "absolute", bottom: 0, }} />
                    </Link>
                  <div style={{ maxWidth: "50%", position: "relative", left: 70, top: "-20px", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <pre style={{ fontSize: 18,position: "relative", padding: 10, backgroundColor: "rgb(120 120 120)", color: "white", display: "inline-block", whiteSpace: "pre-wrap", overflowWrap: "anywhere", borderRadius: 10, left: -10,MozUserSelect: "none", KhtmlUserSelect: "none", WebkitUserSelect: "none", userSelect: "none", cursor: "pointer"}}  onClick={() => toggleVisibility(id)}>
                      {int}
                       {(() => {
                        if (readed === true) {
                            return <div><span style={{ fontSize: 12 }}>\\</span><span style={{ fontSize: 12 }}>14:35</span><span style={{ fontSize: 12, }}>chan.</span></div>;
                        } else{
                            return <div><span style={{ fontSize: 12 }}>\</span><span style={{ fontSize: 12 }}>14:35</span><span style={{ fontSize: 12, }}>chan.</span></div>;
                        }
                      })()}

                    </pre>
                    </div>
            </div>
                </>);
            } else{
                return (<>
                <div style={{marginTop: 40, marginBottom: 20, position: "relative", display: "block"}} id={`mess${id}`}>
                    <Link to={`/p/user/${sender}/`} style={{ display: "block", width: 50, height: 50, position: "absolute" }}>
                        <img src={photo} style={{ height: 50, width: 50, borderRadius: 30, position: "absolute", bottom: 0, }} />
                    </Link>
                  <div style={{ maxWidth: "50%", position: "relative", left: 70, top: "-20px", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <pre style={{ fontSize: 18,position: "relative", padding: 10, backgroundColor: "rgb(120 120 120)", color: "white", display: "inline-block", whiteSpace: "pre-wrap", overflowWrap: "anywhere", borderRadius: 10, left: -10,MozUserSelect: "none", KhtmlUserSelect: "none", WebkitUserSelect: "none", userSelect: "none", cursor: "pointer"}}  onClick={() => toggleVisibility(id)}>
                      {int}
                       {(() => {
                        if (readed === true) {
                            return <div><span style={{ fontSize: 12 }}>\\</span><span style={{ fontSize: 12 }}>14:35</span><span style={{ fontSize: 12, }}>chan.</span></div>;
                        } else{
                            return <div><span style={{ fontSize: 12 }}>\</span><span style={{ fontSize: 12 }}>14:35</span><span style={{ fontSize: 12, }}>chan.</span></div>;
                        }
                      })()}

                    </pre>
                    </div>
            </div>
                </>);


            }




            }
      })()}

        </>
    )
}

export default Message_comp