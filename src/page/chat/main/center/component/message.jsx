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

export const SwitchComponent = (message, uid) => {
	switch (message.contentType) {
		case 1:
			if (message.from.uid !== uid) {
				return (
					<MessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						content={message.content}
					/>
				);
			}
			return (
				<MessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					sender={message.from}
					content={message.content}
				/>
			);
		case 4:
			if (message.from.uid !== uid) {
				return (
					<AudioMessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						url={message.url}
					/>
				);
			}
			return (
				<AudioMessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					url={message.url}
				/>
			);
		case 5:
			if (message.from.uid !== uid) {
				return (
					<VideoMessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						url={message.url}
					/>
				);
			}
			return (
				<VideoMessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					url={message.url}
				/>
			);
		default:
			return (
				<MessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					sender={message.from}
					url={message.url}
					content={message.content}
				/>
			);
	}
};

const MessageLeft = ({ content, timeStamp, sender }) => {
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
						borderTop: '15px solid #383838',
						borderLeft: '15px solid transparent',
						borderRight: '15px solid transparent',
						top: '0',
						left: '-15px'
					}
				}}
				elevation={24}>
				<ListItemText
					primary={<Typography variant="body2">{content}</Typography>}
					secondary={
						<Typography
							variant="subtitle2"
							color="gray"
							textAlign="right"
							sx={{ marginTop: 1 }}>
							{dayjs(timeStamp).format('DD/MM/YY')}
						</Typography>
					}></ListItemText>
				<ListItemText></ListItemText>
			</Paper>
		</ListItem>
	);
};

const MessageRight = ({ content, timeStamp }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
			<Paper
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 200,
					paddingX: 2,
					paddingY: 0,
					position: 'relative',
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
				<ListItemText
					primary={<Typography variant="body2">{content}</Typography>}
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

const VideoMessageLeft = ({ url, timeStamp, sender }) => {
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
					width: 200,
					borderBlockColor: 'lightgray',
					position: 'relative',

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
				<ReactPlayer
					url={url}
					playing
					controls
					width={200}
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

const VideoMessageRight = ({ url, timeStamp }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
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
						borderTop: '19px solid #383838',
						borderLeft: '19px solid transparent',
						borderRight: '19px solid transparent',
						top: '0',
						right: '-19px'
					}
				}}
				elevation={24}>
				<ReactPlayer
					url={url}
					playing
					controls
					width={200}
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

const AudioMessageLeft = ({ url, timeStamp, sender }) => {
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
						borderTop: '15px solid #383838',
						borderLeft: '15px solid transparent',
						borderRight: '15px solid transparent',
						top: '0',
						left: '-15px'
					}
				}}
				elevation={24}>
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

const AudioMessageRight = ({ url, timeStamp }) => {
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
						borderTop: '19px solid #383838',
						borderLeft: '19px solid transparent',
						borderRight: '19px solid transparent',
						top: '0',
						right: '-19px'
					}
				}}
				elevation={24}>
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
