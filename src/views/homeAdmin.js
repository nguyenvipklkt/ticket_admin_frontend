import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const HomeAdmin = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    // Sử dụng useEffect để lấy danh sách người dùng từ API khi component được render
    useEffect(() => {
        fetchUsers();
    }, []);

    // Hàm gọi API để lấy danh sách người dùng
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/users');
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/delete-user/${id}`)

            fetchUsers();
            alert('Xóa người dùng thành công');
        }
        catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            alert('Đã xảy ra lỗi khi xóa người dùng');
        }
    }

    // Tính toán chỉ mục bắt đầu và chỉ mục kết thúc của người dùng trong trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Xử lý khi chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Xử lý tìm kiếm người dùng
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    // const filteredUsers = users.filter((user) =>
    //     user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Thực hiện tìm kiếm người dùng khi nhấn phím Enter
            // Ví dụ: Gọi hàm searchUsers() để lọc danh sách người dùng
            searchUsers();
        }
    };

    const [filteredUsers, setFilteredUsers] = useState([]);
    const searchUsers = () => {
        const filteredUsers = users.filter((user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Xử lý danh sách người dùng đã lọc
        // ...
        setFilteredUsers(filteredUsers);
    };
    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a class="active" href="/">Users</a>
                    <a href="filmAdmin">Films</a>
                    <a href="">Cinemas</a>
                    <a href="">Schedules</a>
                    <a href="">Tickets</a>
                    <input class="search-user" onKeyPress={handleKeyPress} onChange={handleSearch} type="text" placeholder="          search user ..." />

                </div>
            </div>

            <div class="container">
                <h1>Quản lý người dùng</h1>
                <ul>
                    {searchTerm && filteredUsers.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <ul>
                            {filteredUsers.map((user) => (
                                <div key={user.id}>
                                    <li>{user.id}</li>
                                    <li>{user.firstName}</li>
                                    <li>{user.lastName}</li>
                                    <li>{user.email}</li>
                                    <li>{user.address}</li>
                                </div>
                            ))}
                        </ul>
                    )}
                </ul>
                <div>
                    <table class="table-users">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First name</th>
                                <th>last name</th>
                                <th>Email</th>
                                {/* <th>Password</th> */}
                                <th>Address</th>
                                <th class="option">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    {/* <td>{user.password}</td> */}
                                    <td>{user.address}</td>
                                    <td class="option-user">
                                        <a class="edit-user" href={"/editUser/" + user.id} ><FontAwesomeIcon icon={faPenToSquare} /></a>
                                        <a class="remove-user" onClick={() => handleDeleteUser(user.id)}><FontAwesomeIcon icon={faXmark} /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hiển thị phân trang */}
            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={users.length}
                paginate={paginate}
            />
        </div>
    )
}

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    // Tính toán số trang
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button className="page-link" onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default HomeAdmin;