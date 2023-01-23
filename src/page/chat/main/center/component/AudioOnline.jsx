import { Tooltip, IconButton } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch } from 'react-redux';

import { audioCall } from '../../../../../redux/middleware/webrtc';

export const AudioOnline = () => {
	const dispatch = useDispatch();

	return (
		<>
			<Tooltip title="Audio Call">
				<IconButton onClick={() => dispatch(audioCall())}>
					<CallIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};
