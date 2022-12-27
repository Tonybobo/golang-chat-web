import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import LeftDrawer from './component/drawer';
import TopBar from './component/appBar';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Messages from './component/message';

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
			<Box component="main" sx={{ flexGrow: 1, p: 0 }}>
				<DrawerHeader />
				<Messages />
			</Box>
		</Box>
	);
}
