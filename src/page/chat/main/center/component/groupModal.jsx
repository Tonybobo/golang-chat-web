import { useSelector, useDispatch } from 'react-redux';
import { TextField, Modal, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { createGroup } from '../../../../../redux/actions/chat';

export default function GroupModal({ open, handleModalClose }) {
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
	const loading = useSelector((state) => state.users.loading);
	const dispatch = useDispatch();

	const handleSubmitInfo = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);

		dispatch(createGroup(data))
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
						id="name"
						label="Name"
						name="name"
						required
					/>
					<LoadingButton
						type="submit"
						loading={loading}
						sx={{ marginY: 1 }}
						variant="outlined">
						Submit
					</LoadingButton>
				</Box>
			</Box>
		</Modal>
	);
}
