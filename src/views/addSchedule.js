import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import axios from "axios";
import { useActionData, useNavigate } from "react-router-dom";

const AddSchedule = () => {

    const [idFilm, setIdFilm] = useState('');
    const [idCinema, setIdCinema] = useState('');
    const [showDate, setShowDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/create-schedule', {
                idFilm,
                idCinema,
                showDate,
            })
            console.log(response.data);
            if (response.data.result) {
                alert('add schedule successful!');
                navigate('/scheduleAdmin');
            }
            else {
                alert('add schedule fail!');
            }
            setIdFilm('')
            setIdCinema('');
            setShowDate('');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="edituser-text">Thêm lịch chiếu</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label for="idFilm">Mã film : </label>
                    <input
                        type="number"
                        value={idFilm}
                        onChange={(event) => setIdFilm(event.target.value)}
                    />
                </div>
                <div class="input-name">
                    <label for="idCinema">Mã phòng : </label>
                    <input
                        type="number"
                        value={idCinema}
                        onChange={(event) => setIdCinema(event.target.value)}
                    />
                </div>
                <div class="input-name">
                    <label for="showDate">Ngày chiêú : </label>
                    <input
                        type="datetime-local"
                        value={showDate}
                        onChange={(event) => setShowDate(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" class="btn-submit">Thêm lịch</button>
                </div>
            </form>
        </div>
    )
}

export default AddSchedule;
