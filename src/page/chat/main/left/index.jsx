import * as React from 'react';

import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import LeftDrawer from './component/drawer';
import TopBar from './component/appBar';

export default function MiniDrawer() {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<TopBar />
			<LeftDrawer />
		</Box>
	);
}
