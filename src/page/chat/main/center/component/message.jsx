import {
	ListItemText,
	Typography,
	Avatar,
	ListItem,
	Box,
	Paper
} from '@mui/material';
import ReactAudioPlayer from 'react-audio-player';
import dayjs from 'dayjs';

import ReactPlayer from 'react-player/lazy';


export const Message = ({ content, timeStamp, sender, flexDirection }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: flexDirection }}>
			<Paper
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 200,
					border: 1,
					borderRadius: 1,
					borderBlockColor: 'lightgray',
					paddingX: 1,
					paddingY: 0.5,

					'&::after': {
						position: 'absolute',
						left: '-15px',
						top: '-15px',
						fontSize: '1rem',
						fontFamily: 'Material Icons',
						content: '"s"',
						color: 'red',
						zIndex: '5 !important',
						borderTop: '15px solid transparent',
						borderRight: '15px solid black',
						borderLeft: 'none',
						borderBottom: '15px solid transparent'
					}
				}}
				elevation={24}>
				<Avatar
					alt={sender.username}
					src={sender.avatar}
					sx={{
						position: 'absolute',
						bottom: '-10px',
						left: '0',
						bgcolor: 'white',
						width: 30,
						height: 30
					}}
				/>

				<ListItemText
					primary={<Typography variant="body2">{content}</Typography>}
					secondary={
						<Typography variant="subtitle2" color="gray" textAlign="right">
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Paper>
			{/* <ListItemAvatar
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 200,
					border: 1,
					borderRadius: 1,
					borderBlockColor: 'lightgray',
					paddingX: 1,
					paddingY: 0.5
				}}>
				<Avatar
					alt={sender.username}
					src={sender.avatar}
					sx={{ marginRight: 2, alignSelf: 'flex-start' }}
				/>

				<ListItemText
					primary={<Typography variant="body2">{content}</Typography>}
					secondary={
						<Typography variant="subtitle2" color="gray" textAlign="right">
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</ListItemAvatar> */}
		</ListItem>
	);
};

export const VideoMessage = ({ url, timeStamp, sender, flexDirection }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: flexDirection }}>
			<Box
				component="div"
				sx={{
					display: 'flex',
					alignItems: 'center',

					width: 'auto',
					paddingX: 1,
					paddingY: 0.5
				}}>
				<ReactPlayer
					url={url}
					playing
					controls
					width={200}
					height={100}
					light
				/>

				<ListItemText
					secondary={
						<Typography variant="subtitle2" color="gray" textAlign="right">
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Box>
		</ListItem>
	);
};

export const AudioMessage = ({ url, timeStamp, sender, flexDirection }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: flexDirection }}>
			<Box
				component="div"
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 'auto',
					paddingX: 1,
					paddingY: 0.5
				}}>
				<ReactAudioPlayer
					src={url}
					autoPlay={false}
					controls
					preload="metadata"
				/>

				<ListItemText
					secondary={
						<Typography variant="subtitle2" color="gray" textAlign="right">
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Box>
		</ListItem>
	);
};

export const ImageMessage = ({ url, timeStamp, sender, flexDirection }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: flexDirection }}>
			<Box
				component="div"
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 'auto',
					paddingX: 1,
					paddingY: 0.5
				}}>
				<img alt={sender.username} src={url} width={200} height={200} />

				<ListItemText
					secondary={
						<Typography variant="subtitle2" color="gray" textAlign="right">
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
			</Box>
		</ListItem>
	);
};
