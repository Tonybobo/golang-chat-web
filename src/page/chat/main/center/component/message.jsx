import {
	ListItemAvatar,
	ListItemText,
	Typography,
	Avatar,
	ListItem
} from '@mui/material';
import ReactAudioPlayer from 'react-audio-player';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

export const Message = ({ content, timeStamp, sender, flexDirection }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: flexDirection }}>
			<ListItemAvatar
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
			</ListItemAvatar>
		</ListItem>
	);
};

export const AudioMessage = ({ url, timeStamp, sender, flexDirection }) => {
	const [src, setSrc] = useState();

	useEffect(() => {
		setSrc(url);
	}, [url]);
	console.log(url, timeStamp);
	return (
		<ListItem sx={{ display: 'flex', justifyContent: flexDirection }}>
			<div
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 'auto',

					paddingX: 1,
					paddingY: 0.5
				}}>
				<ReactAudioPlayer
					src={src}
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
			</div>
		</ListItem>
	);
};
