import { useState, useEffect, state, handleChange, handleSubmit, setStat, useRef }  from 'react'
import React from 'react'
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function Call() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const wsRef = useRef(null);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const initWebSocket = () => {
      wsRef.current = new WebSocket(`${WSAPIURL}/ws/videochat/1/`);

      wsRef.current.onopen = () => {
          console.log('WebSocket connected');
      }

      wsRef.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'new_offer') {
          const newComponent = {
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
      createOffer();
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
    getMedia();

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

  const handleOffer = async (offer) => {
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);

      wsRef.current.send(JSON.stringify({
        type: 'new_answer',
        answer: answer
      }));

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
    let a = 0;
    const change = () => {
        if (a === 0) {
            document.getElementById("mainVideo").style.width = "30%";
            document.getElementById("mainVideo").style.height = "30%";
            document.getElementById("mainVideo").style.bottom = 0;
            document.getElementById("mainVideo").style.right = 0;
            document.getElementById("mainVideo").style.zIndex = 1;


            document.getElementById("myVideo").style.width = "100%";
            document.getElementById("myVideo").style.height = "100%";
            document.getElementById("myVideo").style.bottom = 0;
            document.getElementById("myVideo").style.right = 0;
            document.getElementById("myVideo").style.zIndex = 0;
            a = 1;
            return 0;
        }

        if (a === 1) {
            document.getElementById("myVideo").style.width = "30%";
            document.getElementById("myVideo").style.height = "30%";
            document.getElementById("myVideo").style.bottom = 0;
            document.getElementById("myVideo").style.right = 0;
            document.getElementById("myVideo").style.zIndex = 1;


            document.getElementById("mainVideo").style.width = "100%";
            document.getElementById("mainVideo").style.height = "100%";
            document.getElementById("mainVideo").style.bottom = 0;
            document.getElementById("mainVideo").style.right = 0;
            document.getElementById("mainVideo").style.zIndex = 0;
            a = 0;
            return 0;
        }

//transition: transform .2s;
    }

    //createOffer();
    
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
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

    function getConnectedDevices(type, callback) {
      navigator.mediaDevices.enumerateDevices()
          .then(devices => {
              const filtered = devices.filter(device => device.kind === type);
              callback(filtered);
          });
  }
  
  getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras));

    return (
        <>
          {components.map((component) => ( 
            <>
            <div style={{position: "absolute", zIndex: 1}}>
              <button style={{ backgroundColor: "red", borderRadius: "50%", marginRight: 75, marginLeft: 75, }} onClick={() => handleOffer(component.offer)}>
                <img src="/src/static/img/desline.png" alt="" style={{ width: 40, height: 40,  }}/>
              </button>
            </div>
            </>
            ))}
        <video style={{ width:"100%", height:"100%", position: "absolute", bottom: 0, right: 0, backgroundColor: "black", zIndex: 0, transform: "scale(-1, 1)"}} ref={remoteVideoRef} autoPlay playsInline id="mainVideo"></video>
        <video style={{ width:"30%", height:"30%", position: "absolute", bottom: 0, right: 0, backgroundColor: "gray", zIndex: 1, transform: "scale(-1, 1)"}} ref={localVideoRef} autoPlay playsInline id="myVideo"></video>
        <button style={{ width:"30%", height:"30%", position: "absolute", bottom: 0, right: 0, zIndex: 5, backgroundColor: "#00000000"}} onClick={change}></button>
        <div className="parent_panel_call">

        </div>
        <div className="panel_call">
            {/*<button style={{ backgroundColor: "red", borderRadius: "50%", marginRight: 75, marginLeft: 75, }} onClick={createOffer}>
                <img src="/src/static/img/desline.png" alt="" style={{ width: 40, height: 40,  }}/>
            </button>*/}

            <button style={{ backgroundColor: "red", borderRadius: "50%"}} onClick={getMedia}>
                <img src="/src/static/img/desline.png" alt="" style={{ width: 40, height: 40,  }}/>
            </button>

            <button style={{ backgroundColor: "red", borderRadius: "50%"}} onClick={getScreenMedia}>
                <div>screen</div>
            </button>

            <button style={{ backgroundColor: "red", borderRadius: "50%", marginRight: 75, marginLeft: 75, }} onClick={endCall}>
                <img src="/src/static/img/desline.png" alt="" style={{ width: 40, height: 40,  }}/>
            </button>

        </div>
        </>

  )
}

export default Call