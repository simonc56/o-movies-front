import { Button, Checkbox, Menu } from '@mantine/core';

function InputSortByPageMovies({ onPageChange, value }: { onPageChange: (sortBy: string) => void; value: string }) {
  const handleChange = (sortBy: string) => {
    onPageChange(sortBy);
  };
  const sortBy = [
    { key: 'popularity.desc', label: 'Popularité décroissante' },
    { key: 'popularity.asc', label: 'Popularité croissante' },
    { key: 'release_date.desc', label: 'Date de sortie décroissante' },
    { key: 'release_date.asc', label: 'Date de sortie croissante' },
    { key: 'revenue.desc', label: 'Revenu décroissant' },
    { key: 'revenue.asc', label: 'Revenu croissant' },
    { key: 'primary_release_date.desc', label: 'Date de sortie initiale décroissante' },
    { key: 'primary_release_date.asc', label: 'Date de sortie initiale croissante' },
    { key: 'title.desc', label: 'Titre décroissant' },
    { key: 'title.asc', label: 'Titre croissant' },
  ];
  return (
    <Menu transitionProps={{ transition: 'pop-top-right' }} position="bottom-end" width={220} closeOnItemClick={false}>
      <Menu.Target>
        <Button variant="outline" color="bg" style={{ marginLeft: '1.5rem', marginTop: '1.5rem' }}>
          Trier par
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {sortBy.map((sortOption) => (
          <Menu.Item key={sortOption.key} onClick={() => handleChange(sortOption.key)}>
            <Checkbox
              size="sm"
              color="bg"
              label={sortOption.label}
              checked={value === sortOption.key}
              onChange={() => handleChange(sortOption.key)}
            />
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default InputSortByPageMovies;
