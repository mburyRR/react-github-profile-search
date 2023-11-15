import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import AppBar from '@components/AppBar';
import CardOption from '@components/CardOption';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { FilterOptionsState } from '@mui/material/useAutocomplete';
import Stack from '@mui/system/Stack';
import useGithubContext from '@store/GithubContext';
import { fetchGithubUsers } from '@store/services';
import { UserList, UserListItem } from '@store/types';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import React, {
  Children,
  FC,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import * as S from './SearchPage.styles';
import {
  EventType,
  ListBoxProps,
  NullableUlElement,
  PaperComponentProps,
} from './SearchPage.types';

export const SearchPage: FC = () => {
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

  const handleChange = (
    _e: EventType,
    newValue: string | UserListItem | null,
  ) => {
    setValue(newValue as UserListItem);
  };

  const handleInputChange = (_e: EventType, newInputValue: string) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 2) {
      fetchUserList(newInputValue);
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

  const ListBoxComponent = forwardRef(
    (
      { children, ...rest }: ListBoxProps,
      ref: ForwardedRef<HTMLUListElement>,
    ) => {
      const innerRef = useRef<HTMLUListElement>(null);

      useImperativeHandle<NullableUlElement, NullableUlElement>(
        ref,
        () => innerRef.current,
      );

      return (
        <S.List {...rest} ref={innerRef} role="list-box">
          <InfiniteScroll
            height={320}
            dataLength={userList.length}
            next={fetchMoreUsers}
            hasMore={totalUsers !== null && userList.length < totalUsers}
            loader={<p>Loading...</p>}
            pullDownToRefresh
            pullDownToRefreshThreshold={75}
            refreshFunction={fetchUserList}
          >
            {children}
          </InfiniteScroll>
        </S.List>
      );
    },
  );

  const PaperComponent = (props: PaperComponentProps) => {
    const childrenObj = Children.toArray(props.children) as {
      props: {
        children?: string;
      };
    }[];
    const hasNoOptions =
      // eslint-disable-next-line react/prop-types
      childrenObj.map(({ props }) => props.children)?.[0] === 'No options';

    if (!hasNoOptions && inputValue?.length > 2) {
      return <S.Card>{props.children}</S.Card>;
    }
    return (
      <Stack mt={3} alignItems="center">
        <Typography variant="body2" fontSize={14}>
          No search results...
        </Typography>
      </Stack>
    );
  };

  return (
    <AppBar hasSearchField>
      <Autocomplete
        id="user-search"
        disableCloseOnSelect
        value={value}
        inputValue={inputValue}
        options={userList}
        onChange={handleChange}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        filterOptions={getFilteredOptions}
        fullWidth
        freeSolo={inputValue?.length < 3 ? true : false}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderInput={({ InputProps, InputLabelProps, ...params }) => (
          <S.InputBase
            {...InputProps}
            {...params}
            fullWidth
            placeholder="Search for GitHub users..."
            inputProps={{
              ...params.inputProps,
              'aria-label': 'search',
              'data-testid': 'input-field',
            }}
            endAdornment={null}
          />
        )}
        renderOption={(_props, user) => (
          <CardOption
            key={user.id}
            option={user}
            isAddedToFavourites={favouriteUsers.some(
              (favouriteUser: UserListItem) => favouriteUser.id === user.id,
            )}
            onSelect={handleSelectUser}
            onAddToFavourites={handleAddToFavourites}
          />
        )}
        ListboxComponent={ListBoxComponent}
        PaperComponent={PaperComponent}
      />
    </AppBar>
  );
};
