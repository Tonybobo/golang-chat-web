import { Tooltip, IconButton } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch, useSelector } from 'react-redux';

import { audioCall } from '../../../../../redux/middleware/webrtc';

export const AudioOnline = () => {
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
					onClick={() => dispatch(audioCall())}>
					<CallIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};
