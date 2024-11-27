import { useEffect, useState } from 'react';
import Layout from '../components/layout';

export default function Result() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://26.237.202.99:8000/ws/live_feed/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
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
        <Layout>
            <div>
                <h1>This is the result page.</h1>
                {messages.length === 0 ? (
                    <p>No message yet.</p>
                ) : (
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{JSON.stringify(message)}</li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}