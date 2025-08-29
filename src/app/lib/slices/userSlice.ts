/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserType } from '../../types/user';

interface UserState {
  registeredUsers: UserType[];
}

const initialState = {
  registeredUsers: [],
} satisfies UserState as UserState;

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<UserType>) => {
      state.registeredUsers.push(action.payload);
    },
  },
});

export const { registerUser } = userSlice.actions;
export default userSlice.reducer;
