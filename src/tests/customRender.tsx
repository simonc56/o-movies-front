/* eslint-disable import/no-extraneous-dependencies */
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { afterEach } from 'vitest';
import store from '../store/store';

afterEach(() => {
  cleanup();
});

// cette fonction ajoute autours du composant rendu un provider et un browser router
// pour que le composant ai accès au store et au routeur
function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {/* j'entoure mon composant à tester de Redux et Router */}
          {children}
        </BrowserRouter>
      </Provider>
    ),
    ...options,
  });
}

export { screen } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
