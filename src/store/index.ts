import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./modules/auth/reducer";

const persistedAuthReducer = persistReducer(
  {
    key: "@hublocal/auth-reducer",
    storage,
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);

export type StoreType = ReturnType<typeof store.getState>;
