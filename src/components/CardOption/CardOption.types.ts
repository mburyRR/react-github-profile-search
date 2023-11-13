/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CardOptionProps {
  option: any;
  isAddedToFavourites: boolean;
  onSelect: (user: any) => void;
  onAddToFavourites: (user: any) => void;
}
