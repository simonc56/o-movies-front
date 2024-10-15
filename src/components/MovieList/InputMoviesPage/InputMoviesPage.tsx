import { NumberInput } from '@mantine/core';

function InputPageMovies({ onPageChange, value }: { onPageChange: (page: number) => void; value: number }) {
  const handleChange = (inputValue: string | number) => {
    if (typeof inputValue === 'number') {
      onPageChange(inputValue);
    }
  };
  return (
    <NumberInput
      placeholder="Un numéro de page"
      label="Numéro de page"
      min={1}
      max={10}
      value={value}
      onChange={handleChange}
      color="bg"
      style={{ width: '100px' }}
    />
  );
}

export default InputPageMovies;
