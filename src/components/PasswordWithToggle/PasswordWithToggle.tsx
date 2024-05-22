import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, PasswordInputProps } from '@mantine/core';

type PasswordWithToggleProps = PasswordInputProps & {
  name: string;
};

const customStyles = {
  width: '30vh',
  cursor: 'pointer',   
};

function PasswordWithToggle({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  ...props
}: PasswordWithToggleProps) {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <PasswordInput
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      visible={visible}
      onVisibilityChange={toggle}
      required={required}
      label=""
      style={customStyles}
      {...props}
    />
  );
}

export default PasswordWithToggle;
