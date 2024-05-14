import { Route, Routes } from 'react-router-dom';
import ConnectionPage from '../ConnectionPage/ConnectionPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path='/connexion' element={<ConnectionPage />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
