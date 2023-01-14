import {
	ListItemText,
	Typography,
	ListItem,
	Paper,
	Avatar
} from '@mui/material';
import dayjs from 'dayjs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { appendMediaMsg } from '../../../../../redux/actions/chat';

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

export const AddImage = () => {
	const dispatch = useDispatch();
	const ref = useRef(null);
	const handleUploadFile = async (event) => {
		const file = event.target.files[0];
		if (file === undefined) return;
		const { size } = file;
		if (size > 10e6) {
			window.alert('Please upload a image smaller than 10 mb');
			return;
		}

		dispatch(appendMediaMsg({ file: file, contentType: 3 }));
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
			<ImageIcon
				onClick={() => ref.current.click()}
				fontSize="large"></ImageIcon>
		</>
	);
};
