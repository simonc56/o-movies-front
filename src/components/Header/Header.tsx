import { Box, Burger, Button, Divider, Drawer, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo-pop-corn.webp';
import LoginSignup from '../LoginSignup/LoginSignup';
import Searchbar from '../Searchbar/Searchbar';
import './Header.scss';

const links = [
  { link: '/actuellement', label: "A l'affiche" },
  { link: '/prochainement', label: 'Prochainement' },
  { link: '/films', label: 'Films' },
  // { link: '/playlists', label: 'Mes playlists' },
];

function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const items = links.map((link) => (
    <NavLink key={link.label} to={link.link} className="link" onClick={(event) => event.preventDefault()}>
      {link.label}
    </NavLink>
  ));

  const drawerItems = links.map((link) => (
    <NavLink key={link.label} to={link.link} className="drawerLink" onClick={(event) => event.preventDefault()}>
      {link.label}
    </NavLink>
  ));

  return (
    <Box size="md">
      <header className="header">
        <Group justify="space-between" h="100%">
          <div className="title">
            <img src={logo} alt="logo o'movies" />
            <h1>O'movies</h1>
          </div>
          <Group gap={0} visibleFrom="md">
            {items}
          </Group>
          <Group gap={0} visibleFrom="md">
            <Searchbar />
            <LoginSignup />
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

        <Group justify="center" grow pb="xl" px="md">
          <Button variant="default" component={Link} to="/connexion">
            Connexion
          </Button>
          <Button color="primary" autoContrast component={Link} to="/inscription">
            Inscription
          </Button>
        </Group>
      </Drawer>
    </Box>
  );
}

export default Header;
