import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Button,
	Tooltip,
	IconButton,
	Box
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import protobuf from '../../../../../proto/proto';

import FilePresentIcon from '@mui/icons-material/FilePresent';

import dayjs from 'dayjs';
import { getSignedUrl } from '../../../../../utils/upload';
import { appendMsg } from '../../../../../redux/actions/chat';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

export const FileMessageLeft = ({ url, timeStamp, sender }) => {
	const decode = decodeURI(url);
	const pathName = decode.split('/').pop();

	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-start' }}>
			<Box>
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
					elevation={24}>
					<ListItemText
						sx={{ marginRight: 1 }}
						secondary={
							<Typography variant="subtitle2" color="white" textAlign="right">
								~{sender.username}
							</Typography>
						}></ListItemText>
					<Button
						href={url}
						download={pathName}
						target="_blank"
						variant="text"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							paddingTop: 0,
							paddingBottom: 0
						}}>
						<PictureAsPdfIcon sx={{ marginRight: 1 }} />
						<Typography variant="body2">{pathName}</Typography>
					</Button>

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

export const FileMessageRight = ({ url, timeStamp }) => {
	const decode = decodeURI(url);
	const pathName = decode.split('/').pop();

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
					bgcolor: 'transparent',
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
				elevation={24}>
				<Button
					href={url}
					download={pathName}
					target="_blank"
					variant="text"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						paddingTop: 2,
						paddingBottom: 0
					}}>
					<PictureAsPdfIcon sx={{ marginRight: 1 }} />
					<Typography variant="body2">{pathName}</Typography>
				</Button>

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

export const AddFile = () => {
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
			contentType: 2,
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
				accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				hidden
				onChange={handleUploadFile}
			/>

			<Tooltip title="Add files">
				<IconButton onClick={() => ref.current.click()}>
					<FilePresentIcon fontSize="large" />
				</IconButton>
			</Tooltip>
		</>
	);
};
