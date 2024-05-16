import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import ConnectionPage from '../ConnectionPage/ConnectionPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviePage from '../MoviePage/MoviePage';
import SignupPage from '../SignupPage/SignupPage';

import './App.scss';

function App() {
  return (
    <MantineProvider>
      <div className="App" data-mantine-color-scheme="light">
        <Header />
        <Routes>
          <Route path="/" />
          <Route path="/connexion" element={<ConnectionPage />} />
          <Route path="/inscription" element={<SignupPage />} />
          <Route path="/films/:id" element={<MoviePage />} />
        </Routes>
        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
