import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import ConfirmEmailPage from '../ConfirmEmailPage/ConfirmEmailPage';
import ConfirmPasswordPage from '../ConfirmPasswordPage/ConfirmPasswordPage';
import ConnectionPage from '../ConnectionPage/ConnectionPage';
import ContactPage from '../ContactPage/ContactPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Homepage from '../Homepage/Homepage';
import MoviePage from '../MoviePage/MoviePage';
import SignupPage from '../SignupPage/SignupPage';
import UserProfilePage from '../ProfilUserPage/ProfilUserPage';
import ChangePasswordPage from '../ChangePasswordPage/ChangePasswordPage';
import PlaylistPage from '../PlaylistPage/PlaylistPage'

import theme from '../../styles/theme';
import './App.scss';


function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="App" data-mantine-color-scheme="light">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/connexion" element={<ConnectionPage />} />
          <Route path="/inscription" element={<SignupPage />} />
          <Route path="/films/:id" element={<MoviePage />} />
          <Route path="/réinitialisation-email" element={<ConfirmEmailPage />} />
          <Route path="/réinitialisation-mot-de-passe" element={<ConfirmPasswordPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profil" element={<UserProfilePage />} />
          <Route path="/changer-mot-de-passe" element={<ChangePasswordPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Routes>
        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
