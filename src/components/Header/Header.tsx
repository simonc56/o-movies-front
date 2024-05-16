import { Burger, Container, Group } from '@mantine/core';
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
  { link: '/playlists', label: 'Mes playlists' },
];

function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    return (
      <NavLink key={link.label} to={link.link} className=".link" onClick={(event) => event.preventDefault()}>
        {link.label}
      </NavLink>
    );
  });

  return (
    <header className="header">
      <Container size="md">
        <div className="title">
          <img src={logo} alt="logo o'movies" />
          <h1>O'movies</h1>
        </div>
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        <Searchbar />
        <LoginSignup />
      </Container>
    </header>
  );
}

export default Header;
