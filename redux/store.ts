import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
    FLUSH, PAUSE,
    PERSIST, persistReducer, PURGE,
    REGISTER, REHYDRATE
} from "redux-persist";
import { productApi } from "./api";
import { onBoardReducer } from "./onBoardSlice";
import { userReducer } from './userSlice';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['productApi','user'], //from rootReducers
}

const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
    blacklist: ['isLogin'], 
}

const rootReducers = combineReducers({
    [productApi.reducerPath]: productApi.reducer,
    onboard: onBoardReducer,
    user: persistReducer(userPersistConfig, userReducer),
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),
})

setupListeners(store.dispatch)

export default store