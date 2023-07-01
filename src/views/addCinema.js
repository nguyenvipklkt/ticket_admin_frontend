import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import axios from "axios";
import { useActionData, useNavigate } from "react-router-dom";

const AddCinema = () => {

    const [showRoom, setShowRoom] = useState('');
    const [logo, setLogo] = useState('');
    const navigate = useNavigate();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('logo', file);

        try {
            const response = await axios.post('http://localhost:4000/api/v1/upload-cinema', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const imagePath = response.data.fileUrl;
            setLogo(imagePath)
            // Lưu đường dẫn ảnh vào state hoặc làm các xử lý khác tại đây
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/create-cinema', {
                showRoom,
                logo,
            })
            console.log(response.data);
            if (response.data.result) {
                alert('add cinema successful!');
                navigate('/cinemaAdmin');
            }
            else {
                alert('add cinema fail!');
            }
            setShowRoom('');
            setLogo('');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="edituser-text">Thêm rạp</h1>
            <form class="form-upload-cinema">
                <div class="input-name">
                    <label for="logo">Ảnh : </label>
                    <input
                        type="file"
                        name="logo"
                        onChange={handleImageUpload}
                    />
                </div>
            </form>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label for="showRoom">Tên rạp : </label>
                    <input
                        type="text"
                        value={showRoom}
                        onChange={(event) => setShowRoom(event.target.value)}
                    />
                </div>
                <div class="input-name">
                    <label for="logo">Logo : </label>
                    <input
                        type="text"
                        value={logo}
                        onChange={(event) => setLogo(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" class="btn-submit">Thêm Rạp</button>
                </div>
            </form>
        </div>
    )
}

export default AddCinema;
