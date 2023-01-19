import { useEffect } from 'react';
import { IP_PORT, API_VERSION, MESSAGE_TRANS_TYPE } from '../../utils/Constant';
import protobuf from '../../proto/proto';
import { useParams } from 'react-router-dom';
import MiniDrawer from './main/center';
import { Container } from '@mui/system';
import TransitionMsg from './main/right/alert';
import { useDispatch } from 'react-redux';
import { setSocket, appendFriendMsg } from '../../redux/actions/chat';

export default function Panel() {
	let socket;
	let lockConnection = false,
		reconnectObj = {};
	const { uid } = useParams();

	const dispatch = useDispatch();
	useEffect(() => {
		connection();
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

	const reconnect = () => {
		if (lockConnection) return;
		lockConnection = true;

		reconnectObj && clearTimeout(reconnectObj);

		reconnectObj = setTimeout(() => {
			if (socket.readyState !== 1) connection();
			lockConnection = false;
		}, 10000);
	};

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
		socket.onopen = () => {
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
				if (messageBuffer.type === MESSAGE_TRANS_TYPE) {
					console.log('webrtc');
					return;
				}

				if (messageBuffer.type === 'heartbeat') {
					return;
				}

				dispatch(appendFriendMsg(messageBuffer));
			});
		};

		socket.onclose = (_message) => {
			console.log('socket closed. will reconnect');
			reconnect();
		};
		socket.onerror = (_message) => {
			console.log('socket error. reconnecting');
			reconnect();
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
