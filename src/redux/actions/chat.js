import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	USER_URL,
	SEARCH_URL,
	GROUP_LIST_URL,
	ADD_FRIEND_URL,
	GROUP_JOIN_URL,
	GROUP_CREATE_URL
} from '../../utils/Constant';
import axios from 'axios';

export const selectFirstFriends = createAsyncThunk(
	'panel/selectFirstFriends',
	async (data, thunkAPI) => {
		try {
			const { friends } = thunkAPI.getState().chats;
			return friends[0];
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);

export const getFriends = createAsyncThunk(
	'panel/getFriends',
	async (data, thunkAPI) => {
		try {
			const { users } = thunkAPI.getState().users;
			const { data } = await axios.get(USER_URL + `friends?uid=${users.uid}`);
			const friends = data.data?.map((element) => {
				element.type = 1;
				return element;
			});
			const response = await axios.get(GROUP_LIST_URL + `${users.uid}`);
			const groups = response.data?.data[0]?.group.map((element) => {
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
			let { user, group } = response.data.data;
			user = user
				? user.map((el) => {
						el.type = 1;
						return el;
				  })
				: [];
			group = group
				? group.map((el) => {
						el.type = 2;
						return el;
				  })
				: [];
			return [...user, ...group];
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);

export const addFriend = createAsyncThunk(
	'panel/addFriends',
	async (data, thunkAPI) => {
		try {
			const { users } = thunkAPI.getState().users;
			const { friendId, type } = data;
			if (type === 1) {
				const body = {
					uid: users.uid,
					friend_uid: friendId
				};
				const response = await axios.post(ADD_FRIEND_URL, body);
				return response.data.data;
			} else {
				const response = await axios.post(
					GROUP_JOIN_URL + users.uid + '/' + friendId
				);
				return response.data.data;
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);

export const createGroup = createAsyncThunk(
	'panel/createGroup',
	async (data, thunkAPI) => {
		try {
			const { users } = thunkAPI.getState().users;
			const response = await axios.post(GROUP_CREATE_URL + users.uid, {
				name: data.get('name')
			});
			return response.data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);
