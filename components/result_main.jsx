import { useEffect, useRef } from 'react';

export default function ResultMain() {
    const peerConnectionRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        // webSocket
        const socket = new WebSocket(`${process.env.WEBSOCKET_URL}/ws/webrtc/`);

        socket.onopen = () => {
            console.log('WebSocket connection established');
            createOffer();
        };

        socket.onmessage = async(event) => {
            const data = JSON.parse(event.data);

            if(data.type === 'answer' && peerConnectionRef) {
              console.log("收到 answer，設定 remoteDescription"); //[3]
              await peerConnectionRef.current.setRemoteDescription({type: 'answer', sdp: data.sdp});
            }
      
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // RTCPeerConnection
        async function createOffer() {
        // 使用正確的 RTCConfiguration 傳遞給 RTCPeerConnection
        const configuration = {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:stun1.l.google.com:19302" },
              { urls: "stun:stun2.l.google.com:19302" },
              { urls: "stun:stun3.l.google.com:19302" },
              { urls: "stun:stun4.l.google.com:19302" }
            ]
          };
  
          // 將配置封裝後傳遞給 RTCPeerConnection
          const pc = new RTCPeerConnection({configuration});
          peerConnectionRef.current = pc;
  
          // 增加 video 接收 transceiver，使 offer 中包含 video m-line
          pc.addTransceiver("video", { direction: "recvonly" });
  
          // 接收到媒體軌時處理
          pc.addEventListener('track', event => {
                console.log("收到 track");
                if (videoRef.current && videoRef.current.srcObject !== event.streams[0]) {
                    videoRef.current.srcObject = event.streams[0];
                    console.log("成功接收到視訊串流，嘗試播放...");

                    videoRef.current.play().then(() => {
                        console.log("影片播放中");
                    }).catch(e => {
                        console.error("影片播放時發生錯誤：", e);
                    });
                }
          });
          
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);

          console.log("送出 offer");
          socket.send(JSON.stringify({ type: 'offer', sdp: offer.sdp }));
        };


        return () => {
            socket.close();
            pc.close();
        };
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col text-center">
                    <h1 className="display-4">Live Camera Feed</h1>
                    <video ref={videoRef} autoPlay playsInline className="img-fluid rounded" />
                </div>
            </div>
        </div>
    );
}