import { useEffect } from 'react';
import MiniDrawer from './main/center';
import { Container } from '@mui/system';
import TransitionMsg from './main/right/alert';
import { useSelector, useDispatch } from 'react-redux';
import {
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Paper,
	Snackbar
} from '@mui/material';

import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import {
	answerAudioCall,
	rejectAudioCall,
	leaveCall
} from '../../redux/middleware/webrtc';
import Draggable from 'react-draggable';

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

	const { receiveAudioCall, caller, receiveVideoCall, calling, callAccepted } =
		useSelector((state) => state.chats);
	const dispatch = useDispatch();

	function PaperComponent(props) {
		return (
			<Draggable defaultPosition={{ x: 50, y: 50 }} grid={[25, 25]}>
				<Paper
					style={{
						margin: 0,
						backgroundColor: '#000',

						overflow: 'hidden'
					}}
					{...props}
				/>
			</Draggable>
		);
	}

	return (
		<>
			<Container>
				<MiniDrawer />
				<TransitionMsg />
				<Snackbar
					open={receiveAudioCall}
					autoHideDuration={10000}
					onClose={() => dispatch(rejectAudioCall())}
					anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
					message={`${caller.fromUsername} request for audio call`}
					action={
						<>
							<IconButton
								color="inherit"
								sx={{ p: 0.5, marginRight: 0.5 }}
								onClick={() => dispatch(answerAudioCall())}>
								<CallIcon />
							</IconButton>
							<IconButton
								color="inherit"
								sx={{ p: 0.5, marginLeft: 0.5 }}
								onClick={() => dispatch(rejectAudioCall())}>
								<CallEndIcon />
							</IconButton>
						</>
					}
				/>
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

				<Dialog
					hideBackdrop
					disableEnforceFocus
					style={{
						position: 'absolute'
					}}
					open={calling || callAccepted}
					PaperComponent={PaperComponent}
					aria-labelledby="draggable-dialog-title"
					disableBackdropClick>
					<DialogContent>
						<video id="remoteVideo" style={{ width: 200, height: 200 }} />
					</DialogContent>
					<DialogActions
						style={{ position: 'absolute', bottom: '10%', left: '37%' }}>
						<IconButton color="inherit" onClick={() => dispatch(leaveCall())}>
							<CallEndIcon fontSize="large" />
						</IconButton>
					</DialogActions>
				</Dialog>
			</Container>
		</>
	);
}
