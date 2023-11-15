import { UserListFactoryItem } from '@store/__fixtures__/githubData';
import { UserList } from '@store/types';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SearchPage } from '../SearchPage';

const defaultUserListData: UserList = UserListFactoryItem.buildList(1);

const fakeResponse = defaultUserListData;
const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);

const setup = () =>
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>,
  );

describe('SearchPage', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data on input field update', async () => {
    setup();

    const input = screen.getByTestId('input-field');

    fireEvent.change(input, { target: { value: 'ale' } });
    fireEvent.change(input, { target: { value: 'alex' } });

    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(2));
    });
  });

  it('should not fetch data on input field update when number of characters is less then 3', async () => {
    setup();

    const input = screen.getByTestId('input-field');

    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: 'al' } });

    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(0));
    });
  });
});
