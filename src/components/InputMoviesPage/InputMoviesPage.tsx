import { NumberInput } from '@mantine/core';

function InputPageMovies({ onPageChange }: { onPageChange: (page: number) => void }) {
  const handleChange = (value: string | number) => {
    if (typeof value === 'number') {
      onPageChange(value);
    }
  };
  return (
    <NumberInput
      placeholder="Un numéro de page"
      label="Numéro de page"
      min={1}
      max={10}
      onChange={handleChange}
      color="bg"
    />
  );
}

export default InputPageMovies;
