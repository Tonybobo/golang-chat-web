import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN_URL, REGISTER_URL } from '../utils/Constant';

const initialState = {
	users: {},
	loginError: '',
	registerError: '',
	open: false
};

export const login = createAsyncThunk('users/login', async (data, thunkAPI) => {
	try {
		const response = await axios.post(LOGIN_URL, data);
		return response.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data.Error);
	}
});

export const register = createAsyncThunk(
	'users/register',
	async (data, thunkAPI) => {
		try {
			const response = await axios.post(REGISTER_URL, data);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
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
	}
});

export const { openDrawer, closeDrawer } = userSlice.actions;
export default userSlice.reducer;
