import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditFilm = () => {

    const [film, setFilm] = useState({
        nameFilm: '',
        author: '',
        cast: '',
        movieType: '',
        time: '',
        releaseDate: '',
        image: '',
    })

    let { idFilm } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        // Lấy thông tin người dùng từ API
        axios.get(`http://localhost:4000/api/v1/film/${idFilm}`)
            .then(response => {
                setFilm(response.data.film); // Cập nhật dữ liệu người dùng từ phản hồi API
                console.log(film);
            })
            .catch(error => {
                console.log(error);
            });
    }, [idFilm]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFilm(prevFilm => ({
            ...prevFilm,
            [name]: value,
        }));
        console.log(name);
    }

    const handleSubmit = event => {
        event.preventDefault();

        // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
        axios.put(`http://localhost:4000/api/v1/update-film/${idFilm}`, film)
            .then(response => {
                console.log('Cập nhật thành công:', response.data);
                // Cập nhật thông tin người dùng hiển thị
                setFilm(response.data);
                navigate('/filmAdmin');
            })
            .catch(error => {
                console.error('Lỗi cập nhật:', error);
            });
    };

    return (
        <div className="edituser">
            <h1 className="editfilm-text">Sửa thông tin film số {idFilm}</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label htmlFor="nameFilm">Tên Film : </label>
                    <input type="text" name="nameFilm" value={film.nameFilm || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="author">Tác giả : </label>
                    <input type="text" name="author" value={film.author || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="cast">Diễn viên : </label>
                    <input type="text" name="cast" value={film.cast || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="movieType">Thể loại : </label>
                    <input type="number" name="movieType" value={film.movieType || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="time">Thời gian : </label>
                    <input type="number" name="time" value={film.time || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="releaseDate">Ngày khởi chiếu : </label>
                    <input type="date" name="releaseDate" value={film.releaseDate || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="image">Ảnh : </label>
                    <input type="text" name="image" value={film.image || ''} onChange={handleChange} />
                </div>
                <button type="submit" class="btn-submit">Lưu thay đổi</button>
            </form>
        </div>
    )
}

export default EditFilm;