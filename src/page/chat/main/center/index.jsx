import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import LeftDrawer from './component/drawer';
import TopBar from './component/appBar';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MessageList from './component/messageList';
import ChatBox from './component/ChatBox';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

export default function MiniDrawer() {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<TopBar />
			<LeftDrawer />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 0,
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					justifyContent: 'space-between'
				}}>
				<DrawerHeader />
				<MessageList />
				<Box component="div" sx={{ marginBottom: 2 }}>
					<ChatBox />
				</Box>
			</Box>
		</Box>
	);
}
