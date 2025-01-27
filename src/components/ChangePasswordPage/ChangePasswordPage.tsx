import { Button, Group, PasswordInput, Progress } from '@mantine/core';
import axios from 'axios';
import {ChangeEvent, FormEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {getStrength, PasswordRequirement, requirements} from "../SignupPage/SignupPage";
import './ChangePasswordPage.scss';

interface FormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePasswordPage() {
  const [form, setForm] = useState<FormState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessagePsw] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // reset form to initial state after success
  const resetForm = () => {
    setForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if passwords match
    if (form.newPassword === form.confirmPassword) {
      setPasswordsMatch(true);
      setApiError('');
      setSuccessMessagePsw('');

      try {
        const { currentPassword, newPassword } = form;
        // Change password with API
        const response = await axios.post('/api/change-password', { currentPassword, newPassword });
        // eslint-disable-next-line no-console
        console.log(response.data);
        setSuccessMessagePsw('Mot de passe changé avec succès !');
        resetForm();

        // redirect to home page after 7 seconds
        setTimeout(() => {
          navigate('/profil');
        }, 7000); // in ms (7000=7s)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setApiError(`Erreur: ${error.response?.data.error || 'Changement de mot de passe échoué'}`);
        } else {
          setApiError('Erreur lors du changement de mot de passe. Veuillez réessayer.');
        }
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  // calculate password strength
  const strength = getStrength(form.newPassword);
  const checks = requirements.map((requirement) => (
    <PasswordRequirement
      key={requirement.label}
      label={requirement.label}
      meets={requirement.re.test(form.newPassword)}
    />
  ));

  // bars for password strength meter
  const bars = ['bar-1', 'bar-2', 'bar-3', 'bar-4'].map((barKey, index) => {
    let value;
    if (form.newPassword.length > 0 && index === 0) {
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
    <div className="change-password-page">
      <section className="change-password-section">
        <form onSubmit={handleSubmit} className="form-containerPsw">
          <h1 className="form-titlePsw">Changer de mot de passe</h1>
          <div className="input-containerPsw">
            <PasswordInput
              label="Mot de passe actuel"
              placeholder="Mot de passe actuel"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-containerPsw">
            <PasswordInput
              label="Nouveau mot de passe"
              placeholder="Nouveau mot de passe"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-containerPsw">
            <PasswordInput
              label="Confirmer le nouveau mot de passe"
              placeholder="Confirmer le nouveau mot de passe"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {!passwordsMatch && (
              <p className="error-messagePsw" style={{ color: 'red' }}>
                Les mots de passe ne correspondent pas
              </p>
            )}
          </div>
          <div className="strength-meterPsw">
            <Group gap={5} grow mt="xs" mb="md">
              {bars}
            </Group>
            {checks}
          </div>
          {apiError && <p className="error-messagePsw">{apiError}</p>}
          {successMessage && (
            <p className="success-messagePsw">
              {successMessage}
              <br />
              Redirection vers votre profil dans 7 secondes...
            </p>
          )}
          <div className="button-containerPsw">
            <Button type="submit" color="bg" autoContrast>
              Changer le mot de passe
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ChangePasswordPage;
