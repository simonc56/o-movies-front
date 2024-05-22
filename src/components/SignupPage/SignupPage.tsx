import axios from 'axios';
import { useState } from 'react';
import { register } from '../../api';
import SimpleButton from '../SimpleButton/SimpleButton';
import PasswordWithToggle from '../PasswordWithToggle/PasswordWithToggle';
import './SignupPage.scss';

function SignupPage() {
  const [form, setForm] = useState({
    lastname: '',
    username: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (form.password === form.confirmPassword) {
      setPasswordsMatch(true);
      setApiError('');
      setSuccessMessage('');

      try {
        const { username, lastname, birthday, email, password } = form;
        const credentials = {
          firstname: username,
          lastname,
          birthdate: birthday,
          email,
          password,
        };

        const response = await register(credentials);
        console.log(response.data);
        setSuccessMessage('Inscription réussie !');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setApiError(`Erreur: ${error.response?.data.error || 'Inscription échouée'}`);
        } else {
          setApiError('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
      }
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
            name="lastname"
            className="signup-input signup-lastname"
            placeholder="Votre nom"
            value={form.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="username"
            className="signup-input signup-username"
            placeholder="Votre prénom"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="birthday" className="birthday-label">Date de naissance:</label>
          <input
            id="birthday"
            name="birthday"
            className="signup-input signup-birthday"
            type="date"
            value={form.birthday}
            onChange={handleChange}
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
            name="email"
            className="signup-input signup-email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <PasswordWithToggle
            name="password"
            placeholder="Mot de passe"
            className="signup-password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <PasswordWithToggle
            name="confirmPassword"
            placeholder="Confirmer votre mot de passe"
            className="signup-confirm-password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordsMatch && <p className="error-message">Les mots de passe ne correspondent pas</p>}
        </div>
        <div className="button-container">
        <SimpleButton type="submit" label="S'inscrire" />
        </div>
        {apiError && <p className="error-message">{apiError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </section>
  );
}

export default SignupPage;