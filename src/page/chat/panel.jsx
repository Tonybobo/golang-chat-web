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
	Snackbar,
	DialogTitle
} from '@mui/material';

import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import {
	answerAudioCall,
	rejectAudioCall,
	leaveCall,
	answerVideoCall,
	rejectVideoCall
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
			<Draggable
				handle="#remoteVideo"
				cancel={'[class*="MuiDialogContent-root"]'}
				defaultPosition={{ x: 50, y: -100 }}
				position={null}
				grid={[25, 25]}>
				<Paper
					style={{
						position: 'absolute',
						top: '50%',
						margin: 0,
						backgroundColor: '#000',
						padding: 0,
						overflow: 'hidden',
						width: 200,
						height: 200
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
							<IconButton
								color="inherit"
								sx={{ p: 0.5, marginRight: 0.5 }}
								onClick={() => dispatch(answerVideoCall())}>
								<CallIcon />
							</IconButton>
							<IconButton
								color="inherit"
								sx={{ p: 0.5, marginLeft: 0.5 }}
								onClick={() => dispatch(rejectVideoCall())}>
								<CallEndIcon />
							</IconButton>
						</>
					}
				/>

				<Dialog
					hideBackdrop
					disableEnforceFocus
					style={{
						position: 'initial',
						padding: '0'
					}}
					open={calling || callAccepted}
					PaperComponent={PaperComponent}
					aria-labelledby="draggable-dialog-title">
					<DialogTitle
						style={{
							cursor: 'move',
							textAlign: 'center',
							padding: 0,
							position: 'absolute',
							top: '10px',
							left: '30%',
							zIndex: 10000
						}}
						id="draggable-dialog-title">
						{caller.fromUsername}
					</DialogTitle>
					<DialogContent sx={{ padding: 0 }}>
						<video
							id="remoteVideo"
							style={{
								width: 200,
								height: 200,
								position: 'absolute',
								top: 0,
								left: 0,
								objectFit: 'cover'
							}}
						/>
					</DialogContent>
					<DialogActions
						sx={{
							position: 'absolute',
							bottom: '10%',
							left: '34%'
						}}>
						<IconButton
							color="inherit"
							sx={{ p: 0.5, marginLeft: 0.5 }}
							onClick={() => dispatch(leaveCall())}>
							<CallEndIcon fontSize="large" />
						</IconButton>
					</DialogActions>
				</Dialog>
			</Container>
		</>
	);
}
