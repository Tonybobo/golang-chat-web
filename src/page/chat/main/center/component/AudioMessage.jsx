import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Avatar
} from '@mui/material';
import ReactAudioPlayer from 'react-audio-player';
import dayjs from 'dayjs';

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
