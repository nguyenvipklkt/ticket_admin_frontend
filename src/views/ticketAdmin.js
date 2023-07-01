import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import moment from 'moment';

const TicketAdmin = () => {
    return (
        <div>
            <div class="topnav">
                <a href="/">Users</a>
                <a href="filmAdmin">Films</a>
                <a href="cinemaAdmin">Cinemas</a>
                <a href="scheduleAdmin">Schedules</a>
                <a class="active" href="ticketAdmin">Tickets</a>
                <input class="search-user" type="text" placeholder="       search ticket ..." />
            </div>

            <div className="container">
                <h1>Quản lý vé</h1>
            </div>
        </div>
    )
}

export default TicketAdmin;