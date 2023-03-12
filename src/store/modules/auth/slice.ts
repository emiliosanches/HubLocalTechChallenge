import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
}

type AuthState = {
  isLogged: boolean;
  token?: string;
  user?: User;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    token: undefined,
    user: undefined,
  } as AuthState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        user: User;
      }>
    ) => {
      state.isLogged = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLogged = false;
      state.token = undefined;
      state.user = undefined;
    },
  },
});
