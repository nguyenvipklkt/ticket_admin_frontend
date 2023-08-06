import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import moment from 'moment';

const TicketAdmin = () => {

    const [dataTickets, setDataTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalSales, setTotalSales] = useState('');
    const [totalTicketsSold, setTotalTicketsSold] = useState('');

    const fetchTicket = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/tickets');
            setDataTickets(response.data.dataTickets);
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateStatus = () => {
        axios.get('http://localhost:4000/api/v1/updateTkStatus');
    }

    useEffect(() => {
        fetchTicket();
        updateStatus();
        totalTicket();
    }, [])

    const totalTicket = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/sumTicket');
            console.log(response.data.totalSales)
            setTotalSales(response.data.totalSales);
            setTotalTicketsSold(response.data.totalTicketsSold);

        }
        catch (error) {
            console.log(error);
        }
    }

    const getSatus = (nub) => {
        if (nub == 0) {
            return "Chưa hết hạn";
        }
        else {
            return "Đã hết hạn";
        }
    }

    const formatDateTime = (dateTime) => {
        const formattedDateTime = moment(dateTime).format('DD/MM/YYYY');
        return formattedDateTime;
    };

    // Tính toán chỉ mục bắt đầu và chỉ mục kết thúc của film trong trang hiện tại
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = dataTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    // Xử lý khi chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Xử lý tìm ve
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Thực hiện tìm kiếm người dùng khi nhấn phím Enter
            // Ví dụ: Gọi hàm searchUsers() để lọc danh sách người dùng
            searchTickets();
        }
    };

    const [filteredTickets, setFilteredTickets] = useState([]);
    const searchTickets = () => {
        const filteredTickets = dataTickets.filter((dataTicket) =>
            dataTicket.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Xử lý danh sách người dùng đã lọc
        // ...
        setFilteredTickets(filteredTickets);
    };

    return (
        <div>
            <div class="topnav">
                <a href="/">Người dùng</a>
                <a href="filmAdmin">Phim</a>
                <a href="cinemaAdmin">Rạp</a>
                <a href="scheduleAdmin">Lịch chiếu</a>
                <a class="active" href="ticketAdmin">Vé</a>
                <input class="search-user" type="text" onKeyPress={handleKeyPress} onChange={handleSearch} placeholder="       search ticket ..." />
            </div>

            <div className="container">
                <h1>Quản lý vé</h1>
                <div>
                    {searchTerm && filteredTickets.length === 0 ? (
                        <p>Không tìm thấy lịch chiếu.</p>
                    ) : (
                        <div>
                            {filteredTickets.map((dataTicket) => (
                                <table class="table-users">
                                    <thead>
                                        <tr>
                                            <th>Id Vé</th>
                                            <th>Id lịch chiếu</th>
                                            <th>Người dùng</th>
                                            <th>Giá vé</th>
                                            <th>Ghế</th>
                                            <th>Ngày đặt</th>
                                            <th>Thanh toán</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody key={dataTicket.idTicket}>
                                        <td>{dataTicket.idTicket}</td>
                                        <td>{dataTicket.idSC}</td>
                                        <td>{dataTicket.lastName} {dataTicket.firstName}</td>
                                        <td>{dataTicket.cost}</td>
                                        <td>{dataTicket.seats}</td>
                                        <td>{formatDateTime(dataTicket.bookingDate)}</td>
                                        <td>{dataTicket.pay}</td>
                                        <td>{getSatus(dataTicket.tkStatus)}</td>
                                    </tbody>

                                </table>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <table className="table-users">
                        <thead>
                            <tr>
                                <th>Id Vé</th>
                                <th>Id lịch chiếu</th>
                                <th>Người dùng</th>
                                <th>Giá vé</th>
                                <th>Ghế</th>
                                <th>Ngày đặt</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentTickets.map((dataTicket) => (
                                    <tr key={dataTicket.idTicket}>
                                        <td>{dataTicket.idTicket}</td>
                                        <td>{dataTicket.idSC}</td>
                                        <td>{dataTicket.lastName} {dataTicket.firstName}</td>
                                        <td>{dataTicket.cost}</td>
                                        <td>{dataTicket.seats}</td>
                                        <td>{formatDateTime(dataTicket.bookingDate)}</td>
                                        <td>{dataTicket.pay}</td>
                                        <td>{getSatus(dataTicket.tkStatus)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Hiển thị phân trang */}
            <Pagination
                ticketsPerPage={ticketsPerPage}
                totalTickets={dataTickets.length}
                paginate={paginate}
            />
            <div className="sumTicket">
                <div className="totalSales">Tổng số vé đã bán : {totalSales}</div>
                <div className="totalTicketsSold">Doanh thu đạt được : {totalTicketsSold}</div>
            </div>
        </div>
    )
}

const Pagination = ({ ticketsPerPage, totalTickets, paginate }) => {
    const pageNumbers = [];

    // Tính toán số trang
    for (let i = 1; i <= Math.ceil(totalTickets / ticketsPerPage); i++) {
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

export default TicketAdmin;