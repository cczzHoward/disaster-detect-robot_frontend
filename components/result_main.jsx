import { useEffect, useRef, useState } from "react";
import Message from "./message";

export default function ResultMain() {
  const peerConnectionRef = useRef(null);
  const videoRef = useRef(null);
  const [message, setMessage] = useState("Click 'Start Connection' to begin");
  const [socket, setSocket] = useState(null);
  const [alertSocket, setAlertSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertImage, setAlertImage] = useState("");

  const alertConnection = () => {
    const newAlertSocket = new WebSocket(
        `${process.env.WEBSOCKET_URL}/ws/alerts/`
    );
    setAlertSocket(newAlertSocket);

    newAlertSocket.onopen = () => {
        console.log("Alert WebSocket connection established");
    };

    newAlertSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const message = data.message;
        const imageBase64 = data.image;

        // console.log("Alert message received:", message);
        // console.log("Image received:", imageBase64);

        // 播放音效
        const audio = new Audio("/alert_sound.mp3");
        audio.play().catch((e) => {
          console.error("音效播放時發生錯誤：", e);
        });

        setAlertMessage(message);
        setAlertImage(imageBase64);
        setShowModal(true);
    };

    newAlertSocket.onclose = () => {
        console.log("Alert WebSocket connection closed");
    };

    newAlertSocket.onerror = (error) => {
        console.error("Alert WebSocket error:", error);
    };
  };

  const startConnection = () => {
    setMessage("Initializing WebSocket connection...");
    alertConnection();
    const newSocket = new WebSocket(`${process.env.WEBSOCKET_URL}/ws/webrtc/`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
      setMessage("WebSocket connection established");
      setIsConnected(true);
      createOffer(newSocket);
    };

    newSocket.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "answer" && peerConnectionRef.current) {
        console.log("收到 answer，設定 remoteDescription");
        await peerConnectionRef.current.setRemoteDescription({
          type: "answer",
          sdp: data.sdp,
        });
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
      setMessage("WebSocket connection closed");
      setIsConnected(false);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setMessage("WebSocket error occurred");
      setIsConnected(false);
    };
  };

  // RTCPeerConnection
  async function createOffer(newSocket) {
    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
      ],
    };

    const pc = new RTCPeerConnection(configuration);
    peerConnectionRef.current = pc;

    pc.addTransceiver("video", { direction: "recvonly" });

    pc.addEventListener("track", (event) => {
      console.log("收到 track");
      if (videoRef.current && videoRef.current.srcObject !== event.streams[0]) {
        videoRef.current.srcObject = event.streams[0];
        console.log("成功接收到視訊串流，嘗試播放...");
        setMessage("Connected");

        videoRef.current
          .play()
          .then(() => {
            console.log("影片播放中");
          })
          .catch((e) => {
            console.error("影片播放時發生錯誤：", e);
          });
      }
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    console.log("送出 offer");
    newSocket.send(JSON.stringify({ type: "offer", sdp: offer.sdp }));
  }

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (alertSocket) {
        alertSocket.close();
      }
    };
  }, [socket, alertSocket]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1 className="display-4">Live Camera Feed</h1>
          {!isConnected && (
            <button className="btn btn-dark mb-3" onClick={startConnection}>
              Start Connection
            </button>
          )}
          {isConnected && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="img-fluid rounded"
            />
          )}
          <Message message={message} />
        </div>
      </div>

      {/* Bootstrap Modal */}
      {/* Alert Area */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alert</h5>
            </div>
            <div className="modal-body">
              <p>{alertMessage}</p>
              {alertImage && (
                <img
                  src={`data:image/jpeg;base64,${alertImage}`}
                  alt="Alert"
                  className="img-fluid"
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
