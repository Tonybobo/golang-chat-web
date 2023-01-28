import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Tooltip,
	IconButton,
	Box
} from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ReactAudioPlayer from 'react-audio-player';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useDispatch, useSelector } from 'react-redux';

import { getSignedUrl } from '../../../../../utils/upload';
import { sendMsg } from '../../../../../redux/actions/chat';

dayjs.extend(isToday);

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
							{dayjs(timeStamp).isToday()
								? dayjs(timeStamp).format('HH:mm')
								: dayjs(timeStamp).format('HH:mm DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Paper>
		</ListItem>
	);
};

export const AudioMessageLeft = ({ url, timeStamp, sender }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-start' }}>
			<Box>
				<ListItemText
					sx={{ margin: 0 }}
					secondary={
						<Typography variant="subtitle2" color="white" textAlign="right">
							~{sender.username}
						</Typography>
					}></ListItemText>
				<Paper
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						width: 200,
						borderBlockColor: 'lightgray',
						position: 'relative',
						paddingX: 0,
						paddingY: 0,
						marginTop: 0,
						marginLeft: 2,
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
								{dayjs(timeStamp).isToday()
									? dayjs(timeStamp).format('HH:mm')
									: dayjs(timeStamp).format('HH:mm DD/MM/YY')}
							</Typography>
						}></ListItemText>
				</Paper>
			</Box>
		</ListItem>
	);
};

export const AddAudio = () => {
	const dispatch = useDispatch();
	let recorder;
	let chunks = [];
	const { selectUser } = useSelector((state) => state.chats);
	const { users } = useSelector((state) => state.users);

	const addStream = async (stream) => {
		recorder = new MediaRecorder(stream);
		recorder.ondataavailable = (e) => {
			chunks.push(e.data);
		};
		recorder.onstop = () => {
			stream.getTracks().forEach((track) => {
				track.stop();
			});
			const audioBlob = new Blob(chunks, { type: 'audio/wav' });
			const reader = new FileReader();
			reader.readAsDataURL(audioBlob);
			reader.onloadend = async () => {
				audioBlob.name = 'audio';
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

				dispatch(sendMsg(msg));
			};
		};
	};

	const handleStart = async () => {
		if (navigator.getUserMedia) {
			await navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((stream) => {
					addStream(stream);
				})
				.catch((err) => {
					console.error(`The following error occurred: ${err}`);
				});

			recorder.start();
		} else {
			alert('permission not granted');
		}
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
