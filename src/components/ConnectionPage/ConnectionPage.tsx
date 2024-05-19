import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginCredentials } from '../../@types/Credentials';
import { login } from '../../api';
import './ConnectionPage.scss';

function ConnectionPage() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [stayConnected, setStayConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const stayConnectedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStayConnected(event.target.checked);
  };

  const onLogin = async () => {
    setLoading(true);
    setError(null);

    const loginCredentials: LoginCredentials = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      const response = await login(loginCredentials);
      console.log(response);
    } catch (err) {
      setError('Failed to login. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="connection-section">
      <div>
        <h1 className="connection-title">Connection</h1>
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
          {error && <p className="error-message">{error}</p>}
          <button className="button-connexion" type="button" onClick={onLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Connection'}
          </button>
        </form>

        <div className="link-signUp">
          <p>Vous n'avez pas encore de compte?</p>
          <Link to="/inscription" className="signup-link">
            Créer un compte
          </Link>
        </div>
        <div className="link-reinitiate">
          <Link to="/réinitialisation-email" className="password-link">
            Réinitialiser le mot de passe.
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ConnectionPage;
