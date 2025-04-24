import { useState, useEffect, state, handleChange, handleSubmit, setStat, useRef }  from 'react'
import React from 'react'
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function Call() {


 function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


  if (getCookie('theme') === "dark"){
    if (document.querySelector('body') != null)
        document.querySelector('body').className = "dark_theme";
  }
  else{
    if (document.querySelector('body') != null)
        document.querySelector('body').className = "light_theme";
  }

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const wsRef = useRef(null);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [components, setComponents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectCam, setSelectCam] = useState(false);
  const [listOfDevices, setListOfDevices] = useState([]);
  const [showPupils, setShowPupils] = useState(true);
  const [sound, setSound] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  const chanShowUsers = () => {
    setShowUsers(!showUsers);
  }

  const chanSound = () => {
    setSound(!sound);
  }

  const funShowPup = () => {
    setShowPupils(!showPupils);
  }

  useEffect(() => {
    const initWebSocket = () => {
      wsRef.current = new WebSocket(`${WSAPIURL}/ws/videochat/1/`);

      wsRef.current.onopen = () => {
          console.log('WebSocket connected');
      }

      wsRef.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'new_offer') {
          console.log(data);
          const newComponent = {
              first_name: data.first_name,
              last_name: data.last_name,
              photo: data.photo,
              type: data.type,
              offer: data.offer,
          };
          setComponents((components) => [...components, newComponent]);
          //await handleOffer(data.offer);
        } else if (data.type === 'new_answer') {
          await handleAnswer(data.answer);
        } else if (data.type === 'new_ice_candidate') {
          await handleNewICECandidate(data.candidate);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
      };
    };

    const initPeerConnection = () => {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          // Добавьте свои TURN серверы при необходимости
        ]
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          wsRef.current.send(JSON.stringify({
            type: 'new_ice_candidate',
            candidate: event.candidate
          }));
        }
      };

      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          setRemoteStream(event.streams[0]);
        }
      };

      pcRef.current = pc;
    };

    function getConnectedDevices(type) {
      navigator.mediaDevices.enumerateDevices()
          .then(devices => {
              const filtered = devices.filter(device => device.kind === type);
              if (filtered.length === 1){
                getMedia();
              }
              else{
                let arr = [];
                for (let i = 0; i < filtered.length; i++){
                  console.log(filtered[i]);
                  arr.unshift(filtered[i]);
                }
                setListOfDevices(arr);
                setSelectCam(true);
              }
          });
  }
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        console.log(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStream(stream);

          stream.getTracks().forEach(track => {
            pcRef.current.addTrack(track, stream);
          });
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        console.log(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStream(stream);

          stream.getTracks().forEach(track => {
            pcRef.current.addTrack(track, stream);
          });
        }
      }
      createOffer();setSelectCam(false);
    };

    /*
    const getDisplay = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        console.log(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStream(stream);

          stream.getTracks().forEach(track => {
            pcRef.current.addTrack(track, stream);
          });
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };
*/
    initWebSocket();
    initPeerConnection();
    getConnectedDevices('videoinput')

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const createOffer = async () => {
    try {
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      wsRef.current.send(JSON.stringify({
        type: 'new_offer',
        offer: offer
      }));

      setIsCallStarted(true);
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const handleOffer = async (e, offer, first_name, last_name, photo) => {
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);

      wsRef.current.send(JSON.stringify({
        type: 'new_answer',
        answer: answer
      }));
      e.target.parentElement.remove()
      const newComponent = {
        name: first_name,
        prez: last_name,
        pho: photo, 
      };
      setUsers((users) => [...users, newComponent]);
      setIsCallStarted(true);
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleNewICECandidate = async (candidate) => {
    try {
      await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  };

  const endCall = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      });
    }
    setIsCallStarted(false);
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: '100vw',
          height: '100vh'
        },
        audio: true
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);

        stream.getTracks().forEach(track => {
          pcRef.current.addTrack(track, stream);
        });
      }setSelectCam(false);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);

        stream.getTracks().forEach(track => {
          pcRef.current.addTrack(track, stream);
        });
      }
    }setSelectCam(false);
  };

    
    const getExactMedia = async (i) => {
      try {
        console.log(navigator.mediaDevices);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: i },
            width: '100vw',
            height: '100vh'
          },
          audio: true
        });
        console.log(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStream(stream);

          stream.getTracks().forEach(track => {
            pcRef.current.addTrack(track, stream);
          });
        }
        createOffer();
        setSelectCam(false);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        console.log(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStream(stream);

          stream.getTracks().forEach(track => {
            pcRef.current.addTrack(track, stream);
          });
        }
        createOffer();
        setSelectCam(false);
      }

    };

    
    const getScreenMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        console.log(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStream(stream);

          stream.getTracks().forEach(track => {
            pcRef.current.addTrack(track, stream);
          });
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        
      }
      
    };

    function getConnectedDevices(type) {
      navigator.mediaDevices.enumerateDevices()
          .then(devices => {
              const filtered = devices.filter(device => device.kind === type);
              if (filtered.length === 1){
                getMedia();
              }
              else{
                let arr = [];
                for (let i = 0; i < filtered.length; i++){
                  console.log(filtered[i]);
                  arr.unshift(filtered[i]);
                }
                setListOfDevices(arr);
                setSelectCam(true);
              }
          });
  }
  
  //getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras));
  useEffect(() => {
    console.log(users);
  }, [users])

    return (
        <>
        <div style={{position: "absolute"}}>
          {components.map((component) => ( 
            <>
            <div style={{position: "relative", zIndex: 1, width: 300, height: 80, backgroundColor: "gray"}}>
              {component.first_name} {component.last_name} wants to join room
              <button style={{ backgroundColor: "red", borderRadius: "50%"}} onClick={(e) => handleOffer(e, component.offer, component.first_name, component.last_name, component.photo)}>
                
                <img src="/src/static/img/desline.png" alt="" style={{ width: 40, height: 40,  }}/>
              </button>
            </div>
            </>
          ))}
        </div>
          
        <div style={{ position: 'absolute', left: 0, top: 0, width: "10%", backgroundColor: "gray"}}>
            
            {/*<button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={() => getConnectedDevices('videoinput')}>
                <div>camera</div>
            </button>

            <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={chanShowUsers}>
                <div>screen</div>
            </button>*/}

            <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={funShowPup}>
                <img src="/src/static/img/desline.png" alt="endcall" style={{ width: 40, height: 40,  }}/>
            </button>

            <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={chanShowUsers}>
                <div>show list of users</div>
            </button>
        </div>
        <video style={{ width:"80%", height:"80%", position: "relative", backgroundColor: "black", zIndex: 0, transform: "scale(-1, 1)", marginRight: "auto", marginLeft: "auto", display: "block"}} ref={remoteVideoRef} autoPlay playsInline id="mainVideo"></video>
        {showPupils && <video style={{ width: "20%", height:"20%", position: "absolute", bottom: 0, right: 0, backgroundColor: "gray", zIndex: 1, transform: "scale(-1, 1)"}} ref={localVideoRef} autoPlay playsInline id="myVideo"></video>}
        <div style={{ position: 'absolute', right: 0, top: 0, width: "10%", backgroundColor: "gray"}}>
                        
            <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={() => getConnectedDevices('videoinput')}>
                <div>camera</div>
            </button>

            <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={getScreenMedia}>
                <div>screen</div>
            </button>

            <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={endCall}>
                <img src="/src/static/img/desline.png" alt="endcall" style={{ width: 40, height: 40,  }}/>
            </button>
               
            {sound && <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={chanSound}>
                <div>sound on</div>
            </button>}

            {!sound && <button style={{ backgroundColor: "red", borderRadius: "50%", display: 'block', marginBottom: "10%"}} onClick={chanSound}>
                <div>sound off</div>
            </button>}
        </div>
            
        {selectCam && 
        <>
        <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,  opacity: 0.5, zIndex: 1000, backgroundColor: "black"}}/>
        <div style={{position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0, zIndex: 1001}}>
          <div style={{width: 600, height: 400, backgroundColor: '#272727', display: "block", position: "relative", margin: "auto", zIndex: 1, marginTop: 'calc(50vh - 200px)', borderRadius: 20, border: "2px solid gray", padding: 20}}>
            <div style={{height: 60, textAlign: 'center', fontSize: 40}}>
                choose camera
            </div>
            <div style={{height: "calc(100% - 70px)", padding: 5, borderRadius: 10, backgroundColor: "#404040"}}>
              {listOfDevices.map((component) => ( 
                <>
                  <div style={{width: 150, height: 200, backgroundColor: "rgb(32 32 32)", color: 'white', borderRadius: 10, cursor: "pointer"}} onClick={() => getExactMedia(component.deviceId)} key={component.deviceId}>
                    <img src="/src/static/img/camera.png" alt="camera" style={{display: "inline", width: '100%', height: 'auto', borderTopLeftRadius: 10, borderTopRightRadius:10}}/>
                    <p style={{textAlign: "center", overflowWrap: 'anywhere', whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis',}}>{component.label}</p>
                  </div>
                </>
                ))}
            </div>
            
            
          </div>
        </div>
        
        </>}
        
        {showUsers &&
          <>
          <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,  opacity: 0.5, zIndex: 1000, backgroundColor: "black"}}/>
          <div style={{position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0, zIndex: 1001}}>
            <div style={{width: 300, height: 400, backgroundColor: '#272727', display: "block", position: "relative", zIndex: 1, borderRadius: 20, border: "2px solid gray", padding: 20}}>
            <button style={{height: 50, backgroundColor: 'transparent', display: "inline-block",}} onClick={chanShowUsers}>
              <img src="/src/static/img/gobackblack.png" alt="goback" className='message_goback_img' style={{marginTop: 0}}/>
            </button>
              <div style={{height: 60, textAlign: 'center', fontSize: 30, width: "calc(100% - 110px)", display: 'inline-block', position: "absolute"}}>
                
                <p>users</p>
              </div>
              <div style={{height: "calc(100% - 70px)", padding: 5, borderRadius: 10, backgroundColor: "#404040"}}>
                {users.map((component) => ( 
                  <>
                    <div style={{width: '100%', height: 80, backgroundColor: "rgb(32 32 32)", color: 'white', borderRadius: 10, cursor: "pointer", marginBottom: 5}} >
                      <img src={component.pho} alt="avatar" style={{display: "inline", width: 'auto', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                      <p style={{textAlign: "center", overflowWrap: 'anywhere', whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', display: "inline-block", position: "absolute", padding: 10}}>{component.name} {component.prez}</p>
                    </div>
                  </>
                  ))}
              </div>
              
              
            </div>
          </div>
          </>
        }

        </>

  )
}

export default Call