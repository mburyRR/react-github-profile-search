import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AppBar } from '../AppBar';
import { AppBarProps } from '../AppBar.types';

const setup = ({ hasSearchField = false }: Partial<AppBarProps>) =>
  render(
    <BrowserRouter>
      <AppBar hasSearchField={hasSearchField} isAddedToFavourites={false}>
        <div>Test</div>
      </AppBar>
    </BrowserRouter>,
  );

describe('AppBar', () => {
  it('should fire proper event after clicking on option card', async () => {
    setup({});

    const backButton = screen.getByTestId('back-button');

    fireEvent.click(backButton);

    expect(window.location.pathname).toBe('/');
  });

  it('should render back button', async () => {
    setup({});

    const icon1 = screen.getByTestId('back-button-icon');
    const icon2 = screen.queryByTestId('search-icon');

    expect(icon1).toBeInTheDocument();
    expect(icon2).not.toBeInTheDocument();
  });

  it('should render search button', async () => {
    setup({ hasSearchField: true });

    const icon1 = screen.queryByTestId('back-button-icon');
    const icon2 = screen.getByTestId('search-icon');

    expect(icon2).toBeInTheDocument();
    expect(icon1).not.toBeInTheDocument();
  });
});
