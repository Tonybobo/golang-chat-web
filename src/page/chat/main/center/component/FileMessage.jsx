import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Avatar,
	Button
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import dayjs from 'dayjs';

export const FileMessageLeft = ({ url, timeStamp, sender }) => {
	const decode = decodeURI(url);
	const pathName = decode.split('/').pop();

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
