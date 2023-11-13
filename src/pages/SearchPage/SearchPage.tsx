/* eslint-disable @typescript-eslint/no-explicit-any */
import TempUserCard from '@assets/temporary-user-card.jpeg';
import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import AppBar from '@components/AppBar';
import CardOption from '@components/CardOption';
import { FilterOptionsState } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import React, { Children, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './SearchPage.styles';

export const mockedUserList = [
  {
    id: 1,
    name: 'Alex Terrible',
    login: 'AlexTerrible',
    email: 'alexterrible@gmail.com',
    avatarUrl: TempUserCard,
    bio: 'I program computers, and build teams that program computers...',
    followers: 4161,
    following: 15,
    totalRepos: 712,
  },
  {
    id: 2,
    name: 'Alex Veck',
    login: 'AlexVeck',
    email: 'alexterrible@gmail.com',
    avatarUrl: TempUserCard,
    bio: 'I program computers, and build teams that program computers...',
    followers: 4161,
    following: 15,
    totalRepos: 712,
  },
  {
    id: 3,
    name: 'Tommy Terrible',
    login: 'TommyTerrible',
    email: 'alexterrible@gmail.com',
    avatarUrl: TempUserCard,
    bio: 'I program computers, and build teams that program computers...',
    followers: 4161,
    following: 15,
    totalRepos: 712,
  },
  {
    id: 4,
    name: 'Hans Terrible',
    login: 'HansTerrible',
    email: 'alexterrible@gmail.com',
    avatarUrl: TempUserCard,
    bio: 'I program computers, and build teams that program computers...',
    followers: 4161,
    following: 15,
    totalRepos: 712,
  },
  {
    id: 5,
    name: 'Jay Terrible',
    login: 'JayTerrible',
    email: 'alexterrible@gmail.com',
    avatarUrl: TempUserCard,
    bio: 'I program computers, and build teams that program computers...',
    followers: 4161,
    following: 15,
    totalRepos: 712,
  },
];

export const SearchPage: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<any>(null);
  const [inputValue, setInputValue] = useState<any>('');
  const [favouriteUsers, setFavouriteUsers] = useState<any[]>([]);

  useEffect(() => {
    const storedFavouriteUsers =
      getLocalStorageItem<any>(FAVOURITE_USERS_STORAGE) ?? [];
    setFavouriteUsers(storedFavouriteUsers);
  }, []);

  const handleSelectUser = (user: any) => {
    navigate(`/user/${user.id}`);
  };

  const handleAddToFavourites = (user: any) => {
    if (favouriteUsers.some((favUser: any) => favUser.id === user.id)) {
      const newFavourites = favouriteUsers.filter(
        (key: any) => key.id !== user.id,
      );

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    } else {
      const newFavourites = [...favouriteUsers, user];

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    }
  };

  const filterOptions = (options: any[], state: FilterOptionsState<any>) => {
    if (state.inputValue.length > 2) {
      return options.filter((option) =>
        String(option.name)
          .toLowerCase()
          .includes(state.inputValue.toLowerCase()),
      );
    }
    return [];
  };

  return (
    <AppBar hasSearchField>
      <Autocomplete
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={mockedUserList}
        getOptionLabel={(user) => user.name}
        fullWidth
        freeSolo={inputValue?.length < 3 ? true : false}
        filterOptions={(users, state) => filterOptions(users, state)}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderInput={({ InputProps, InputLabelProps, ...params }) => (
          <S.InputBase
            {...InputProps}
            {...params}
            fullWidth
            placeholder="Search for GitHub users..."
            inputProps={{ ...params.inputProps, 'aria-label': 'search' }}
            endAdornment={null}
          />
        )}
        renderOption={(_props, user) => (
          <CardOption
            key={user.id}
            option={user}
            isAddedToFavourites={favouriteUsers.some(
              (favouriteUser: { id: any }) => favouriteUser.id === user.id,
            )}
            onSelect={handleSelectUser}
            onAddToFavourites={handleAddToFavourites}
          />
        )}
        PaperComponent={({ children }) => {
          const childrenObj = Children.toArray(children) as {
            props: {
              children?: string;
            };
          }[];
          const hasNoOptions =
            // eslint-disable-next-line react/prop-types
            childrenObj.map(({ props }) => props.children)?.[0] ===
            'No options';

          if (!hasNoOptions && inputValue?.length > 2) {
            return <S.Card>{children}</S.Card>;
          }
          return (
            <Stack mt={3} alignItems="center">
              <Typography variant="body2" fontSize={14}>
                No search results...
              </Typography>
            </Stack>
          );
        }}
      />
    </AppBar>
  );
};
