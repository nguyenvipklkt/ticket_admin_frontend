import React from "react";
import { useState, useEffect } from "react";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const FilmAdmin = () => {
    const [films, setFilms] = useState([]);

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

    return (
        <div>
            <div class="header-home">
                <div class="topnav">
                    <a href="/">Users</a>
                    <a class="active" href="">Films</a>
                    <a href="">Cinemas</a>
                    <a href="">Schedules</a>
                    <a href="">Tickets</a>
                    <input class="search-user" type="text" placeholder="          search film ..." />
                </div>
            </div>
            <div class='film-container container'>
                <h1>Quản lý film</h1>
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
                            {films.map((film) => (
                                <tr key={film.idFilm}>
                                    <td>{film.idFilm}</td>
                                    <td>{film.nameFilm}</td>
                                    <td>{film.author}</td>
                                    <td>{film.cast}</td>
                                    <td>{getMovieType(film.movieType)}</td>
                                    <td>{film.time}</td>
                                    <td>{film.releaseDate}</td>
                                    <td>{film.image}</td>
                                    <td>{film.numberBooking}</td>
                                    <td class="option-user">
                                        <a class="edit-user" href="" ><FontAwesomeIcon icon={faPenToSquare} /></a>
                                        <a class="remove-user"><FontAwesomeIcon icon={faXmark} /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FilmAdmin;