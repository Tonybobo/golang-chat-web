import {
	ListItemText,
	Typography,
	Box,
	ListItem,
	Paper,
	Tooltip,
	IconButton
} from '@mui/material';
import dayjs from 'dayjs';
import ReactPlayer from 'react-player/lazy';

import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import protobuf from '../../../../../proto/proto';
import { getSignedUrl } from '../../../../../utils/upload';
import { appendMsg } from '../../../../../redux/actions/chat';

export const VideoMessageLeft = ({ url, timeStamp, sender }) => {
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
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: 250,
						borderBlockColor: 'lightgray',
						position: 'relative',
						bgcolor: 'transparent',
						marginTop: 1,
						marginLeft: 1,
						'&::after': {
							content: "''",
							position: 'absolute',
							width: '0',
							height: '0',
							borderTop: '15px solid #383838',
							borderLeft: '15px solid transparent',
							borderRight: '15px solid transparent',
							top: '0',
							left: '-15px'
						}
					}}
					elevation={0}>
					<ReactPlayer
						url={url}
						playing
						controls
						width={250}
						height={200}
						light={true}
						pip={false}
						config={{
							file: {
								attributes: {
									controlsList:
										'nofullscreen nodownload noremoteplayback noplaybackrate"'
								}
							}
						}}
					/>

					<ListItemText
						secondary={
							<Typography
								variant="subtitle2"
								color="gray"
								textAlign="right"
								sx={{ marginTop: 1 }}>
								{dayjs(timeStamp).format('DD/MM/YY')}
							</Typography>
						}></ListItemText>
				</Paper>
			</Box>
		</ListItem>
	);
};

export const VideoMessageRight = ({ url, timeStamp }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: 250,
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
						borderTop: '19px solid #383838',
						borderLeft: '19px solid transparent',
						borderRight: '19px solid transparent',
						top: '0',
						right: '-19px'
					}
				}}
				elevation={0}>
				<ReactPlayer
					url={url}
					playing
					controls
					width={250}
					height={200}
					light={true}
					pip={false}
					config={{
						file: {
							attributes: {
								controlsList:
									'nofullscreen nodownload noremoteplayback noplaybackrate"'
							}
						}
					}}
				/>

				<ListItemText
					secondary={
						<Typography
							variant="subtitle2"
							color="gray"
							textAlign="right"
							sx={{ marginTop: 1 }}>
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Paper>
		</ListItem>
	);
};

export const AddVideo = () => {
	const dispatch = useDispatch();
	const { selectUser, socket } = useSelector((state) => state.chats);
	const { users } = useSelector((state) => state.users);
	const ref = useRef(null);
	const handleUploadFile = async (event) => {
		const file = event.target.files[0];
		if (file === undefined) return;
		const { size } = file;
		if (size > 10e6) {
			window.alert('Please upload a image smaller than 10 mb');
			return;
		}

		const fileName = await getSignedUrl(file);

		let msg = {
			content: '',
			contentType: 5,
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

	return (
		<>
			<input
				type="file"
				ref={ref}
				accept="video/*"
				hidden
				onChange={handleUploadFile}
			/>
			<Tooltip title="Add Video">
				<IconButton onClick={() => ref.current.click()}>
					<VideoLibraryIcon fontSize="large"></VideoLibraryIcon>
				</IconButton>
			</Tooltip>
		</>
	);
};
