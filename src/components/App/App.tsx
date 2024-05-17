import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import ConfirmEmailPage from '../ConfirmEmailPage/ConfirmEmailPage'; // Assurez-vous d'importer la page de réinitialisation de mot de passe
import ConfirmPasswordPage from '../ConfirmPasswordPage/ConfirmPasswordPage';
import ConnectionPage from '../ConnectionPage/ConnectionPage';
import ContactPage from '../ContactPage/ContactPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviePage from '../MoviePage/MoviePage';
import SignupPage from '../SignupPage/SignupPage';

import theme from '../../styles/theme';
import './App.scss';

function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="App" data-mantine-color-scheme="light">
        <Header />
        <Routes>
          <Route path="/" />
          <Route path="/connexion" element={<ConnectionPage />} />
          <Route path="/inscription" element={<SignupPage />} />
          <Route path="/films/:id" element={<MoviePage />} />
          <Route path="/réinitialisation-email" element={<ConfirmEmailPage />} />
          <Route path="/réinitialisation-mot-de-passe" element={<ConfirmPasswordPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
