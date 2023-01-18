import { ListItemText, Typography, Box, ListItem, Paper } from '@mui/material';

import dayjs from 'dayjs';

export const MessageLeft = ({ content, timeStamp, sender }) => {
	return (
		<ListItem sx={{ display: 'flex', justifyContent: 'flex-start' }}>
			<Box>
				<Paper
					sx={{
						width: 200,
						borderBlockColor: 'lightgray',
						position: 'relative',
						paddingX: 2,
						paddingY: 0,
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
					<Typography variant="subtitle2" color="white" textAlign="right">
						~{sender.username}
					</Typography>
					<ListItemText
						primary={
							<Typography textAlign="center" variant="body2">
								{content}
							</Typography>
						}
						secondary={
							<Typography
								variant="subtitle2"
								color="gray"
								textAlign="right"
								sx={{ marginTop: 1 }}>
								{dayjs(timeStamp).format('DD/MM/YY')}
							</Typography>
						}
					/>
				</Paper>
			</Box>
		</ListItem>
	);
};

export const MessageRight = ({ content, timeStamp }) => {
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
