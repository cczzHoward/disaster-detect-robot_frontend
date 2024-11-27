import { useState } from 'react';
import Layout from '../components/layout';

export default function Training() {
    const [file, setFile] = useState(null);
    const [output, setOutput] = useState([]);

    const sendMessage = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://26.237.202.99:8000/detection/api/upload_image/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOutput((prevOutput) => [...prevOutput, data]);
            setFile(null);
        } catch (error) {
            console.error('Error sending file:', error);
        }
    };

    return (
        <Layout>
            <div>
                <h1>This is the training page.</h1>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={sendMessage}>Send</button>
                {output.length === 0 ? (
                    <p>No output yet.</p>
                ) : (
                    <ul>
                        {output.map((message, index) => (
                            <li key={index}>{JSON.stringify(message)}</li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}