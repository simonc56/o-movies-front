import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Group,
  MantineColor,
  PasswordInput,
  Text,
  TextInput,
  Tooltip,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/settingsApiSlice';
import { login } from '../../features/settingsSlice';
import { useAppDispatch } from '../../store/hooks';
import './ConnectionPage.scss';

function ConnectionPage() {
  const [doLogin, { data: loginData, error: loginError, isSuccess: loginIsSuccess, isError: loginIsError }] =
    useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayConnected, setStayConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      dispatch(login(loginData));
      notifications.show({
        id: 'login-success',
        withCloseButton: true,
        autoClose: 5000,
        title: 'Vous êtes connecté',
        message: `Bienvenue ${loginData.firstname}, vous êtes chez vous !`,
        color: 'green' as MantineColor,
        icon: <IconCheck />,
        loading: false,
      });
      // redirect to homepage after successful login after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000); // in ms (1000=1s)
    }
    if (loginIsError) {
      let errorMessage;
      const { data } = loginError as { data: string };
      if (data === 'Network Error') {
        errorMessage = 'Veuillez vérifier votre connexion Internet.';
      } else {
        errorMessage = "Veuillez vérifier vos informations d'identification.";
      }
      notifications.show({
        id: 'login-error',
        withCloseButton: true,
        autoClose: 5000,
        title: 'Impossible de se connecter',
        message: errorMessage,
        color: 'red' as MantineColor,
        icon: <IconX />,
        loading: false,
      });
    }
  }, [loginIsSuccess, loginIsError, navigate, loginData, loginError, dispatch]);

  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const stayConnectedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStayConnected(event.target.checked);
  };

  // Handler for form submission
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await doLogin({ email, password, stayConnected });
    setLoading(false);
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
            value={email}
            onChange={emailChange}
            rightSection={rightSection}
            required
            className="connection-input"
          />

          <PasswordInput
            label="Mot de passe"
            required
            placeholder="Mot de passe"
            value={password}
            onChange={passwordChange}
            className="connection-input"
            mt="md"
          />

          <Checkbox label="Rester connecté" checked={stayConnected} onChange={stayConnectedChange} mt="md" />
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
