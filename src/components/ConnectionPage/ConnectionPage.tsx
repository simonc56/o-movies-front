import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { LoginCredentials } from '../../@types/Credentials';
import { login } from '../../api';
import './ConnectionPage.scss';


interface LoginResponse {
  message: string;
// Ajoutez d'autres propriétés de réponse si nécessaire
}

function ConnectionPage() {
// État pour stocker les valeurs des champs de formulaire
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [stayConnected, setStayConnected] = useState(false);
  // État pour gérer le statut de chargement, les erreurs et les messages de réponse
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

// Gestionnaire de changement pour le champ email
  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
// Gestionnaire de changement pour le champ mot de passe
  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
// Gestionnaire de changement pour la case à cocher "Rester connecté"
  const stayConnectedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStayConnected(event.target.checked);
  };
// Fonction pour gérer la soumission du formulaire de connexion
  const onLogin = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage(null);

// Créer un objet contenant les informations d'identification de l'utilisateur
    const loginCredentials: LoginCredentials = {
      email: emailValue,
      password: passwordValue,
    };

    try {
// Appel API pour tenter de se connecter
      const response: AxiosResponse<LoginResponse> = await login(loginCredentials);
// Mise à jour du message de réponse en cas de succès
      setResponseMessage(response.data.message);
    } catch (err) {
// Mise à jour de l'erreur en cas d'échec de la connexion
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
