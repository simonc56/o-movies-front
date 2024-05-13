import { NavLink } from 'react-router-dom';

function LoginSignup() {
  return (
    <ul className="header-connexion-links links">
      <li>
        <NavLink to="/inscription">Inscription</NavLink>
      </li>
      <li>
        <NavLink to="/connexion">Connexion</NavLink>
      </li>
    </ul>
  );
}

export default LoginSignup;
