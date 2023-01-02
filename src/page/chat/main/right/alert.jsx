import { Alert, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../../../redux/chatSlice';

export default function TransitionMsg() {
	const error = useSelector((state) => state.chats.error);
	const dispatch = useDispatch();
	return error === '' ? (
		<></>
	) : (
		<Box
			sx={{
				width: '30%',
				marginTop: 10,
				position: 'absolute',
				right: '0'
			}}>
			<Collapse in={error === '' ? false : true}>
				<Alert
					severity="error"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								dispatch(clearError());
							}}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}>
					{error}
				</Alert>
			</Collapse>
		</Box>
	);
}
