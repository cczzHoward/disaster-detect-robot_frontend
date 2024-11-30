import { useEffect, useState } from 'react';

export default function ResultMain() {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(`${process.env.WEBSOCKET_URL}/ws/live_feed/`);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const imageBlob = new Blob([event.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageSrc(imageUrl);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col text-center">
                    <h1 className="display-4">Live Camera Feed</h1>
                    {imageSrc ? (
                        <img src={imageSrc} alt="Live Feed" className="img-fluid rounded" />
                    ) : (
                        <p>No image yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}