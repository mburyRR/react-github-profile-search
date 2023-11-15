import AppBar from '@components/AppBar';
import CardOption from '@components/CardOption';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import { UserListItem } from '@store/types';
import {
  Children,
  FC,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useSearchPage } from './hooks/useSearchPage';
import * as S from './SearchPage.styles';
import {
  ListBoxProps,
  NullableUlElement,
  PaperComponentProps,
} from './SearchPage.types';

export const SearchPage: FC = () => {
  const {
    userList,
    totalUsers,
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
  } = useSearchPage();

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
