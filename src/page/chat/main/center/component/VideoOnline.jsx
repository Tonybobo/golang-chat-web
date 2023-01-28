import { Tooltip, IconButton } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useDispatch, useSelector } from 'react-redux';

import { videoCall } from '../../../../../redux/middleware/webrtc';

export const VideoOnline = () => {
	const dispatch = useDispatch();
	const {
		selectUser,
		receiveAudioCall,
		receiveVideoCall,
		callAccepted,
		calling
	} = useSelector((state) => state.chats);

	return (
		<>
			<Tooltip title="Audio Call">
				<IconButton
					disabled={
						selectUser.type === 2 ||
						receiveAudioCall ||
						receiveVideoCall ||
						callAccepted ||
						calling
					}
					onClick={() => dispatch(videoCall())}>
					<VideoCallIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};
