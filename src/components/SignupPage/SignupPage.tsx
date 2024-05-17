import { useState } from 'react';
import SimpleButton from '../SimpleButton/SimpleButton';
import './SignupPage.scss';

function SignupPage() {
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password === confirmPassword) {
      // API
    } else {
      setPasswordsMatch(false);
    }
  };


  return (
    <section className="signup-section">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">INSCRIPTION A O'MOVIES</h1>
        <div className="input-container">
          <input
            type="text"
            className="signup-input signup-lastname"
            placeholder="Votre nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            className="signup-input signup-username"
            placeholder="Votre prénom"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="birthday" className="birthday-label">Date de naissance:</label>
          <input
            id="birthday"
            className="signup-input signup-birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
          
        </div>        
      {/* Mis de coter pour le moment 
      <div className="input-container">
          <input 
            type="text" 
            className="signup-input signup-country"
            placeholder="Pays" 
            value={country} 
            onChange={(e) => setCountry(e.target.value)} 
            required 
          />
  </div> 
        <div className="input-container"> 
          <input 
            type="text" 
            className="signup-input signup-city"
            placeholder="Ville" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            required 
          />
  </div> */}
         <div className="input-container">
          <input
            type="email"
            className="signup-input signup-email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="signup-input signup-password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="signup-input signup-confirm-password"
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {!passwordsMatch && <p className="error-message">Les mots de passe ne correspondent pas</p>}
        </div>
        <div className="button-container">
          <button type="submit">S'inscrire</button>
        </div>
        {apiError && <p className="error-message">{apiError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </section>
  );
}

export default SignupPage;