import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';

function ImageWithFallback({ src, fallbackSrc, alt, }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className='message_comp_img_of_sender'
    />
  );
}

function Message_comp({ int, id, click, delet, sender, me, readed, photo, if_teach, changed, hour, minute }) {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');

    const [confirm, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ y: 0 });
    const [visibleId, setVisibleId] = useState(null); // Состояние для хранения id видимого элемента



  // Функция для переключения видимости элемента
  const toggleVisibility = (e, id) => {
    setVisibleId(prevId => prevId === id ? null : id);
    setPosition({ y: e.clientY });
    console.log(e.clientY);
  };
  const unToggleVisibility = () =>{
    setVisibleId(null);
  }
  const DELunToggleVisibility = (id) =>{
    delet(id);
    setVisibleId(null);
  }
  const EDunToggleVisibility = (id) =>{
    click(id)
    setVisibleId(null);
  }
//console.log(if_teach);

    return (
      
            <>
            { visibleId != null && 
            <>
            <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,  opacity: 0.5, zIndex: 1000, backgroundColor: "black"}} onClick={unToggleVisibility}/>
            <div
          style={{
            position: 'fixed',
            left: `60vw`,
            top: `${position.y}px`,
            width: '50px',
            height: '50px',
            zIndex: 10000,
            transform: "scale(-1, 1)", // Центрирует элемент относительно клика
          }}
        >
          <div className={`message_comp_delete_panel sett${id}`} id={`sett${id}`}>
                                            <div className='message_comp_delete_panel_div'>
                                                <button className='message_comp_delete_panel_div_delete' onClick={() => DELunToggleVisibility(id)}>
                                                    Delete
                                                </button>
                                                <button className='message_comp_delete_panel_div_edit' onClick={() => EDunToggleVisibility(id)}>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
        </div>
        </>}
{(() => {
        if (sender === me) {
          return (<>
              <div className='message_comp_my_message' id={`mess${id}`} >
                  <div className='message_comp_my_message_div'>
                    <pre className='message_comp_my_message_inside_pre' onClick={(e) => toggleVisibility(e, id)}>
                      {int}
                      <div>
                        {(() => {
                          if (changed === true) {
                              return <span className='message_comp_my_message_inside_chan'>chan.</span>;
                          } else {
                              return <span className='message_comp_my_message_inside_not_chan'></span>;
                          }
                        })()}
                        <span className='message_comp_my_message_inside_readed'>{hour}:{minute}</span>
                        
                        {(() => {
                          if (readed === true) {
                              return <span className='message_comp_my_message_inside_readed'> ✓✓</span>;
                          } else{
                              return <span className='message_comp_my_message_inside_readed'> ✓</span>;
                          }
                        })()}
                      </div>

                    </pre>
                  </div>
                  
                  {/*visibleId === id && <div className={`message_comp_delete_panel sett${id}`} id={`sett${id}`}>
                                            <div className='message_comp_delete_panel_div'>
                                                <button className='message_comp_delete_panel_div_delete' onClick={() => delet(id)}>
                                                    Delete
                                                </button>
                                                <button className='message_comp_delete_panel_div_edit' onClick={() => click(id)}>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                  */}
              </div>
          
              </>);
        }else{
          return (<>
              <div className='message_comp_not_my_message' id={`mess${id}`} >
                  {if_teach === true ?
                    (
                      <Link to={`/t/user/${sender}/`} className='message_comp_link_to_sender'>
                          <ImageWithFallback src={photo} alt={sender} fallbackSrc="/src/static/img/nema.png"/>
                      </Link>
                    )
                    :
                    (
                      <Link to={`/p/user/${sender}/`} className='message_comp_link_to_sender'>
                          <ImageWithFallback src={photo} alt={sender} fallbackSrc="/src/static/img/nema.png"/>
                      </Link>
                    )
                  
                  }
                    
                  <div className='message_comp_my_message_div'>
                    <pre className='message_comp_not_my_message_inside_pre' onClick={() => toggleVisibility(id)}>
                      {int}
                      
                      <div>
                        {(() => {
                          if (readed === true) {
                              return <span className='message_comp_my_message_inside_readed'>✓✓ </span>;
                          } else{
                              return <span className='message_comp_my_message_inside_readed'>✓ </span>;
                          }
                        })()}
                        <span className='message_comp_my_message_inside_readed'>{hour}:{minute}</span>
                        
                        {(() => {
                          if (changed === true) {
                              return <span className='message_comp_my_message_inside_chan'>chan.</span>;
                          } else {
                              return <span className='message_comp_my_message_inside_not_chan'></span>;
                          }
                        })()}
                      </div>
                      

                    </pre>
                    </div>
            </div>
          </>);
                
            }
      })()}

        </>
    )
}

export default Message_comp