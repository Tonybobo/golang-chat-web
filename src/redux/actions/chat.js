import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
	USER_URL,
	SEARCH_URL,
	GROUP_LIST_URL,
	ADD_FRIEND_URL,
	GROUP_JOIN_URL,
	GROUP_CREATE_URL,
	GROUP_UPLOAD_AVATAR_URL,
	GROUP_UPDATE_DETAIL,
	GROUP_MEMBER,
	MESSAGE_URL
} from '../../utils/Constant';
import axios from 'axios';
import dayjs from 'dayjs';

export const sendMsg = createAction('panel/sendMsg');

export const selectFirstFriends = createAsyncThunk(
	'panel/selectFirstFriends',
	async (_, thunkAPI) => {
		try {
			const { friends } = thunkAPI.getState().chats;
			const { users } = thunkAPI.getState().users;
			const firstFriend = Object.values(friends)[0];
			const request = {
				messageType: firstFriend.type,
				uid: users.uid,
				friendUid: firstFriend.uid
			};
			const response = await axios.post(MESSAGE_URL, request);
			const message = response.data?.data?.reverse();
			const pages = response.data?.pages;

			return {
				friend: firstFriend,
				data: message ?? [],
				pages: pages ?? 0
			};
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

			const friends = data.data
				? data.data.map((element) => {
						element.type = 1;
						return element;
				  })
				: [];

			const response = await axios.get(GROUP_LIST_URL + `${users.uid}`);

			const groups = response.data.data
				? response.data.data[0]?.group.map((element) => {
						element.type = 2;
						return element;
				  })
				: [];
			const hash = Object.assign(
				{},
				...friends.map((friend) => ({
					[friend.uid]: friend
				})),
				...groups.map((group) => ({ [group.uid]: group }))
			);

			return hash;
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
				const { data } = response.data;
				data.type = 1;
				return data;
			} else {
				const response = await axios.post(
					GROUP_JOIN_URL + users.uid + '/' + friendId
				);
				const { data } = response.data;
				data.type = 2;
				return data;
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

export const uploadGroupAvatar = createAsyncThunk(
	'panel/uploadGroupAvatar',
	async (data, thunkAPI) => {
		try {
			const { uid } = thunkAPI.getState().chats.selectUser;
			const response = await axios.post(GROUP_UPLOAD_AVATAR_URL + uid, data);
			response.data.data.type = 2;
			return response.data.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.Error);
		}
	}
);

export const updateGroupDetail = createAsyncThunk(
	'panel/editGroupDetail',
	async (data, thunkAPI) => {
		try {
			const { uid } = thunkAPI.getState().chats.selectUser;
			const response = await axios.post(GROUP_UPDATE_DETAIL + uid, data);
			response.data.data.type = 2;
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.Error);
		}
	}
);

export const getGroupMembers = createAsyncThunk(
	'panel/getGroupMembers',
	async (data, thunkAPI) => {
		const { uid } = thunkAPI.getState().chats.selectUser;
		const response = await axios.get(GROUP_MEMBER + uid);

		return response.data.data;
	}
);

export const selectFriend = createAsyncThunk(
	'panel/SelectFriend',
	async (data, thunkAPI) => {
		try {
			const { users } = thunkAPI.getState().users;
			const request = {
				messageType: data.type,
				uid: users.uid,
				friendUid: data.uid
			};

			const response = await axios.post(MESSAGE_URL, request);

			const message = response.data?.data?.reverse();
			const pages = response.data.pages;

			return {
				selectUser: data,
				data: message ?? [],
				pages: pages ?? 0
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.Error);
		}
	}
);

export const getMoreMessages = createAsyncThunk(
	'panel/getMoreMessage',
	async (data, thunkAPI) => {
		try {
			const { users } = thunkAPI.getState().users;
			const { selectUser, totalPages } = thunkAPI.getState().chats;

			if (data > totalPages) return;
			const request = {
				messageType: selectUser.type,
				uid: users.uid,
				friendUid: selectUser.uid
			};
			const response = await axios.post(
				MESSAGE_URL + `?pages=${data}`,
				request
			);

			const message = response.data?.data?.reverse();

			return message ?? [];
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.Error);
		}
	}
);

export const appendMsg = createAsyncThunk(
	'panel/appendMsg',
	async (data, thunkAPI) => {
		try {
			const { users } = thunkAPI.getState().users;
			delete data.fromUsername;
			delete data.to;
			data.from = users;
			data.createdAt = dayjs();
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const appendFriendMsg = createAsyncThunk(
	'panel/appendFriendMsg',
	async (data, thunkAPI) => {
		try {
			let msg = {
				content: data.content,
				contentType: data.contentType,
				createdAt: dayjs(),
				from: {
					uid: data.from,
					username: data.fromUsername
				},
				url: data.url
			};
			return msg;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
