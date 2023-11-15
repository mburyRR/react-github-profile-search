/* eslint-disable @typescript-eslint/no-var-requires */
import { UserListFactoryItem } from '@store/__fixtures__/githubData';
import { UserList } from '@store/types';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { FavouritesPage } from '../FavouritesPage';

const defaultUserListData: UserList = UserListFactoryItem.buildList(1);

const getLocalStorageItem = jest.spyOn(
  require('@utils/localStorage'),
  'getLocalStorageItem',
);

const setup = () =>
  render(
    <BrowserRouter>
      <FavouritesPage />
    </BrowserRouter>,
  );

describe('FavouritesPage', () => {
  it('should render "no favourite users" content', async () => {
    getLocalStorageItem.mockImplementation(() => []);
    setup();

    const noFavouriteUsersComponent = screen.getByTestId(
      'favourite-users-no-items',
    );

    expect(noFavouriteUsersComponent).toBeInTheDocument();
  });

  it('should render list of favourite users', async () => {
    getLocalStorageItem.mockImplementation(() => defaultUserListData);
    setup();

    const noFavouriteUsersComponent = screen.getByTestId(
      'favourite-users-list',
    );

    expect(noFavouriteUsersComponent).toBeInTheDocument();
  });
});
