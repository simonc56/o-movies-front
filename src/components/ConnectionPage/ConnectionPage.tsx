import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { LoginCredentials } from '../../@types/Credentials';
import { login } from '../../api';
import './ConnectionPage.scss';


interface LoginResponse {
  message: string;
// If necessary, add other answer property
}

function ConnectionPage() {
// State to store form field values
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [stayConnected, setStayConnected] = useState(false);
  // Status to manage loading status, errors and response messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

// Change manager for the email field
  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
// Change manager for password field
  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
// Change manager for the "Stay connected" checkbox
  const stayConnectedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStayConnected(event.target.checked);
  };
// Function to manage the submission of the login form
  const onLogin = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage(null);

// Create an object with user credentials
    const loginCredentials: LoginCredentials = {
      email: emailValue,
      password: passwordValue,
    };

    try {
// API call to try to connect
      const response: AxiosResponse<LoginResponse> = await login(loginCredentials);
// In case of success, uptade the response message
      setResponseMessage(response.data.message);
    } catch (err) {
// Error update in case of connection failure
      setError("Impossible de vous connecter. Veuillez vérifier vos informations d'identification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="connection-section">
      <div>
        <h1 className="connection-title">Connexion</h1>
        <p>Connectez-vous pour accéder à votre espace personnel.</p>
        <form action="">
          <div className="mail">
            <input 
              type="email" 
              placeholder="exemple@domaine.com" 
              value={emailValue} 
              onChange={emailChange} 
              required 
            />
          </div>
          <div className="mdp">
            <input 
              type="password" 
              placeholder="Mot de passe" 
              value={passwordValue} 
              onChange={passwordChange} 
              required 
            />
          </div>
          <div>
            <input 
              type="checkbox" 
              id="checkbox" 
              checked={stayConnected} 
              onChange={stayConnectedChange} 
            />
            <label htmlFor="checkbox">Rester connecté</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          <button 
            className="button-connexion" 
            type="button" 
            onClick={onLogin} 
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Connexion'}
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
            Réinitialiser le mot de passe
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ConnectionPage;
