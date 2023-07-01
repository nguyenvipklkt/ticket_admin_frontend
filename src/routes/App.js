import '../assets/css/App.css';
import { Route, Routes } from 'react-router-dom';
import HomeAdmin from '../views/homeAdmin';
import EditUser from '../views/editUser';
import FilmAdmin from '../views/filmAdmin';
import EditFilm from '../views/editFilm';
import AddFilm from '../views/addFilm';
import CinemaAdmin from '../views/cinemaAdmin';
import ScheduleAdmin from '../views/scheduleAdmin';
import EditCinema from '../views/editCinema';
import AddCinema from '../views/addCinema';
import AddSchedule from '../views/addSchedule';
import EditSchedule from '../views/editSchedule';
import TicketAdmin from '../views/ticketAdmin';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomeAdmin />} />
        <Route path='editUser/:id' element={<EditUser />} />
        <Route path='filmAdmin' element={<FilmAdmin />} />
        <Route path='editFilm/:idFilm' element={<EditFilm />} />
        <Route path='addFilm' element={<AddFilm />} />
        <Route path='cinemaAdmin' element={<CinemaAdmin />} />
        <Route path='editCinema/:idCinema' element={<EditCinema />} />
        <Route path='addCinema' element={<AddCinema />} />
        <Route path='scheduleAdmin' element={<ScheduleAdmin />} />
        <Route path='addSchedule' element={<AddSchedule />} />
        <Route path='editSchedule/:idSC' element={<EditSchedule />} />
        <Route path='ticketAdmin' element={<TicketAdmin />} />

      </Routes>
    </div>
  );
}

export default App;
