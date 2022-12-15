import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USER_URL, SEARCH_URL, GROUP_LIST_URL } from '../utils/Constant';
import axios from 'axios';

const initialState = {
	open: false,
	friends: [],
	error: '',
	search: []
};

export const getFriends = createAsyncThunk(
	'panel/getFriends',
	async (data, thunkAPI) => {
		try {
			const { users } = thunkAPI.getState().users;
			const { data } = await axios.get(USER_URL + `friends?uid=${users.uid}`);
			const friends = data.data.map((element) => {
				element.type = 1;
				return element;
			});
			const response = await axios.get(GROUP_LIST_URL + `${users.uid}`);
			const groups = response.data.data[0].group.map((element) => {
				element.type = 2;
				return element;
			});
			return friends.concat(groups);
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);

export const searchUsersAndGroups = createAsyncThunk(
	'panel/search',
	async (data, thunkAPI) => {
		try {
			const response = await axios.get(SEARCH_URL + data);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);

const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		openAppDrawer(state) {
			state.open = true;
		},
		closeAppDrawer(state) {
			state.open = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getFriends.fulfilled, (state, action) => {
			state.friends = [];
			state.friends = [...action.payload];
			state.error = '';
		});
		builder.addCase(getFriends.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(searchUsersAndGroups.fulfilled, (state, action) => {
			state.search = [];
			let users = action.payload.data?.user ? action.payload.data?.user : [];
			let groups = action.payload.data?.group ? action.payload.data?.group : [];
			state.search = [...users, ...groups];
			state.error = '';
		});
		builder.addCase(searchUsersAndGroups.rejected, (state, action) => {
			state.error = action.payload;
		});
	}
});

export const { openAppDrawer, closeAppDrawer } = chatSlice.actions;
export default chatSlice.reducer;
