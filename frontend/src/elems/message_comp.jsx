import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import DOMPurify from 'dompurify';
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

function Message_comp({ int, id, click, delet, sender, me, readed, photo, if_teach, changed, hour, minute, arrLangMessage, lang}) {

   // const [localText] = useState(int);
    const [position, setPosition] = useState({ y: 0 });
    const [visibleId, setVisibleId] = useState(null); // Состояние для хранения id видимого элемента
    const [text, setText] = useState(null);
  // Функция для переключения видимости элемента

  useEffect(() => {
      
    const convertLinksToAnchors = (text) => {
      const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    return text.replace(urlRegex, function(url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    }

    setText(convertLinksToAnchors(int));

  }, [int]);

  const toggleVisibility = (e, id) => {
    setVisibleId(prevId => prevId === id ? null : id);
    setPosition({ y: e.clientY });
    //console.log(e.clientY);
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
            <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1000, backgroundColor: "#00000030", backdropFilter: "blur(3px)"}} onClick={unToggleVisibility}/>
            <div
              style={{
                top: `${position.y}px`, // Центрирует элемент относительно клика
              }}
              className='the_main_position_of_the_delete_edit_panel'
            >
          <div className={`message_comp_delete_panel sett${id}`} id={`sett${id}`}>
                                            <div className='message_comp_delete_panel_div'>
                                                <button className='message_comp_delete_panel_div_delete' onClick={() => DELunToggleVisibility(id)}>
                                                  {arrLangMessage[lang]['delete']}
                                                </button>
                                                <button className='message_comp_delete_panel_div_edit' onClick={() => EDunToggleVisibility(id)}>
                                                  {arrLangMessage[lang]['edit']}
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
                    <div className='message_comp_my_message_inside_pre' onClick={(e) => toggleVisibility(e, id)}>
                      <div dangerouslySetInnerHTML={{ __html: text }}></div>
                      <div>
                        {changed === true ? <span className='message_comp_my_message_inside_chan'>{arrLangMessage[lang]['ed']}</span> : null}
                        <span className='message_comp_my_message_inside_readed'>{hour}:{minute}</span>
                      </div>

                    </div>
                  </div>
                {readed === false ?
                  <div className='message_readed_container'>
                    <div className='message_readed_centering'>
                      <div className='message_readed_circle'></div>
                    </div>
                  </div> : null}
                  
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
                    <div className='message_comp_not_my_message_inside_pre' /*onClick={() => toggleVisibility(id)}*/>
                      <div dangerouslySetInnerHTML={{ __html: text }}></div>
                      
                      <div>
                        <span className='message_comp_my_message_inside_readed'>{hour}:{minute}</span>
                        {changed === true ? <span className='message_comp_my_message_inside_chan'>{arrLangMessage[lang]['ed']}</span> : null}
                      </div>
                      

                    </div>
                    </div>
            </div>
          </>);
                
            }
      })()}

        </>
    )
}

export default Message_comp