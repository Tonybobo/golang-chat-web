import { createSlice } from '@reduxjs/toolkit';
import {
	addFriend,
	createGroup,
	getFriends,
	getGroupMembers,
	getMoreMessages,
	searchUsersAndGroups,
	selectFirstFriends,
	selectFriend,
	updateGroupDetail,
	uploadGroupAvatar
} from './actions/chat';

const initialState = {
	open: false,
	friends: {},
	error: '',
	search: [],
	selectUser: {},
	loading: false,
	messages: [],
	pages: 1,
	totalPages: 0
};

const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		openAppDrawer(state) {
			state.open = true;
		},
		closeAppDrawer(state) {
			state.open = false;
		},
		clearError(state) {
			state.error = '';
		}
	},

	extraReducers: (builder) => {
		builder.addCase(getFriends.fulfilled, (state, action) => {
			state.friends = action.payload;
		});
		builder.addCase(getFriends.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(searchUsersAndGroups.fulfilled, (state, action) => {
			state.search = [...action.payload];
		});
		builder.addCase(searchUsersAndGroups.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(selectFirstFriends.fulfilled, (state, action) => {
			state.selectUser = action.payload;
		});
		builder.addCase(selectFirstFriends.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(addFriend.fulfilled, (state, action) => {
			const { uid } = action.payload;
			state.friends[uid] = action.payload;
		});
		builder.addCase(addFriend.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(createGroup.fulfilled, (state, action) => {
			const { uid } = action.payload;
			state.friends[uid] = action.payload;
			state.loading = false;
		});
		builder.addCase(createGroup.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		});
		builder.addCase(selectFriend.fulfilled, (state, action) => {
			state.pages = 1;
			state.selectUser = action.payload.selectUser;
			state.totalPages = action.payload.pages;
			state.messages = action.payload.data;
		});
		builder.addCase(selectFriend.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(uploadGroupAvatar.fulfilled, (state, action) => {
			const { uid } = action.payload;
			state.selectUser = action.payload;
			state.friends[uid] = action.payload;
		});
		builder.addCase(uploadGroupAvatar.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(updateGroupDetail.fulfilled, (state, action) => {
			const { uid } = action.payload;
			state.selectUser = action.payload;
			state.friends[uid] = action.payload;
		});
		builder.addCase(updateGroupDetail.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(getGroupMembers.fulfilled, (state, action) => {
			state.selectUser.members = action.payload;
		});
		builder.addCase(getMoreMessages.fulfilled, (state, action) => {
			let message = state.messages;
			state.messages = [...action.payload, ...message];
			state.pages++;
		});
	}
});

export const { openAppDrawer, closeAppDrawer, clearError } = chatSlice.actions;
export default chatSlice.reducer;
