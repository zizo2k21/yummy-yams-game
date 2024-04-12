import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface UserState {
  email: string;
  username: string;
  password: string;
  nbr_games: number;
  winner: string[];
token?: string
role?: string
}

const initialState: UserState = {
  email: '',
  username: '',
  password: '',
  nbr_games: 0,
  winner: [],
  token: '',
  role: 'user'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },

    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

