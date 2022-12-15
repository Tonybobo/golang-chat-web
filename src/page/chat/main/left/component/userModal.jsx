import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, TextField, Modal, Box, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	updateUserInfo,
	uploadUserAvatar
} from '../../../../../redux/userSlice';

export default function UserModal({ open, handleModalClose }) {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	};
	const user = useSelector((state) => state.users.users);
	const loading = useSelector((state) => state.users.loading);
	const [file, setFile] = useState(user.avatar);
	const dispatch = useDispatch();

	const handleUpload = (e) => {
		setFile(URL.createObjectURL(e.target.files[0]));
		const data = new FormData();
		data.append('avatar', e.target.files[0]);
		data.append('username', user.username);
		dispatch(uploadUserAvatar(data));
	};

	const handleSubmitInfo = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		dispatch(updateUserInfo(data))
			.unwrap()
			.then(() => handleModalClose(closeModal));
	};

	const closeModal = () => {
		return false;
	};

	return (
		<Modal
			open={open}
			onClose={() => handleModalClose(closeModal)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={style}>
				<Box
					style={{
						display: 'flex'
					}}>
					<Avatar
						sx={{
							width: '50px',
							height: '50px',
							marginRight: 2
						}}
						src={file}
						alt="avatar"
					/>
					<IconButton
						color="primary"
						aria-label="upload picture"
						component="label">
						<input
							type="file"
							id="avatar"
							name="avatar"
							accept="image/*"
							onChange={handleUpload}
							hidden
						/>
						<PhotoCamera />
					</IconButton>
				</Box>
				<Box
					component="form"
					onSubmit={handleSubmitInfo}
					sx={{
						marginY: 2,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column'
					}}>
					<TextField
						margin="dense"
						size="small"
						id="username"
						label="Username"
						name="username"
						defaultValue={user.username}
						InputProps={{
							readOnly: true
						}}
					/>
					<TextField
						margin="dense"
						size="small"
						id="name"
						label="Name"
						name="name"
						required
						defaultValue={user.name}
					/>
					<TextField
						margin="dense"
						size="small"
						id="email"
						label="Email"
						name="email"
						type="email"
						required
						defaultValue={user.email}
					/>
					<LoadingButton
						type="submit"
						loading={loading}
						sx={{ marginY: 1 }}
						variant="outlined">
						Update
					</LoadingButton>
				</Box>
			</Box>
		</Modal>
	);
}
