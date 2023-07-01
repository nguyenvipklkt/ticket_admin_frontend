import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import axios from "axios";
import { useActionData, useNavigate } from "react-router-dom";

const AddFilm = () => {

    const [nameFilm, setNameFilm] = useState('');
    const [author, setAuthor] = useState('');
    const [cast, setCast] = useState('');
    const [movieType, setMovieType] = useState('');
    const [time, setTime] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [image, setImage] = useState('');
    const [numberBooking, setNumberBooking] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/create-film', {
                nameFilm,
                author,
                cast,
                movieType,
                time,
                releaseDate,
                image,
                numberBooking,
            }
            );
            console.log(response.data);
            if (response.data.result) {
                alert('add film successful!');
                navigate('/filmAdmin');
            }
            else {
                alert('add film fail!');
            }
            // Reset các trường sau khi đăng ký thành công
            setNameFilm('');
            setAuthor('');
            setCast('');
            setMovieType('');
            setTime('');
            setReleaseDate('');
            setImage('');
            setNumberBooking('');
        }
        catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            {/* <h1 className="edituser-text">Thêm film</h1> */}
            <form onSubmit={handleSubmit} class="form-edituser">
                <div>
                    <div class="input-name">
                        <label for="nameFilm">Tên film : </label>
                        <input
                            type="text"
                            value={nameFilm}
                            onChange={(event) => setNameFilm(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="author">Tác giả : </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="cast">Diễn viên : </label>
                        <input
                            type="text"
                            value={cast}
                            onChange={(event) => setCast(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="movieType">Thể loại : </label>
                        <input
                            type="number"
                            value={movieType}
                            onChange={(event) => setMovieType(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="time">Thời gian : </label>
                        <input
                            type="number"
                            value={time}
                            onChange={(event) => setTime(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="releaseDate">Ngày khởi chiếu : </label>
                        <input
                            type="date"
                            value={releaseDate}
                            onChange={(event) => setReleaseDate(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="Image">Ảnh : </label>
                        <input
                            type="text"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </div>
                    <div class="input-name">
                        <label for="numberBooking">Lượt mua : </label>
                        <input
                            type="number"
                            value={numberBooking}
                            onChange={(event) => setNumberBooking(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" class="btn-submit">Thêm film</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddFilm;