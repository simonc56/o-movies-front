import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-pop-corn.png';
import LoginSignup from '../LoginSignup/LoginSignup';
import Searchbar from '../Searchbar/Searchbar';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="title">
        <img src={logo} alt="logo o'movies" />
        <h1>O'movies</h1>
      </NavLink>
      <nav>
        <ul className="header-links links">
          <li>
            <NavLink to="/actuellement">A l'affiche</NavLink>
          </li>
          <li>
            <NavLink to="/prochainement">Prochainement</NavLink>
          </li>
          <li>
            <NavLink to="/films">Films</NavLink>
          </li>
          <li>
            <NavLink to="/playlists">Mes playlists</NavLink>
          </li>
        </ul>
      </nav>
      <Searchbar />
      <LoginSignup />
    </header>
  );
}

export default Header;
