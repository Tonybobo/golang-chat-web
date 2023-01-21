import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';
import userSlice from './userSlice';
import socketMiddleware from './middleware/middleware';

export const store = configureStore({
	reducer: {
		users: userSlice,
		chats: chatSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(socketMiddleware)
});
