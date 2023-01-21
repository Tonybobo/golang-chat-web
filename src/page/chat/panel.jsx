import { useEffect } from 'react';
import MiniDrawer from './main/center';
import { Container } from '@mui/system';
import TransitionMsg from './main/right/alert';

export default function Panel() {
	useEffect(() => {
		checkPermission();
	});

	const checkPermission = () => {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
		return;
	};

	// const webrtcConnection = () => {
	// 	peer.onicecandidate = (e) => {
	// 		if (e.candidate) {
	// 			let candidate = {
	// 				type: 'answer_ice',
	// 				iceCandidate: e.candidate
	// 			};
	// 			let data = {
	// 				content: JSON.stringify(candidate),
	// 				type: MESSAGE_TRANS_TYPE,
	// 				messageType: selectUser.type,
	// 				fromUsername: users.username,
	// 				from: users.uid,
	// 				to: selectUser.uid
	// 			};
	// 			let message = protobuf.lookup('protocol.Message');
	// 			const messagePB = message.create(data);
	// 			socket.send(message.encode(messagePB).finish());
	// 		}
	// 	};

	// 	peer.ontrack = (e) => {
	// 		if (e && e.streams) {
	// 			console.log(e);
	// 		}
	// 	};
	// };

	return (
		<>
			<Container>
				<MiniDrawer />
				<TransitionMsg />
			</Container>
		</>
	);
}
