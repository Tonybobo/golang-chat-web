import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Tooltip,
	IconButton,
	Box
} from '@mui/material';
import dayjs from 'dayjs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import protobuf from '../../../../../proto/proto';
import { getSignedUrl } from '../../../../../utils/upload';
import { appendMsg } from '../../../../../redux/actions/chat';

export const ImageMessageLeft = ({ url, timeStamp, sender }) => {
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
					<LazyLoadImage alt={sender.from} src={url} width={250} height={200} />

					<ListItemText
						secondary={
							<Typography variant="subtitle2" color="gray" textAlign="right">
								{dayjs(timeStamp).format('DD/MM/YY')}
							</Typography>
						}></ListItemText>
				</Paper>
			</Box>
		</ListItem>
	);
};

export const ImageMessageRight = ({ url, timeStamp, sender }) => {
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
				<LazyLoadImage alt={url} src={url} width={250} height={200} />

				<ListItemText
					secondary={
						<Typography variant="subtitle2" color="gray" textAlign="right">
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Paper>
		</ListItem>
	);
};

export const AddImage = () => {
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
			contentType: 3,
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
				accept="image/*"
				hidden
				onChange={handleUploadFile}
			/>
			<Tooltip title="Add Image">
				<IconButton onClick={() => ref.current.click()}>
					<ImageIcon fontSize="large" />
				</IconButton>
			</Tooltip>
		</>
	);
};
