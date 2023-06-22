import '../assets/css/App.css';
import { Route, Routes } from 'react-router-dom';
import HomeAdmin from '../views/homeAdmin';
import EditUser from '../views/editUser';
import FilmAdmin from '../views/filmAdmin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomeAdmin />} />
        <Route path='editUser/:id' element={<EditUser />} />
        <Route path='filmAdmin' element={<FilmAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
