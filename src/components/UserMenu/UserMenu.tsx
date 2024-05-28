import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconLogout, IconUser } from '@tabler/icons-react';

import { Link } from 'react-router-dom';
import './UserMenu.scss';

function UserMenu() {
  // const [userMenuOpened, setUserMenuOpened] = useState(false);

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
          <Group>
            <Avatar color="links" radius="xl" />
            <div>
              <Text c="links" size="md" fw={500}>
                Bernard
              </Text>
              <Text c="links" size="sm" fw={100}>
                b.tapie@gmail.com
              </Text>
            </div>
            <IconChevronDown stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser stroke={1.5} />} component={Link} to="/profil">
          Mon profil
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout stroke={1.5} />}>Déconnexion</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
