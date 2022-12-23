import { PhotoCamera } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Avatar,
	Box,
	IconButton,
	Modal,
	TextField,
	Typography
} from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	uploadGroupAvatar,
	updateGroupDetail
} from '../../../../../redux/actions/chat';
import GroupMember from './member';

export default function DetailModal() {
	const selectedUser = useSelector((state) => state.chats.selectUser);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.users);
	const loading = useSelector((state) => state.users.loading);
	const [openModal, setOpenModal] = useState(false);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 300,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 2,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	};

	const handleUpload = (e) => {
		const data = new FormData();
		data.append('avatar', e.target.files[0]);

		dispatch(uploadGroupAvatar(data));
	};
	const handleSubmitInfo = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		dispatch(updateGroupDetail(data));
	};
	return (
		<Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
			<Avatar
				sx={{ marginRight: 2 }}
				alt={selectedUser.username}
				src={selectedUser.avatar}
				onClick={() => {
					setOpenModal(true);
				}}
			/>
			<Box component="div">
				{selectedUser.type === 1 ? (
					<>
						<Typography variant="body1">{selectedUser.username}</Typography>
						<Typography variant="subtitle2" sx={{ color: 'lightgray' }}>
							{selectedUser.name}
						</Typography>
					</>
				) : (
					<>
						<Typography variant="body1">{selectedUser.name}</Typography>
						<Typography variant="subtitle2" sx={{ color: 'lightgray' }}>
							{selectedUser.notice}
						</Typography>
					</>
				)}
			</Box>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
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
							src={selectedUser.avatar}
							alt="avatar"
						/>
						{selectedUser.type === 2 && user.uid === selectedUser?.userId && (
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
						)}
					</Box>
					<Box
						component="form"
						onSubmit={handleSubmitInfo}
						sx={{
							marginY: 2,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
							width: '100%'
						}}>
						<TextField
							margin="dense"
							size="small"
							id="name"
							label="Name"
							name="name"
							fullWidth
							required
							defaultValue={selectedUser.name}
							disabled={user.uid !== selectedUser?.userId}
						/>
						<TextField
							margin="dense"
							size="small"
							id="notice"
							label="notice"
							name="notice"
							fullWidth
							required
							defaultValue={selectedUser.notice}
							disabled={user.uid !== selectedUser?.userId}
						/>
						{user.uid === selectedUser?.userId && (
							<LoadingButton
								type="submit"
								loading={loading}
								sx={{ marginY: 1 }}
								variant="outlined">
								Update
							</LoadingButton>
						)}
					</Box>
					<GroupMember />
				</Box>
			</Modal>
		</Box>
	);
}
