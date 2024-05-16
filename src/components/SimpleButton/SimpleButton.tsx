import { Button } from '@mantine/core';
import { useState } from 'react';

type SimpleButtonProps = {
  label: string;
  // eslint-disable-next-line react/require-default-props
  handleClick?: () => void;
};

function SimpleButton({ label, handleClick }: SimpleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onClick={handleClick}
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
