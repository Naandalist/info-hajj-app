import { configureStore } from '@reduxjs/toolkit';
import { hajiApi } from '../services/hajiApi';

export const store = configureStore({
  reducer: {
    [hajiApi.reducerPath]: hajiApi.reducer,
  },
  middleware: (gdm) => gdm().concat(hajiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
