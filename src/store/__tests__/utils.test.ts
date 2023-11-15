import { UserListResFactoryItem } from '@store/__fixtures__/githubData';

import { appendListData, mapUserListData } from '../utils';

const defaultUserListResData = UserListResFactoryItem.buildList(2);
const defaultUserListData = {
  id: defaultUserListResData[0].id,
  login: defaultUserListResData[0].login,
  avatarUrl: defaultUserListResData[0].avatar_url,
};

describe('The mapUserListData utility function', () => {
  it('should return mapped user list', () => {
    const results = mapUserListData([defaultUserListResData[0]]);

    expect(results).toEqual([defaultUserListData]);
  });

  it('should map appent user list data', () => {
    const results = appendListData(
      [defaultUserListResData[1]],
      [defaultUserListData],
    );

    expect(results).toEqual([
      defaultUserListData,
      {
        id: defaultUserListResData[1].id,
        login: defaultUserListResData[1].login,
        avatarUrl: defaultUserListResData[1].avatar_url,
      },
    ]);
  });
});
