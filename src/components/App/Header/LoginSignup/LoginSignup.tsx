import { NavLink } from 'react-router-dom';

import './LoginSignup.scss';

function LoginSignup() {
  return (
    <>
      <NavLink to="/inscription" className="link">
        Inscription
      </NavLink>
      <NavLink to="/connexion" className="link">
        Connexion
      </NavLink>
    </>
  );
}

export default LoginSignup;
