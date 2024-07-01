import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../../customRender';

import HomePage from '../../../components/Homepage/Homepage';

describe('HomePage Component', () => {
  it('Should render the homepage', () => {
    // je génère le rendu de mon composant <HomePage />
    render(
      <MantineProvider>
        <HomePage />
      </MantineProvider>
    );

    // je m'attends à avoir un titre nommé Actualités
    // https://testing-library.com/docs/queries/about
    expect(screen.getByRole('heading', { name: 'Actualités' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Bienvenue sur votre site dédié aux passionnés de cinéma !' })
    ).toBeInTheDocument();

    // je vérifie que je dispose bien d'un lien contenant le texte
    // "Garfield" menant vers la page du film
    const link = screen.getByRole('link', { name: 'Garfield' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/films/748783');
  });
});
