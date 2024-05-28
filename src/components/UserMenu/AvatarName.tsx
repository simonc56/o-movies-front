import { Avatar, Group, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

function AvatarName({ color, chevron = true }: { color: string; chevron?: boolean }) {
  return (
    <Group justify="center">
      <Avatar color={color} radius="xl" />
      <div>
        <Text c={color} size="md" fw={500}>
          Bernard T.
        </Text>
        <Text c={color} size="sm" fw={100}>
          b.tapie@gmail.com
        </Text>
      </div>
      {chevron && <IconChevronDown stroke={1.5} />}
    </Group>
  );
}

export default AvatarName;
