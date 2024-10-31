import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from './Components/Body';
import Header from './Components/Header';
import './style.css'
import Movie from './Components/Movie';
import Theloai from './Components/Theloai';

function App() {
  return (
    <BrowserRouter >
      <Header></Header>
      <Routes>
        <Route path='/' element={<Body></Body>}> </Route>
        <Route path='/xemphim/:id' element={<Movie></Movie>}> </Route>
        <Route path='/theloai/' element={<Theloai></Theloai>}> </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
