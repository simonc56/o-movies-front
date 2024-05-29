import { Menu, UnstyledButton } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import AvatarName from './AvatarName';
import './UserMenu.scss';

function UserMenu() {
  // const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useAppSelector((state) => state.settings.user);

  return (
    <Menu
      width={200}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      // onClose={() => setUserMenuOpened(false)}
      // onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className="userMenu">
          <AvatarName user={user} color="links" />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser stroke={1.5} />} component={Link} to="/profil">
          Mon profil
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout stroke={1.5} />} component={Link} to="/logout">
          Déconnexion
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
