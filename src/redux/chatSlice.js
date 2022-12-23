import { createSlice } from '@reduxjs/toolkit';
import {
	addFriend,
	createGroup,
	getFriends,
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
	loading: false
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
		builder.addCase(selectFriend, (state, action) => {
			state.selectUser = action.payload;
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
	}
});

export const { openAppDrawer, closeAppDrawer, clearError } = chatSlice.actions;
export default chatSlice.reducer;
