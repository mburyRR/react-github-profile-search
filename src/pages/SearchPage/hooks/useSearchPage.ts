import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import { FilterOptionsState } from '@mui/material/useAutocomplete';
import useGithubContext from '@store/GithubContext';
import { fetchGithubUsers } from '@store/services';
import { UserList, UserListItem } from '@store/types';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventType } from '../SearchPage.types';

export const useSearchPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<UserListItem | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [favouriteUsers, setFavouriteUsers] = useState<UserList>([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const { setUserList, appendUserList, setError, userList } =
    useGithubContext();

  useEffect(() => {
    const storedFavouriteUsers =
      getLocalStorageItem<UserList>(FAVOURITE_USERS_STORAGE) ?? [];
    setFavouriteUsers(storedFavouriteUsers);
  }, []);

  const fetchUserList = async (input?: string) => {
    try {
      const data = await fetchGithubUsers(input ?? inputValue);

      setUserList(data.items);
      setTotalUsers(data.total_count);
      setPage(1);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
    }
  };

  const fetchMoreUsers = async () => {
    try {
      const data = await fetchGithubUsers(inputValue, page + 1);

      appendUserList(data.items);
      setPage(page + 1);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
    }
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(fetchUserList, 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  const handleChange = (
    _e: EventType,
    newValue: string | UserListItem | null,
  ) => {
    setValue(newValue as UserListItem);
  };

  const handleInputChange = (_e: EventType, newInputValue: string) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 2) {
      debouncedChangeHandler(newInputValue);
    } else {
      setPage(0);
      setUserList([]);
    }
  };

  const handleSelectUser = (user: UserListItem) => {
    navigate(`/user/${user.login}`);
  };

  const handleAddToFavourites = (user: UserListItem) => {
    if (
      favouriteUsers.some((favUser: UserListItem) => favUser.id === user.id)
    ) {
      const newFavourites = favouriteUsers.filter(
        (key: UserListItem) => key.id !== user.id,
      );

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    } else {
      const newFavourites = [...favouriteUsers, user];

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    }
  };

  const getFilteredOptions = (
    users: UserList,
    state: FilterOptionsState<UserListItem>,
  ) => (state.inputValue.length > 2 ? users : []);

  const getOptionLabel = (option: string | UserListItem) =>
    typeof option === 'string' ? option : option?.login;

  return {
    setUserList,
    appendUserList,
    setError,
    userList,
    totalUsers,
    page,
    value,
    inputValue,
    favouriteUsers,
    fetchUserList,
    fetchMoreUsers,
    handleChange,
    handleInputChange,
    handleSelectUser,
    handleAddToFavourites,
    getFilteredOptions,
    getOptionLabel,
  };
};
