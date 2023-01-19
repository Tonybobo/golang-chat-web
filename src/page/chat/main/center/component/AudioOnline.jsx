import {
	Tooltip,
	IconButton,
	Paper,
	Dialog,
	DialogTitle,
	DialogActions,
	Button
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import { useSelector } from 'react-redux';
import protobuf from '../../../../../proto/proto';
import {
	AUDIO_ONLINE,
	MESSAGE_TRANS_TYPE
} from '../../../../../utils/Constant';

import Draggable from 'react-draggable';
import { useState } from 'react';

function PaperComponent(props) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

export const AudioOnline = () => {
	let localPeer = new RTCPeerConnection();
	const { socket, selectUser } = useSelector((state) => state.chats);
	const { users } = useSelector((state) => state.users);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const startAudioOnline = () => {
		if (!navigator.mediaDevices.getUserMedia) {
			alert('permission not granted');
		}
		webrtcConnection();
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: false })
			.then((stream) => {
				stream.getTracks().forEach((track) => {
					localPeer.addTrack(track, stream);
				});

				localPeer.createOffer().then((offer) => {
					console.log(offer);
					localPeer.setLocalDescription(offer);
					let data = {
						contentType: AUDIO_ONLINE,
						content: JSON.stringify(offer),
						type: MESSAGE_TRANS_TYPE,
						fromUsername: users.username,
						from: users.uid,
						to: selectUser.uid
					};

					let message = protobuf.lookup('protocol.Message');
					const messagePB = message.create(data);
					socket.send(message.encode(messagePB).finish());
					handleClickOpen();
				});
			});
	};
	const webrtcConnection = () => {
		localPeer.onicecandidate = (e) => {
			if (e.candidate) {
				let candidate = {
					type: 'offer_ice',
					iceCandidate: e.candidate
				};
				let data = {
					contentType: AUDIO_ONLINE,
					content: JSON.stringify(candidate),
					type: MESSAGE_TRANS_TYPE,
					fromUsername: users.username,
					from: users.uid,
					to: selectUser.uid
				};
				let message = protobuf.lookup('protocol.Message');
				const messagePB = message.create(data);
				socket.send(message.encode(messagePB).finish());
			}
		};

		localPeer.ontrack = (e) => {
			if (e && e.streams) {
				let remoteAudio = document.getElementById('remoteAudioPhone');
				remoteAudio.srcObject = e.streams[0];
			}
		};
	};
	return (
		<>
			<Tooltip title="Audio Call">
				<IconButton onClick={startAudioOnline}>
					<CallIcon />
				</IconButton>
			</Tooltip>
			<Dialog
				hideBackdrop
				disableEnforceFocus
				disableBackdropClick
				style={{ position: 'initial' }}
				open={open}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title">
				<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
					Subscribe
				</DialogTitle>

				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Cancel
					</Button>
					<Button onClick={handleClose}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
