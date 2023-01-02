import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';
import userSlice from './userSlice';

export const store = configureStore({
	reducer: {
		users: userSlice,
		chats: chatSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});
