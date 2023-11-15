import { UserListFactoryItem } from '@store/__fixtures__/githubData';
import { UserList } from '@store/types';
import { act, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { UserPage } from '../UserPage';

const defaultUserListData: UserList = UserListFactoryItem.buildList(1);

const setup = () =>
  render(
    <BrowserRouter>
      <UserPage />
    </BrowserRouter>,
  );

describe('UserPage', () => {
  it('should fetch data on page load', async () => {
    const fakeResponse = defaultUserListData;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    setup();

    await act(async () => {
      await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(1));
    });
  });
});
