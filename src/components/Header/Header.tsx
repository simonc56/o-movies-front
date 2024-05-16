import { Box, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-pop-corn.png';
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

  const items = links.map((link) => {
    return (
      <NavLink key={link.label} to={link.link} className="link" onClick={(event) => event.preventDefault()}>
        {link.label}
      </NavLink>
    );
  });

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
          <Burger opened={drawerOpened} onClick={toggleDrawer} size="md" hiddenFrom="md" color="yellow" />
        </Group>
      </header>
    </Box>
  );
}

export default Header;
