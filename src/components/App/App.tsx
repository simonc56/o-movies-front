import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SignupPage from '../SignupPage/SignupPage';
import MoviePage from '../MoviePage/MoviePage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path='/inscription' element={<SignupPage />}/>
        <Route path="/films/:id" element={<MoviePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
