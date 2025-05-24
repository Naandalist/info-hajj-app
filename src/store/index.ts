import {configureStore} from '@reduxjs/toolkit';
import {hajiApi, newsApi} from '@/services';

export const store = configureStore({
  reducer: {
    [hajiApi.reducerPath]: hajiApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: gdm => gdm().concat(hajiApi.middleware, newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
