import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import theme from '../../styles/theme';
import ChangePasswordPage from '../ChangePasswordPage/ChangePasswordPage';
import ConfirmEmailPage from '../ConfirmEmailPage/ConfirmEmailPage';
import ConfirmPasswordPage from '../ConfirmPasswordPage/ConfirmPasswordPage';
import ConnectionPage from '../ConnectionPage/ConnectionPage';
import ContactPage from '../ContactPage/ContactPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Homepage from '../Homepage/Homepage';
import MoviePage from '../MoviePage/MoviePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import UserProfilePage from '../ProfilUserPage/ProfilUserPage';
import SignupPage from '../SignupPage/SignupPage';

import './App.scss';

function App() {
  const logged = useAppSelector((state) => state.settings.user.logged);

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
          {logged && <Route path="/profil" element={<UserProfilePage />} />}
          {logged && <Route path="/changer-mot-de-passe" element={<ChangePasswordPage />} />}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
      <Notifications position="top-right" />
    </MantineProvider>
  );
}

export default App;
