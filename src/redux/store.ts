import { combineReducers, configureStore } from '@reduxjs/toolkit';
import targetReducer from '../redux/slice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  target: targetReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers); // 추가

export default persistedReducer;
//---위에까지 persist--//

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
