import { useState } from 'react';
import axios from 'axios';

export default function TrainingMain() {
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
            
            if (!response.status === 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setOutput(response.data);
            setFile(null);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center mb-4">Upload Training File</h1>
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>
                    {output.length === 0 ? (
                        <p className="mt-4 text-center">No output yet.</p>
                    ) : (
                        <ul className="mt-4 list-group">
                            {output.map((message, index) => (
                                <li key={index} className="list-group-item">{JSON.stringify(message)}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>  
    );
}