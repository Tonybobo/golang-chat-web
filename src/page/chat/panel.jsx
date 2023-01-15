import { useEffect } from 'react';
import { IP_PORT, API_VERSION } from '../../utils/Constant';
import protobuf from '../../proto/proto';
import { useParams } from 'react-router-dom';
import MiniDrawer from './main/center';
import { Container } from '@mui/system';
import TransitionMsg from './main/right/alert';
import { useDispatch } from 'react-redux';
import { setSocket } from '../../redux/actions/chat';

export default function Panel() {
	let socket;
	const { uid } = useParams();

	const dispatch = useDispatch();
	useEffect(() => {
		connection();
	});

	let heartCheck = {
		timeout: 10000,
		timeoutObj: null,
		serverTimeoutObj: null,
		attempts: 3,
		start: function () {
			let self = this;
			let num = this.num;
			this.timeoutObj && clearTimeout(this.timeoutObj);
			this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
			this.timeoutObj = setTimeout(function () {
				let data = {
					type: 'heartbeat',
					content: 'ping'
				};

				if (socket.readyState === 1) {
					let message = protobuf.lookup('protocol.Message');
					const messagePB = message.create(data);
					socket.send(message.encode(messagePB).finish());
				}

				self.serverTimeoutObj = setTimeout(function () {
					num--;
					if (num <= 0) {
						console.log('the ping num is more then 3, close socket!');
						socket.close();
					}
				}, self.timeout);
			}, this.timeout);
		}
	};

	const connection = () => {
		socket = new WebSocket(
			'ws://' + IP_PORT + API_VERSION + '/socket.io?uid=' + uid
		);
		socket.onopen = async () => {
			heartCheck.start();
			dispatch(setSocket(socket));
		};
		socket.onmessage = (message) => {
			heartCheck.start();

			let messageProto = protobuf.lookup('protocol.Message');
			// read buffer and decode message
			let reader = new FileReader();
			reader.readAsArrayBuffer(message.data);
			reader.addEventListener('load', (event) => {
				let messageBuffer = messageProto.decode(
					//Array buffer need to be 8bit unsigned integer
					new Uint8Array(event.target.result)
				);

				if (messageBuffer.type === 'heartbeat') {
					return;
				}
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
