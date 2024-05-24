import axios from 'axios';
import { useState } from 'react';
import { PasswordInput, Group, Center, TextInput, Progress } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api';
import SimpleButton from '../SimpleButton/SimpleButton';
import './SignupPage.scss';

// to use French locale for birthdate calendars
dayjs.locale('fr');

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <div style={{ color: meets ? 'teal' : 'red', marginTop: 5, fontSize: '0.875rem' }}>
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <span style={{ marginLeft: 7 }}>{label}</span>
      </Center>
    </div>
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

interface FormState {
  firstName: string;
  lastName: string;
  birthday: Date | null;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupPage() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    birthday: null,
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setForm((prevForm) => ({ ...prevForm, birthday: date }));
  };

  // block number for name and last name
  const validateLetters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const lettersOnly = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

    if (lettersOnly.test(value)) {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };
  // reset form to initial state after succes
  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      birthday: null,
      email: '',
      password: '',
      confirmPassword: '',
    });
  };
  // form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if passwords match
    if (form.password === form.confirmPassword) {
      setPasswordsMatch(true);
      setApiError('');
      setSuccessMessage('');

      try {
        const { firstName, lastName, email, password, birthday } = form;
        const birthdateString = birthday ? birthday.toISOString().split('T')[0] : '';
        const credentials = {
          firstname: firstName,
          lastname: lastName,
          birthdate: birthdateString,
          email,
          password,
        };
        // register user with api
        const response = await register(credentials);
        console.log(response.data);
        setSuccessMessage('Inscription réussie !');
        resetForm();

        // redirect to home page after 7 seconds
        setTimeout(() => {
          navigate('/');
        }, 7000); // in ms (7000=7s)
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
  // calcul password strength
  const strength = getStrength(form.password);
  const checks = requirements.map((requirement) => (
    <PasswordRequirement key={requirement.label} label={requirement.label} meets={requirement.re.test(form.password)} />
  ));

  // bars for password strength meter
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

    return <Progress value={value} color={color} key={barKey} size={4} />;
  });

  return (
    <section className="signup-section">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Inscription</h1>
        <div className="form-container">
          <div className="left-column">
            <div className="input-container">
              <TextInput
                label="Votre prénom"
                placeholder="Alice"
                name="firstName"
                value={form.firstName}
                onChange={validateLetters} 
                required
                withAsterisk={false}
                style={{ width: '100%', maxWidth: '300px' }}
              />
            </div>
            <div className="input-container">
              <TextInput
                label="Votre nom"
                placeholder="Wonderland"
                name="lastName"
                value={form.lastName}
                onChange={validateLetters} 
                required
                withAsterisk={false}
                style={{ width: '100%', maxWidth: '300px' }}
              />
            </div>
            <div className="input-container">
              <DateInput
                value={form.birthday}
                onChange={handleDateChange}
                label="Date de naissance"
                placeholder="jj/mm/aaaa"
                required
                locale="fr"
                valueFormat="DD/MM/YYYY"
                withAsterisk={false}
                style={{ width: '100%', maxWidth: '300px' }}
              />
            </div>
            <div className="input-container">
              <TextInput
                type="email"
                label="Email"
                placeholder="alice.wonderland@lapinblanc.com"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                withAsterisk={false}
                style={{ width: '100%', maxWidth: '300px' }}
              />
            </div>
          </div>
          <div className="right-column">
            <div className="input-container">
              <PasswordInput
                label="Mot de passe"
                placeholder="Mot de passe"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                withAsterisk={false}
                style={{ width: '100%', maxWidth: '300px' }}
              />
            </div>
            <div className="input-container">
              <PasswordInput
                label="Confirmer votre mot de passe"
                placeholder="Confirmer votre mot de passe"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                withAsterisk={false}
                style={{ width: '100%', maxWidth: '300px' }}
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
          </div>
        </div>
        {apiError && <p className="error-message">{apiError}</p>}
        {successMessage && (
          <p className="success-message">
            {successMessage}
            <br />
            Redirection vers la page d'accueil dans 7 secondes...
          </p>
        )}
        <div className="button-container">
          <SimpleButton type="submit" label="S'inscrire" />
        </div>
      </form>
    </section>
  );
}

export default SignupPage;
