import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './ConnectionPage.scss';

function ConnectionPage() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [stayConnected, setStayConnected] = useState(false);

  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const stayConnectedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStayConnected(event.target.checked);
  };

  return (
    <div>
      <h1>Connection</h1>
      <p>Connectez-vous pour accéder à votre espace personnel.</p>
      <form action="">
        <div className="mail">
          <input type="email" placeholder="marie@hotmail.com" value={emailValue} onChange={emailChange} required />
        </div>
        <div className="mdp">
          <input type="password" placeholder="Mot de passe" value={passwordValue} onChange={passwordChange} />
        </div>
        <div>
          <input type="checkbox" id="checkbox" checked={stayConnected} onChange={stayConnectedChange} />
          <label htmlFor="checkbox">Rester connecté </label>
        </div>
        <button className="boutton-connexion" type="submit">
          Connection
        </button>
      </form>

      <div>
        <p>Vous n'avez pas encore de compte?</p>
        <Link to="/sign-up" className="signup-link">
          Créer un compte
        </Link>
      </div>
      <div>
        <Link to="/reinitiate-password" className="password-link">
          éinitialiser le mot de passe.
        </Link>
      </div>
    </div>
  );
}

export default ConnectionPage;
