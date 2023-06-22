import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditUser = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
    });
    let { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        // Lấy thông tin người dùng từ API
        axios.get(`http://localhost:4000/api/v1/user/${id}`)
            .then(response => {
                setUser(response.data.user); // Cập nhật dữ liệu người dùng từ phản hồi API
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);
    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
        console.log(name);
    }

    const handleSubmit = event => {
        event.preventDefault();

        // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
        axios.put(`http://localhost:4000/api/v1/update-user/${id}`, user)
            .then(response => {
                console.log('Cập nhật thành công:', response.data);
                // Cập nhật thông tin người dùng hiển thị
                setUser(response.data);
                navigate('/');
            })
            .catch(error => {
                console.error('Lỗi cập nhật:', error);
            });
    };

    return (
        <div className="edituser">
            <h1 className="edituser-text">Sửa thông tin người dùng số {id}</h1>
            <form onSubmit={handleSubmit} class="form-edituser">
                <div class="input-name">
                    <label htmlFor="firstName">Tên : </label>
                    <input type="text" name="firstName" value={user.firstName || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="lastName">Tên đệm : </label>
                    <input type="text" name="lastName" value={user.lastName || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" value={user.email || ''} onChange={handleChange} />
                </div>
                <div class="input-name">
                    <label htmlFor="address">Địa chỉ : </label>
                    <input type="text" name="address" value={user.address || ''} onChange={handleChange} />
                </div>
                <button type="submit" class="btn-submit">Lưu thay đổi</button>
            </form>
        </div>
    )
}

export default EditUser;