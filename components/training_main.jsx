import { useState, useRef } from 'react';
import axios from 'axios';

export default function TrainingMain() {
    const [files, setFiles] = useState([]);
    const [output, setOutput] = useState("");
    const fileInputRef = useRef(null);

    const sendMessage = async () => {
        if (files.length === 0) {
            console.error('No files selected');
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file);
        });

        try {
            const response = await axios.post(
                `${process.env.HTTP_URL}/api/upload_image/`,
                formData,
                { timeout: 5000 }
            );
            
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 根據 response.data.status 設置 output
            if (response.data.status === "success") {
                setOutput("檔案傳送成功");
            } else {
                setOutput("檔案傳送失敗");
            }

            setFiles([]);
            fileInputRef.current.value = null; // 重置文件輸入元素的值
        } catch (error) {
            console.error(`error: ${error}`);
            setOutput("檔案傳送失敗");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center mb-4">Upload Training Files</h1>
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            multiple
                            onChange={(e) => setFiles(Array.from(e.target.files))}
                            ref={fileInputRef} // 使用 useRef 來引用文件輸入元素
                        />
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>
                    <p className="mt-4 text-center">{output}</p>
                </div>
            </div>
        </div>  
    );
}