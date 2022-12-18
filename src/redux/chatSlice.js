import { createSlice } from '@reduxjs/toolkit';
import {
	addFriend,
	getFriends,
	searchUsersAndGroups,
	selectFirstFriends
} from './actions/chat';

const initialState = {
	open: false,
	friends: [],
	error: '',
	search: [],
	selectUser: {}
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
			state.friends = [];
			state.friends = [...action.payload];
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
			state.friends.push(action.payload);
		});
		builder.addCase(addFriend.rejected, (state, action) => {
			state.error = action.payload;
		});
	}
});

export const { openAppDrawer, closeAppDrawer, clearError } = chatSlice.actions;
export default chatSlice.reducer;
