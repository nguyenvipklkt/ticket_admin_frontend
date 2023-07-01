import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import moment from 'moment';

const ScheduleAdmin = () => {
    const [schedules, setSchedules] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [schedulesPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/schedules');
            setSchedules(response.data.dataSchedules);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleDeleteSchedule = async (idSC) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/delete-schedule/${idSC}`)

            fetchSchedules();
            alert('Xóa lịch chiếu thành công');
        }
        catch (error) {
            console.error('Lỗi khi xóa lịch chiếu:', error);
            alert('Đã xảy ra lỗi khi xóa lịch chiếu');
        }
    }

    const formatDateTime = (dateTime) => {
        const formattedDateTime = moment(dateTime).format('HH:mm DD/MM/YYYY');
        return formattedDateTime;
    };

    // Tính toán chỉ mục bắt đầu và chỉ mục kết thúc của film trong trang hiện tại
    const indexOfLastSchedule = currentPage * schedulesPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
    const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule);

    // Xử lý khi chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Xử lý tìm lich chieu
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
            searchSchedules();
        }
    };

    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const searchSchedules = () => {
        const filteredSchedules = schedules.filter((schedule) =>
            formatDateTime(schedule.showDate).toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Xử lý danh sách người dùng đã lọc
        // ...
        setFilteredSchedules(filteredSchedules);
    };

    return (
        <div>
            <div class="topnav">
                <a href="/">Users</a>
                <a href="filmAdmin">Films</a>
                <a href="cinemaAdmin">Cinemas</a>
                <a class="active" href="scheduleAdmin">Schedules</a>
                <a href="ticketAdmin">Tickets</a>
                <input class="search-user" type="text" onKeyPress={handleKeyPress} onChange={handleSearch} placeholder="       search schedule ..." />
            </div>

            <div className="container">
                <h1>Quản lý lịch chiếu</h1>
                <div>
                    {searchTerm && filteredSchedules.length === 0 ? (
                        <p>No schedules found.</p>
                    ) : (
                        <div>
                            {filteredSchedules.map((schedule) => (
                                <table class="table-users">
                                    <thead>
                                        <tr>
                                            <th>Id lịch chiếu</th>
                                            <th>Id Film</th>
                                            <th>Id rạp</th>
                                            <th>Ngày chiếu</th>
                                        </tr>
                                    </thead>
                                    <tbody key={schedule.idSC}>
                                        <td>{schedule.idSC}</td>
                                        <td>{schedule.idFilm}</td>
                                        <td>{schedule.idCinema}</td>
                                        <td>{formatDateTime(schedule.showDate)}</td>
                                    </tbody>

                                </table>
                            ))}
                        </div>
                    )}
                </div>
                <div> Thêm lịch chiếu: <a className="add-film" href="addSchedule"> <FontAwesomeIcon icon={faPlus} /></a></div>
                <div>
                    <table className="table-users">
                        <thead>
                            <tr>
                                <th>Id lịch chiếu</th>
                                <th>Id Film</th>
                                <th>Id rạp</th>
                                <th>Ngày chiếu</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSchedules.map((schedule) => (
                                <tr key={schedule.idSC}>
                                    <td>{schedule.idSC}</td>
                                    <td>{schedule.idFilm}</td>
                                    <td>{schedule.idCinema}</td>
                                    <td>{formatDateTime(schedule.showDate)}</td>
                                    <td class="option-user">
                                        <a class="edit-user" href={"/editSchedule/" + schedule.idSC} ><FontAwesomeIcon icon={faPenToSquare} /></a>
                                        <a class="remove-user" onClick={() => handleDeleteSchedule(schedule.idSC)}><FontAwesomeIcon icon={faXmark} /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Hiển thị phân trang */}
            <Pagination
                schedulesPerPage={schedulesPerPage}
                totalChedules={schedules.length}
                paginate={paginate}
            />
        </div>
    )
}

const Pagination = ({ schedulesPerPage, totalChedules, paginate }) => {
    const pageNumbers = [];

    // Tính toán số trang
    for (let i = 1; i <= Math.ceil(totalChedules / schedulesPerPage); i++) {
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

export default ScheduleAdmin;