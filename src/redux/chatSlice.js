import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	open: false
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
		}
	}
});

export const { openAppDrawer, closeAppDrawer } = chatSlice.actions;
export default chatSlice.reducer;
