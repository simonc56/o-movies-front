import { ChangeEvent, useState } from 'react';
import './SignupPage.scss';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // API , Base de donnée ??!!
  };

  return (
    <section className="signup-section">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">FORMULAIRE D'INSCRIPTION A O'MOVIES</h1>
        <input
          type="text"
          placeholder="Votre nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="birthday">Date de naissance:</label>
        <input
          id="birthday"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input type="text" 
        placeholder="Pays" 
        value={country} 
        onChange={(e) => setCountry(e.target.value)} 
        required 
        />
        <input type="text" 
        placeholder="Ville" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        required 
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choissisez un mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </section>
  );
}

export default SignupPage;
