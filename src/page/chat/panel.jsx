import { useEffect } from 'react';
import MiniDrawer from './main/center';
import { Container } from '@mui/system';
import TransitionMsg from './main/right/alert';
import { useSelector } from 'react-redux';
import { IconButton, Snackbar } from '@mui/material';

import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';


export default function Panel() {
	useEffect(() => {
		checkPermission();
	});

	const checkPermission = () => {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
		return;
	};

	const { receiveAudioCall, caller , receiveVideoCall } = useSelector((state) => state.chats);

	return (
		<>
			<Container>
				<MiniDrawer />
				<TransitionMsg />
				{receiveAudioCall && (
					<Snackbar
						open={receiveAudioCall}
						autoHideDuration={6000}
						// onClose={handleClose}
						anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
						message={`${caller.fromUsername} request for audio call`}
						action={
							<>
								<IconButton color="inherit" sx={{ p: 0.5, marginRight: 0.5 }}>
									<CallIcon />
								</IconButton>
								<IconButton color="inherit" sx={{ p: 0.5, marginLeft: 0.5 }}>
									<CallEndIcon />
								</IconButton>
							</>
						}
					/>
				)}
				{receiveVideoCall && (
					<Snackbar
						open={receiveVideoCall}
						autoHideDuration={6000}
						anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
						message={`${caller.fromUsername} request for video call`}
						action={
							<>
								<IconButton color="inherit" sx={{ p: 0.5, marginRight: 0.5 }}>
									<CallIcon />
								</IconButton>
								<IconButton color="inherit" sx={{ p: 0.5, marginLeft: 0.5 }}>
									<CallEndIcon />
								</IconButton>
							</>
						}
					/>
				)}
			</Container>
		</>
	);
}
