import { Route, Routes } from 'react-router-dom';
import ConnectionPage from '../ConnectionPage/ConnectionPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SignupPage from '../SignupPage/SignupPage';
import MoviePage from '../MoviePage/MoviePage';
import ConfirmPasswordPage from '../ConfirmPasswordPage/ConfirmPasswordPage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path='/connexion' element={<ConnectionPage />}/>
        <Route path='/inscription' element={<SignupPage />}/>
        <Route path="/films/:id" element={<MoviePage />} />
        <Route path='/réinitialisation-mot-de-passe' element={<ConfirmPasswordPage />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
