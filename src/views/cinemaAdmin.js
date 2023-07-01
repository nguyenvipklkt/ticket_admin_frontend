import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const CinemaAdmin = () => {

    const [cinemas, setCinemas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cinemasPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchCinemas();
    }, []);

    const fetchCinemas = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/cinemas')
            setCinemas(response.data.dataCinema);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteCinema = async (idCinema) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/delete-cinema/${idCinema}`)

            fetchCinemas();
            alert('Xóa rạp dùng thành công');
        }
        catch (error) {
            console.error('Lỗi khi xóa rạp:', error);
            alert('Đã xảy ra lỗi khi xóa rạp');
        }
    }

    // Tính toán chỉ mục bắt đầu và chỉ mục kết thúc của rạp trong trang hiện tại
    const indexOfLastCinema = currentPage * cinemasPerPage;
    const indexOfFirstCinema = indexOfLastCinema - cinemasPerPage;
    const currentCinemas = cinemas.slice(indexOfFirstCinema, indexOfLastCinema);

    // Xử lý khi chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Xử lý tìm kiếm rạp
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    // Lọc danh sách rạp dựa trên từ khóa tìm kiếm
    // const filteredUsers = users.filter((user) =>
    //     user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Thực hiện tìm kiếm rạp khi nhấn phím Enter
            // Ví dụ: Gọi hàm searchCinemas() để lọc danh sách rạp
            searchCinemas();
        }
    };

    const [filteredCinemas, setFilteredCinemas] = useState([]);
    const searchCinemas = () => {
        const filteredCinemas = cinemas.filter((cinema) =>
            cinema.showRoom.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Xử lý danh sách rạp đã lọc
        // ...
        setFilteredCinemas(filteredCinemas);
    };

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a href="/">Users</a>
                    <a href="filmAdmin">Films</a>
                    <a class="active" href="cinemaAdmin">Cinemas</a>
                    <a href="scheduleAdmin">Schedules</a>
                    <a href="ticketAdmin">Tickets</a>
                    <input class="search-user" onKeyPress={handleKeyPress} onChange={handleSearch} placeholder="          search cinema ..." />
                </div>
            </div>

            <div className="container">
                <h1>Quản lý rạp</h1>
                <div> Thêm rạp : <a className="add-film" href="addCinema"> <FontAwesomeIcon icon={faPlus} /></a></div>
                <div>
                    {
                        searchTerm && filteredCinemas.length === 0 ? (
                            <p>No cinema not found.</p>
                        ) : (
                            <div>
                                {filteredCinemas.map((cinema) => (
                                    <table className="table-users">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên rạp</th>
                                                <th>Logo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{cinema.idCinema}</td>
                                                <td>{cinema.showRoom}</td>
                                                <td>{cinema.logo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
                            </div>
                        )

                    }
                </div>
                <div>
                    <table class="table-users">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên Rạp</th>
                                <th>Logo</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCinemas.map((cinema) => (
                                <tr>
                                    <td>{cinema.idCinema}</td>
                                    <td>{cinema.showRoom}</td>
                                    {/* <td><img src={cinema.logo} style={{ width: '10px' }} /></td> */}
                                    <td>{cinema.logo}</td>
                                    <td class="option-user">
                                        <a class="edit-user" href={'/editCinema/' + cinema.idCinema}><FontAwesomeIcon icon={faPenToSquare} /></a>
                                        <a class="remove-user" onClick={() => handleDeleteCinema(cinema.idCinema)}><FontAwesomeIcon icon={faXmark} /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                cinemasPerPage={cinemasPerPage}
                totalCinemas={cinemas.length}
                paginate={paginate}
            />
        </div>
    )
}

const Pagination = ({ cinemasPerPage, totalCinemas, paginate }) => {
    const pageNumbers = [];

    // Tính toán số trang
    for (let i = 1; i <= Math.ceil(totalCinemas / cinemasPerPage); i++) {
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

export default CinemaAdmin;