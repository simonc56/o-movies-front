import { useState } from 'react';
import SimpleButton from '../SimpleButton/SimpleButton';
import './SignupPage.scss';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // API , Base de donnée ??!!
    if (password === confirmPassword) {
      // API
    } else {
      // Erreur
      setPasswordsMatch(false);
    }
  };

  return (
    <section className="signup-section">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">INSCRIPTION A O'MOVIES</h1>
        <input
          type="text"
          className="signup-input signup-username"
          placeholder="Votre nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="birthday" className="birthday-label">
          Date de naissance:
        </label>
        <input
          id="birthday"
          className="signup-input signup-birthday"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input
          type="text"
          className="signup-input signup-country"
          placeholder="Pays"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="text"
          className="signup-input signup-city"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="email"
          className="signup-input signup-email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="signup-input signup-password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="signup-input signup-confirm-password"
          placeholder="Confirmer votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {!passwordsMatch && <p className="error-message">Les mots de passe ne correspondent pas</p>}
        <SimpleButton label="S'inscrire" />
      </form>
    </section>
  );
}

export default SignupPage;
