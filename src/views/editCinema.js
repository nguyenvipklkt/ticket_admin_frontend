import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditCinema = () => {
    const [cinema, setCinema] = useState({
        idCinema: '',
        showRoom: '',
        logo: ''
    });

    const navigate = useNavigate();

    let { idCinema } = useParams();

    var handleChange = (event) => {
        const { name, value } = event.target;
        setCinema(prevCinema => ({
            ...prevCinema,
            [name]: value
        }));
        console.log(name);
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:4000/api/v1/update-cinema/${idCinema}`, cinema)
            .then(response => {
                console.log('Cập nhật thành công:', response.data);
                // Cập nhật thông tin người dùng hiển thị
                setCinema(response.data);
                navigate('/cinemaAdmin');
            })
            .catch(error => {
                console.error('Lỗi cập nhật:', error);
            })

    }

    return (
        <div>
            <div className="edituser">
                <h1 className="edituser-text">Sửa thông tin rạp số {idCinema}</h1>
                <form onSubmit={handleSubmit} class="form-edituser">
                    <div class="input-name">
                        <label htmlFor="showRoom">Tên rạp : </label>
                        <input type="text" name="showRoom" value={cinema.showRoom || ''} onChange={handleChange} />
                    </div>
                    <div class="input-name">
                        <label htmlFor="logo">Logo : </label>
                        <input type="text" name="logo" value={cinema.logo || ''} onChange={handleChange} />
                    </div>
                    <button type="submit" class="btn-submit">Lưu thay đổi</button>

                </form>
            </div>
        </div >
    )
}

export default EditCinema;