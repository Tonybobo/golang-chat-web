import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { openAppDrawer } from '../../../../../redux/chatSlice';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { Avatar } from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

export default function TopBar() {
	const open = useSelector((state) => state.chats.open);
	const dispatch = useDispatch();
	const handleDrawerOpen = () => {
		dispatch(openAppDrawer());
	};

	return (
		<AppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: 5,
						...(open && { display: 'none' })
					}}>
					<Avatar alt="Remy Sharp" src="" />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
