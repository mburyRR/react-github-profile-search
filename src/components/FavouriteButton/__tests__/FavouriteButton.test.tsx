import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { FavouriteButton } from '../FavouriteButton';
import { FavouriteButtonProps } from '../FavouriteButton.types';

const setup = ({
  isAddedToFavourites = false,
  onAddToFavourites = () => {},
}: Partial<FavouriteButtonProps>) =>
  render(
    <FavouriteButton
      isAddedToFavourites={isAddedToFavourites}
      onAddToFavourites={onAddToFavourites}
    />,
  );

describe('FavouriteButton', () => {
  it('should fire proper event after clicking on "favourites" button', async () => {
    const onAddToFavourites = jest.fn();

    setup({ onAddToFavourites });

    const favouriteButton = screen.getByTestId('favourite-button');

    fireEvent.click(favouriteButton);

    expect(onAddToFavourites).toBeCalledTimes(1);
  });

  it('should render outlined star button', async () => {
    setup({});

    const icon1 = screen.getByTestId('star-border-outlined');
    const icon2 = screen.queryByTestId('star-filled');

    expect(icon1).toBeInTheDocument();
    expect(icon2).not.toBeInTheDocument();
  });

  it('should render filled star button', async () => {
    setup({ isAddedToFavourites: true });

    const icon1 = screen.queryByTestId('star-border-outlined');
    const icon2 = screen.getByTestId('star-filled');

    expect(icon2).toBeInTheDocument();
    expect(icon1).not.toBeInTheDocument();
  });
});
