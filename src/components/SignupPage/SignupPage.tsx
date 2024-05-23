import axios from 'axios';
import { useState } from 'react';
/* here the next two lines are for the force password */
import { Box, Progress, PasswordInput, Group, Text, Center } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react'; 
//
import { register } from '../../api';
import SimpleButton from '../SimpleButton/SimpleButton';

import './SignupPage.scss';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /.{8,}/, label: 'Avoir au moins 8 caractères' },
  { re: /[0-9]/, label: 'Inclure au moins un chiffre' },
  { re: /[a-z]/, label: 'Inclure au moins une lettre minuscule' },
  { re: /[A-Z]/, label: 'Inclure au moins une lettre majuscule' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Inclure au moins un symbole spécial' },
];

function getStrength(password: string) {
  let multiplier = password.length > 8 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

function SignupPage() {
  const [form, setForm] = useState({
    lastname: '',
    username: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
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
          setApiError("Erreur lors de l'inscription. Veuillez réessayer.");
        }
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  const strength = getStrength(form.password);
  const checks = requirements.map((requirement) => (
    <PasswordRequirement key={requirement.label} label={requirement.label} meets={requirement.re.test(form.password)} />
  ));

  const bars = ['bar-1', 'bar-2', 'bar-3', 'bar-4'].map((barKey, index) => {
    let value;
    if (form.password.length > 0 && index === 0) {
      value = 100;
    } else if (strength >= ((index + 1) / 4) * 100) {
      value = 100;
    } else {
      value = 0;
    }

    let color;
    if (strength > 80) {
      color = 'teal';
    } else if (strength > 50) {
      color = 'yellow';
    } else {
      color = 'red';
    }

    return (
      <Progress styles={{ section: { transitionDuration: '0ms' } }} value={value} color={color} key={barKey} size={4} />
    );
  });

  return (
    <section className="signup-section">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Inscription</h1>
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
          <label htmlFor="birthday" className="birthday-label">
            Date de naissance:
          </label>
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
          <PasswordInput
            name="password"
            placeholder="Mot de passe"
            className="signup-password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirmer votre mot de passe"
            className="signup-confirm-password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordsMatch && (
            <p className="error-message" style={{ color: 'red' }}>
              Les mots de passe ne correspondent pas
            </p>
          )}
        </div>
        <div className="strength-meter">
          <Group gap={5} grow mt="xs" mb="md">
            {bars}
          </Group>
          {checks}
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
