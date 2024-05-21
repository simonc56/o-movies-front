import { Button } from '@mantine/core';
import { useState } from 'react';

type SimpleButtonProps = {
  label: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

function SimpleButton({ label, onClick, ...props }: SimpleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onClick={onClick}
      color={isHovered ? 'bg' : 'primary'}
      autoContrast={!isHovered}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {label}
    </Button>
  );
}

SimpleButton.defaultProps = {
  type: 'button',
};

export default SimpleButton;
