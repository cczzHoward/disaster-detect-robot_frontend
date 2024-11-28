import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';



export default function Training() {
    const [file, setFile] = useState(null);
    const [output, setOutput] = useState("");

    const sendMessage = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                `${process.env.HTTP_URL}/detection/api/upload_image/`,
                 formData,
                 { timeout: 1000 }
                );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setOutput(response.data);
            setFile(null);
        } catch (error) {
            console.error(error);
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