import { configureStore } from '@reduxjs/toolkit';
import rootApi from './rootApi';

export default configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
});
