import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  id: number;
  avatar?: string;
  email: string;
  accessToken: string;
}

const authData: AuthState = {
  id: 0,
  email: '',
  accessToken: '',
};

export const slice = createSlice({
  name: 'auth',
  initialState: {
    authData: authData,
  },
  reducers: {
    removeAuth: state => {
      state.authData = authData;
    },
    addAuth: (state, action: PayloadAction<AuthState>) => {
      state.authData = {...action.payload};
    },
  },
});

export const {addAuth, removeAuth} = slice.actions;
export default slice.reducer;
