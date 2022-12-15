import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	LOGIN_URL,
	REGISTER_URL,
	UPDATE_USER_URL,
	UPLOAD_USER_AVATAR
} from '../utils/Constant';

const initialState = {
	users: {},
	loginError: '',
	registerError: '',
	error: '',
	open: false,
	loading: false
};

export const login = createAsyncThunk('users/login', async (data, thunkAPI) => {
	try {
		const response = await axios.post(LOGIN_URL, data);
		return response.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data.Error);
	}
});

export const updateUserInfo = createAsyncThunk(
	'users/update',
	async (data, thunkAPI) => {
		try {
			const response = await axios.post(UPDATE_USER_URL, data);

			return response.data.user;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);

export const uploadUserAvatar = createAsyncThunk(
	'users/uploadAvatar',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(UPLOAD_USER_AVATAR, data);

			return response.data.user;
		} catch (err) {
			return rejectWithValue(err.response.data.Error);
		}
	}
);

export const register = createAsyncThunk(
	'users/register',
	async (data, thunkAPI) => {
		try {
			const response = await axios.post(REGISTER_URL, data);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.Error);
		}
	}
);
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
