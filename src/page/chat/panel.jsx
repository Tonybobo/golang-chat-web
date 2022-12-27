import { useEffect } from 'react';
import { IP_PORT, API_VERSION } from '../../utils/Constant';
import protobuf from '../../proto/proto';
import { useParams } from 'react-router-dom';
import MiniDrawer from './main/center';
import { Container } from '@mui/system';
import TransitionMsg from './main/right/alert';

export default function Panel() {
	let socket;
	const { user } = useParams();
	useEffect(() => {
		connection();
	});

	const connection = () => {
		console.log('setting connection');
		socket = new WebSocket(
			'ws://' + IP_PORT + API_VERSION + '/socket.io?username=' + user
		);
		socket.onopen = async () => {
			let data = {
				type: 'heartbeat',
				content: 'ping'
			};
			//connection state
			if (socket.readyState === 1) {
				let message = protobuf.lookup('protocol.Message');
				const messageBuffer = message.create(data);
				socket.send(message.encode(messageBuffer).finish());
			}
		};
		socket.onmessage = (message) => {
			let messageProto = protobuf.lookup('protocol.Message');
			// read buffer and decode message
			let reader = new FileReader();
			reader.readAsArrayBuffer(message.data);
			reader.addEventListener('load', (event) => {
				let messageBuffer = messageProto.decode(
					//Array buffer need to be 8bit unsigned integer
					new Uint8Array(event.target.result)
				);

				if (messageBuffer.type === 'heartbeat') return;
			});
		};
	};
	return (
		<>
			<Container>
				<MiniDrawer />
				<TransitionMsg />
			</Container>
		</>
	);
}
