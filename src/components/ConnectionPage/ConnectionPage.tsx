import { Anchor, Button, Center, Checkbox, Group, PasswordInput, Text, TextInput, Tooltip, rem } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { actionLogin, editEmail, editPassword } from '../../features/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './ConnectionPage.scss';

interface LoginResponse {
  message: string;
}

function ConnectionPage() {
  const dispatch = useAppDispatch();
  const emailValue = useAppSelector((state) => state.settings.user.email);
  const passwordValue = useAppSelector((state) => state.settings.user.password);
  const successMessage = useAppSelector((state) => state.settings.successMessage);
  const errorMessage = useAppSelector((state) => state.settings.errorMessage);
  const [stayConnected, setStayConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      setLoading(false);
      setTimeout(() => {
        navigate('/'); // Redirect to the home page after successful login
      }, 3000);
    }
    if (errorMessage) setLoading(false);
  }, [successMessage, errorMessage, navigate]);

  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(editEmail(event.target.value));
  };

  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(editPassword(event.target.value));
  };

  const stayConnectedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStayConnected(event.target.checked);
  };

  // Handler for form submission
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    dispatch(actionLogin());
  };

  // Tooltip for additional information
  const rightSection = (
    <Tooltip
      label="Nous stockons vos données en toute sécurité"
      position="top-end"
      withArrow
      transitionProps={{ transition: 'pop-bottom-right' }}
    >
      <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
        <Center>
          <IconInfoCircle style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <section className="connection-section">
      <div className="card">
        <h1 className="connection-title">Connexion</h1>
        <p className="connection-description">Connectez-vous pour accéder à votre espace personnel.</p>
        <form className="connection-form" onSubmit={onSubmit}>
          <TextInput
            label="Email"
            placeholder="exemple@domaine.com"
            type="email"
            value={emailValue}
            onChange={emailChange}
            rightSection={rightSection}
            required
            className="connection-input"
          />

          <PasswordInput
            label="Mot de passe"
            required
            placeholder="Mot de passe"
            value={passwordValue}
            onChange={passwordChange}
            className="connection-input"
            mt="md"
          />

          <Checkbox label="Rester connecté" checked={stayConnected} onChange={stayConnectedChange} mt="md" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="response-message">{successMessage}</p>}
          <div className="button-container">
            <Button type="submit" color="bg" autoContrast loading={loading} mt="md">
              Se connecter
            </Button>
          </div>
        </form>
        <Group mt="md">
          <div className="link-container">
            <Anchor
              component={Link}
              to="/réinitialisation-email"
              pt={2}
              fw={500}
              fz="sm"
              className="link-reinitiate"
              style={{ color: 'blue', marginRight: '1rem', marginLeft: '1rem' }}
            >
              {' '}
              Mot de passe oublié?
            </Anchor>
            <Anchor
              component={Link}
              to="/inscription"
              pt={2}
              fw={500}
              fz="sm"
              className="link-signUp"
              style={{ color: 'blue', marginLeft: '1rem', marginRight: '1rem' }}
            >
              Créer un compte
            </Anchor>
          </div>
        </Group>
      </div>
    </section>
  );
}

export default ConnectionPage;
