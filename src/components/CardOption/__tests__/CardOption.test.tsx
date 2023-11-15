import { UserListFactoryItem } from '@store/__fixtures__/githubData';
import { UserListItem } from '@store/types';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CardOption } from '../CardOption';
import { CardOptionProps } from '../CardOption.types';

const defaultUserData: UserListItem = UserListFactoryItem.build();

const setup = ({ onSelect = () => {} }: Partial<CardOptionProps>) =>
  render(
    <CardOption
      option={defaultUserData}
      isAddedToFavourites={false}
      onAddToFavourites={jest.fn()}
      onSelect={onSelect}
    />,
  );

describe('CardOption', () => {
  it('should fire proper event after clicking on option card', async () => {
    const onSelect = jest.fn();

    setup({ option: defaultUserData, onSelect });

    const cardOption = screen.getByTestId('card-option');

    fireEvent.click(cardOption);

    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(defaultUserData);
  });
});
