import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditSchedule = () => {

    const [schedule, setSchedule] = useState({
        idFilm: '',
        idCinema: '',
        showDate: '',
    })

    let { idSC } = useParams();

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: value,
        }));
        console.log(name);
    }

    const handleSubmit = event => {
        event.preventDefault();

        // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
        axios.put(`http://localhost:4000/api/v1/update-schedule/${idSC}`, schedule)
            .then(response => {
                console.log('Cập nhật thành công:', response.data);
                // Cập nhật thông tin người dùng hiển thị
                setSchedule(response.data);
                navigate('/scheduleAdmin');
            })
            .catch(error => {
                console.error('Lỗi cập nhật:', error);
            });
    };


    return (
        <div className="edituser">
            <h1 className="editfilm-text">Sửa thông tin lịch chiếu mã {idSC}</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label htmlFor="idFilm">Mã film : </label>
                    <input type="number" name="idFilm" value={schedule.idFilm || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="idCinema">Mã rạp : </label>
                    <input type="number" name="idCinema" value={schedule.idCinema || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="showDate">Ngày chiếu : </label>
                    <input type="datetime-local" name="showDate" value={schedule.showDate || ''} onChange={handleChange} />
                </div>
                <button type="submit" class="btn-submit">Lưu thay đổi</button>
            </form>
        </div>
    )
}

export default EditSchedule;