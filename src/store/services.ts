import { GITHUB_BASE_URL } from '@common/constants';

export const fetchGithubUsers = async (query: string, page = 1) => {
  try {
    const response = await fetch(
      `${GITHUB_BASE_URL}/search/users?q=${query}&type=user&page=${page}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchGithubUser = async (login?: string) => {
  try {
    const response = await fetch(`${GITHUB_BASE_URL}/users/${login}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
