import { Button } from '@mantine/core';

type SimpleButtonProps = {
  label: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
};

function SimpleButton({ label, onClick, type = 'button', ...props }: SimpleButtonProps) {
  return (
    <Button color="primary" autoContrast type={type} {...props}>
      {label}
    </Button>
  );
}

export default SimpleButton;
