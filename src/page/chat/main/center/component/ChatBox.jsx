import { InputAdornment, OutlinedInput, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import protobuf from '../../../../../proto/proto';
import { appendMsg } from '../../../../../redux/actions/chat';
import { AddImage } from './ImageMessage';
import { AddVideo } from './VideoMessage';
import { AddFile } from './FileMessage';
import { AddAudio } from './AudioMessage';

export default function ChatBox() {
	const [msgInput, setMsgInput] = useState();
	const { socket, selectUser } = useSelector((state) => state.chats);
	const { users } = useSelector((state) => state.users);
	const dispatch = useDispatch();

	const EnterSendMsg = (event) => {
		if (event.key === 'Enter' || event.type === 'click') {
			event.preventDefault();
			let data = {
				content: msgInput,
				contentType: 1,
				messageType: selectUser.type,
				fromUsername: users.username,
				from: users.uid,
				to: selectUser.uid
			};

			let message = protobuf.lookup('protocol.Message');
			const messagePB = message.create(data);
			socket.send(message.encode(messagePB).finish());
			dispatch(appendMsg(data));
			setMsgInput('');
		}
	};

	return (
		<Box
			component="div"
			sx={{
				height: 120
			}}>
			<Box
				component="div"
				sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
				<Box
					sx={{
						display: 'flex',
						width: '50%',
						justifyContent: 'space-between'
					}}>
					<AddImage />
					<AddVideo />
					<AddFile />
					<AddAudio />
				</Box>
			</Box>
			<OutlinedInput
				fullWidth
				multiline
				rows={2}
				value={msgInput}
				onChange={(event) => setMsgInput(event.target.value)}
				id="outlined-adornment-weight"
				onKeyDown={EnterSendMsg}
				endAdornment={
					<InputAdornment position="end" onClick={EnterSendMsg}>
						<SendIcon />
					</InputAdornment>
				}
				aria-describedby="outlined-weight-helper-text"
				inputProps={{
					'aria-label': 'weight'
				}}
			/>
		</Box>
	);
}
