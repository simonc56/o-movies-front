import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ContactPage from '../ContactPage/ContactPage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path='/contact' element={<ContactPage />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
