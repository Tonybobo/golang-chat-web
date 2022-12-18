import { createSlice } from '@reduxjs/toolkit';
import {
	login,
	register,
	updateUserInfo,
	uploadUserAvatar
} from './actions/user';

const initialState = {
	users: {},
	loginError: '',
	registerError: '',
	error: '',
	open: false,
	loading: false
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		openDrawer(state) {
			state.open = true;
		},
		closeDrawer(state) {
			state.open = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.users = action.payload.data;
			state.loginError = '';
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginError = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.users = action.payload;
			state.registerError = '';
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerError = action.payload;
		});
		builder.addCase(updateUserInfo.fulfilled, (state, action) => {
			state.users = action.payload;
			state.loading = false;
		});
		builder.addCase(updateUserInfo.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(uploadUserAvatar.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
		});

		builder.addCase(uploadUserAvatar.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	}
});

export const { openDrawer, closeDrawer } = userSlice.actions;
export default userSlice.reducer;
