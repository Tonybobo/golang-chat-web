import { Tooltip, IconButton } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useDispatch } from 'react-redux';

import { videoCall } from '../../../../../redux/middleware/webrtc';

export const VideoOnline = () => {
	const dispatch = useDispatch();

	return (
		<>
			<Tooltip title="Audio Call">
				<IconButton onClick={() => dispatch(videoCall())}>
					<VideoCallIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};
