import {
	LOGIN_URL,
	REGISTER_URL,
	UPDATE_USER_URL,
	UPLOAD_USER_AVATAR
} from '../../utils/Constant';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const login = createAsyncThunk('users/login', async (data, thunkAPI) => {
	try {
		const response = await axios.post(LOGIN_URL, data);
		return response.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data.Error);
	}
});
