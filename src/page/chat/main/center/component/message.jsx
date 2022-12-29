import {
	ListItemAvatar,
	ListItemText,
	Typography,
	Avatar,
	ListItem
} from '@mui/material';

import dayjs from 'dayjs';

export const MessageLeft = ({ content, timeStamp, sender }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-start' }}>
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

export const MessageRight = ({ content, timeStamp, sender }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-end', border: 1 }}>
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
