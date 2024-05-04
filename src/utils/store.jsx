import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { CustomizerReducer, userReducer } from './constants';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'appSettings',
    storage,
};

const rootReducer = combineReducers({
    customizer: CustomizerReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});
  
export const persistor = persistStore(store);