import { UserListItem } from '@store/types';
export interface CardOptionProps {
  option: UserListItem;
  isAddedToFavourites: boolean;
  onSelect: (user: UserListItem) => void;
  onAddToFavourites: (user: UserListItem) => void;
}
