import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import * as S from '../pages/App.styles';
import FavouritesPage from './FavoritesPage';
import SearchPage from './SearchPage';
import UserPage from './UserPage';

const App: FC = () => {
  return (
    <S.App>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </S.App>
  );
};

export default App;
