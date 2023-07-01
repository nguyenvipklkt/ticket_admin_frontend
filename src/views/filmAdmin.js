import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import moment from 'moment';

const FilmAdmin = () => {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filmsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFilm = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/films');
            setFilms(response.data.dataFilm);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFilm();
    }, []);

    const getMovieType = (movieType) => {
        if (movieType == 1) {
            return "Drama";
        }
        else if (movieType == 2) {
            return "Hành động";
        }
        else if (movieType == 3) {
            return "Hoạt hình";
        }
        else if (movieType == 4) {
            return "Ma quỷ";
        }
        else if (movieType == 5) {
            return "Lãng mạn";
        }
        else if (movieType == 6) {
            return "Hài hước";
        }
    }

    const handleDeleteFilm = async (idFilm) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/delete-film/${idFilm}`);
            fetchFilm();
            alert('Xóa film thành công');
        }
        catch (error) {
            console.error('Lỗi khi xóa film:', error);
            alert('Đã xảy ra lỗi khi xóa film');
        }
    }

    // Tính toán chỉ mục bắt đầu và chỉ mục kết thúc của film trong trang hiện tại
    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

    // Xử lý khi chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Xử lý tìm kiếm film
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
            searchFilms();
        }
    };

    const [filteredFilms, setFilteredFilms] = useState([]);
    const searchFilms = () => {
        const filteredFilms = films.filter((film) =>
            film.nameFilm.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Xử lý danh sách người dùng đã lọc
        // ...
        setFilteredFilms(filteredFilms);
    };

    console.log(films);

    const formatDateTime = (dateTime) => {
        const formattedDateTime = moment(dateTime).format('DD/MM/YYYY');
        return formattedDateTime;
    };

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a href="/">Users</a>
                    <a class="active" href="">Films</a>
                    <a href="cinemaAdmin">Cinemas</a>
                    <a href="scheduleAdmin">Schedules</a>
                    <a href="ticketAdmin">Tickets</a>
                    <input class="search-user" type="text" onKeyPress={handleKeyPress} onChange={handleSearch} placeholder="          search film ..." />
                </div>
            </div>
            <div class='film-container container'>
                <h1>Quản lý film </h1>
                <div> Thêm film: <a className="add-film" href="addFilm"> <FontAwesomeIcon icon={faPlus} /></a></div>
                <div>
                    {searchTerm && filteredFilms.length === 0 ? (
                        <p>No films found.</p>
                    ) : (
                        <div>
                            {filteredFilms.map((film) => (
                                <table class="table-users">
                                    <thead>
                                        <tr>
                                            <th>idFilm</th>
                                            <th> Name film</th>
                                            <th>Author</th>
                                            <th>Cast</th>
                                            <th>Movie type</th>
                                            <th>Time</th>
                                            <th>Release date</th>
                                            <th>Image</th>
                                            <th>Number booking</th>
                                        </tr>
                                    </thead>
                                    <tbody key={film.idFilm}>
                                        <td>{film.idFilm}</td>
                                        <td>{film.nameFilm}</td>
                                        <td>{film.author}</td>
                                        <td>{film.cast}</td>
                                        <td>{getMovieType(film.movieType)}</td>
                                        <td>{film.time}</td>
                                        <td>{formatDateTime(film.releaseDate)}</td>
                                        <td><img src={film.Image} style={{ width: '50px' }} /></td>
                                        <td>{film.numberBooking}</td>
                                    </tbody>

                                </table>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <table class="table-users">
                        <thead>
                            <tr>
                                <th>idFilm</th>
                                <th> Name film</th>
                                <th>Author</th>
                                <th>Cast</th>
                                <th>Movie type</th>
                                <th>Time</th>
                                <th>Release date</th>
                                <th>Image</th>
                                <th>Number booking</th>
                                <th class="option">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFilms.map((film) => (
                                <tr key={film.idFilm}>
                                    <td>{film.idFilm}</td>
                                    <td>{film.nameFilm}</td>
                                    <td>{film.author}</td>
                                    <td>{film.cast}</td>
                                    <td>{getMovieType(film.movieType)}</td>
                                    <td>{film.time}</td>
                                    <td>{formatDateTime(film.releaseDate)}</td>

                                    <td><img src={film.Image} style={{ width: '50px' }} /></td>
                                    <td>{film.numberBooking}</td>
                                    <td class="option-user">
                                        <a class="edit-user" href={"/editFilm/" + film.idFilm} ><FontAwesomeIcon icon={faPenToSquare} /></a>
                                        <a class="remove-user" onClick={() => handleDeleteFilm(film.idFilm)}><FontAwesomeIcon icon={faXmark} /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Hiển thị phân trang */}
            <Pagination
                filmsPerPage={filmsPerPage}
                totalFilms={films.length}
                paginate={paginate}
            />
        </div>
    )
}

const Pagination = ({ filmsPerPage, totalFilms, paginate }) => {
    const pageNumbers = [];

    // Tính toán số trang
    for (let i = 1; i <= Math.ceil(totalFilms / filmsPerPage); i++) {
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

export default FilmAdmin;