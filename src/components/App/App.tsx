import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import ChangePasswordPage from '../ChangePasswordPage/ChangePasswordPage';
import ConfirmEmailPage from '../ConfirmEmailPage/ConfirmEmailPage';
import ConfirmPasswordPage from '../ConfirmPasswordPage/ConfirmPasswordPage';
import ConnectionPage from '../ConnectionPage/ConnectionPage';
import ContactPage from '../ContactPage/ContactPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Homepage from '../Homepage/Homepage';
import MoviePage from '../MoviePage/MoviePage';
import UserProfilePage from '../ProfilUserPage/ProfilUserPage';
import SignupPage from '../SignupPage/SignupPage';
import { useAppSelector } from '../../store/hooks';
import theme from '../../styles/theme';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import './App.scss';

function App() {
  const user = useAppSelector((state) => state.settings.user);

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
          {user.token && <Route path="/profil" element={<UserProfilePage />} />}
          <Route path="/changer-mot-de-passe" element={<ChangePasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
