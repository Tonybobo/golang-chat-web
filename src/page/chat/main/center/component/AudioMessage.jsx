import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Avatar,
	Tooltip,
	IconButton
} from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ReactAudioPlayer from 'react-audio-player';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getSignedUrl } from '../../../../../utils/upload';
import { appendMsg } from '../../../../../redux/actions/chat';
import protobuf from '../../../../../proto/proto';

export const AudioMessageRight = ({ url, timeStamp }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
			<Paper
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					width: 200,
					borderBlockColor: 'lightgray',
					position: 'relative',

					marginTop: 1,
					marginLeft: 4,
					'&::after': {
						position: 'absolute',
						right: '-15px',
						top: '0',
						width: '0',
						height: '0',
						zIndex: '5 !important',
						borderTop: '15px solid #fff',
						borderLeft: '15px solid transparent',
						borderRight: '15px solid transparent'
					},
					'&:before': {
						content: "''",
						position: 'absolute',
						width: '0',
						height: '0',
						borderTop: '19px solid #fff',
						borderLeft: '19px solid transparent',
						borderRight: '19px solid transparent',
						top: '0',
						right: '-13px'
					}
				}}
				elevation={0}>
				<ReactAudioPlayer
					style={{ width: '200px' }}
					src={url}
					autoPlay={false}
					controlsList="nodownload noplaybackrate"
					controls
					preload="metadata"
				/>

				<ListItemText
					secondary={
						<Typography
							variant="subtitle2"
							color="gray"
							textAlign="right"
							sx={{
								marginTop: 1,
								position: 'relative',
								right: '-60px',
								bottom: '0'
							}}>
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Paper>
		</ListItem>
	);
};

export const AudioMessageLeft = ({ url, timeStamp, sender }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-start' }}>
			<Avatar
				alt={sender.username}
				src={sender.avatar}
				sx={{
					bgcolor: 'white',
					width: 30,
					height: 30,
					position: 'absolute',
					top: 0,
					left: 0
				}}
			/>
			<Paper
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					width: 200,
					borderBlockColor: 'lightgray',
					position: 'relative',
					paddingX: 2,
					paddingY: 0,
					marginTop: 1,
					marginLeft: 4,
					'&::after': {
						content: "''",
						position: 'absolute',
						width: '0',
						height: '0',
						borderTop: '15px solid #fff',
						borderLeft: '15px solid transparent',
						borderRight: '15px solid transparent',
						top: '0',
						left: '-8px'
					}
				}}
				elevation={0}>
				<ReactAudioPlayer
					style={{ width: '200px' }}
					src={url}
					autoPlay={false}
					controlsList="nodownload noplaybackrate"
					controls
					preload="metadata"
				/>
				<ListItemText
					secondary={
						<Typography
							variant="subtitle2"
							color="gray"
							textAlign="right"
							sx={{
								marginTop: 1,
								position: 'relative',
								right: '-60px',
								bottom: '0'
							}}>
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Paper>
		</ListItem>
	);
};

export const AddAudio = () => {
	const dispatch = useDispatch();
	let recorder;
	let chunks = [];
	const [permission, setPermission] = useState(true);
	const { selectUser, socket } = useSelector((state) => state.chats);
	const { users } = useSelector((state) => state.users);
	useEffect(() => {
		checkPermission();
	});
	const checkPermission = async () => {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia; //获取媒体对象（这里指摄像头）
		if (!navigator || !navigator.mediaDevices) {
			setPermission(false);
			return false;
		}
		return true;
	};

	if (navigator.mediaDevices) {
		console.log('permission granted');
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				recorder = new MediaRecorder(stream);
				recorder.ondataavailable = (e) => {
					chunks.push(e.data);
				};
				recorder.onstop = () => {
					const audioBlob = new Blob(chunks, { type: 'audio/wav' });
					const reader = new FileReader();
					reader.readAsDataURL(audioBlob);
					reader.onloadend = async () => {
						audioBlob.name = 'testing';
						chunks = [];
						const fileName = await getSignedUrl(audioBlob);

						let msg = {
							content: '',
							contentType: 4,
							messageType: selectUser.type,
							fromUsername: users.username,
							from: users.uid,
							to: selectUser.uid,
							url: `https://storage.googleapis.com/go-chat/${fileName}`
						};

						let message = protobuf.lookup('protocol.Message');
						const messagePB = message.create(msg);
						socket.send(message.encode(messagePB).finish());

						dispatch(appendMsg(msg));
					};
				};
			})
			.catch((err) => {
				console.error(`The following error occurred: ${err}`);
			});
	}

	const handleStart = () => {
		if (permission) recorder.start();
		else alert('Permission has not been granted');
	};
	const handleStop = () => {
		recorder.stop();
	};

	return (
		<>
			<Tooltip title="Hold To Record Audio">
				<IconButton
					onMouseDown={handleStart}
					onMouseUp={handleStop}
					onTouchStart={handleStart}
					onTouchEnd={handleStop}>
					<KeyboardVoiceIcon fontSize="large"></KeyboardVoiceIcon>
				</IconButton>
			</Tooltip>
		</>
	);
};
