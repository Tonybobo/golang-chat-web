import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Avatar
} from '@mui/material';
import dayjs from 'dayjs';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ImageMessageLeft = ({ url, timeStamp, sender }) => {
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
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: 250,
					borderBlockColor: 'lightgray',
					position: 'relative',
					bgcolor: 'transparent',
					marginTop: 1,
					marginLeft: 4,
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
