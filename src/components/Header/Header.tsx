import { Box, Burger, Button, Divider, Drawer, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo-pop-corn.webp';
import { useAppSelector } from '../../store/hooks';
import LoginSignup from '../LoginSignup/LoginSignup';
import Searchbar from '../Searchbar/Searchbar';
import AvatarName from '../UserMenu/AvatarName';
import UserMenu from '../UserMenu/UserMenu';
import './Header.scss';

const links = [
  { link: '/actuellement', label: "A l'affiche" },
  { link: '/prochainement', label: 'Prochainement' },
  { link: '/films', label: 'Films' },
  // { link: '/playlists', label: 'Mes playlists' },
];

function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const user = useAppSelector((state) => state.settings.user);

  const items = links.map((link) => (
    <NavLink key={link.label} to={link.link} className="link" onClick={(event) => event.preventDefault()}>
      {link.label}
    </NavLink>
  ));

  const drawerItems = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className="drawerLink"
      onClick={() => {
        closeDrawer();
      }}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Box size="md">
      <header className="header">
        <Group justify="space-between" h="100%">
          <Link to="/" className="title">
            <img src={logo} alt="logo o'movies" />
            <h1>O'movies</h1>
          </Link>
          <Group gap={0} visibleFrom="md">
            {items}
          </Group>
          <Group gap={0} visibleFrom="md">
            <Searchbar />
            {user.logged ? <UserMenu /> : <LoginSignup />}
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} size="md" hiddenFrom="md" color="primary" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="80%"
        padding="md"
        title="Menu"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <Divider my="md" />
        {drawerItems}
        <br />
        <Searchbar />
        <Divider my="xl" />
        {user.logged ? (
          <>
            <AvatarName color="bg" chevron={false} />
            <br />
            <Group justify="center" grow pb="xl" px="md">
              <Button
                variant="default"
                component={Link}
                to="/logout"
                onClick={() => {
                  closeDrawer();
                }}
              >
                Déconnexion
              </Button>
              <Button
                color="primary"
                darkHidden
                autoContrast
                component={Link}
                to="/profil"
                onClick={() => {
                  closeDrawer();
                }}
              >
                Mon profil
              </Button>
            </Group>
          </>
        ) : (
          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="default"
              component={Link}
              to="/connexion"
              onClick={() => {
                closeDrawer();
              }}
            >
              Connexion
            </Button>
            <Button
              color="primary"
              darkHidden
              autoContrast
              component={Link}
              to="/inscription"
              onClick={() => {
                closeDrawer();
              }}
            >
              Inscription
            </Button>
            <Button
              color="bg"
              lightHidden
              autoContrast
              component={Link}
              to="/inscription"
              onClick={() => {
                closeDrawer();
              }}
            >
              Inscription
            </Button>
          </Group>
        )}
      </Drawer>
    </Box>
  );
}

export default Header;
