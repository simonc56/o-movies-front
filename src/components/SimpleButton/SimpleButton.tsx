import { Button } from '@mantine/core';
import { useState } from 'react';

type SimpleButtonProps = {
  label: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
};

function SimpleButton({ label, onClick }: SimpleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onClick={onClick}
      color={isHovered ? 'bg' : 'primary'}
      autoContrast={!isHovered}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </Button>
  );
}

export default SimpleButton;
