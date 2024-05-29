import { Avatar, Group, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { UserType } from '../../@types/SettingsState';

type AvatarNameProps = { user: UserType; color: string; chevron?: boolean };

function AvatarName({ user, color, chevron = true }: AvatarNameProps) {
  const shortFullname = `${user.firstname} ${user.lastname.slice(0, 1)}.`;

  return (
    <Group justify="center">
      <Avatar color={color} radius="xl" />
      <div>
        <Text c={color} size="md" fw={500}>
          {shortFullname}
        </Text>
        <Text c={color} size="sm" fw={100}>
          {user.email}
        </Text>
      </div>
      {chevron && <IconChevronDown stroke={1.5} />}
    </Group>
  );
}

export default AvatarName;
