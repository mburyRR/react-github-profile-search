import { User } from '@store/types';
export interface UserCardProps {
  user: User;
  isAddedToFavourites: boolean;
  onAddToFavourites: () => void;
}
