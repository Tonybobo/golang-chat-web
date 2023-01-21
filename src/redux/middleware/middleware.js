import { IP_PORT, API_VERSION, MESSAGE_TRANS_TYPE } from '../../utils/Constant';

import protobuf from '../../proto/proto';
import { appendFriendMsg, appendMsg } from '../actions/chat';

// const reconnect = () => {
// 	if (lockConnection) return;
// 	lockConnection = true;

// 	reconnectObj && clearTimeout(reconnectObj);

// 	reconnectObj = setTimeout(() => {
// 		if (socket.readyState !== 1) connection();
// 		lockConnection = false;
// 	}, 10000);
// };

const socketMiddleware = () => {
	let socket = null;

	const connection = (store, uid) => {
		socket = new WebSocket(
			'ws://' + IP_PORT + API_VERSION + '/socket.io?uid=' + uid
		);

		// // websocket handlers
		socket.onmessage = onMessage(store);
		socket.onclose = onClose(store);
		socket.onopen = onOpen(store);
	};
	const onOpen = (store) => (event) => {
		let data = {
			type: 'heartbeat',
			content: 'ping'
		};
		let message = protobuf.lookup('protocol.Message');
		const messagePB = message.create(data);
		socket.send(message.encode(messagePB).finish());
		setInterval(() => socket.send(message.encode(messagePB).finish()), 10000);
	};

	const onClose = (store) => () => {
		connection();
	};
	const onMessage = (store) => (event) => {
		let messageProto = protobuf.lookup('protocol.Message');
		// read buffer and decode message
		let reader = new FileReader();
		reader.readAsArrayBuffer(event.data);
		reader.addEventListener('load', (event) => {
			let messageBuffer = messageProto.decode(
				//Array buffer need to be 8bit unsigned integer
				new Uint8Array(event.target.result)
			);
			if (messageBuffer.type === MESSAGE_TRANS_TYPE) {
				console.log('webrtc');
				return;
			}

			if (messageBuffer.type === 'heartbeat') return;
			store.dispatch(appendFriendMsg(messageBuffer));
		});
	};
	let message = protobuf.lookup('protocol.Message');
	return (store) => (next) => (action) => {
		switch (action.type) {
			case 'users/login/fulfilled':
				if (socket !== null) {
					socket.close();
				}
				connection(store, action.payload.data.uid);
				next(action);
				break;

			case 'panel/sendMsg':
				const messagePB = message.create(action.payload);
				socket.send(message.encode(messagePB).finish());
				store.dispatch(appendMsg(action.payload));
				break;

			case 'panel/webrtc':
				let buffer = message.create(action.payload);
				socket.send(message.encode(buffer).finish());
				break;
			default:
				return next(action);
		}
	};
};

export default socketMiddleware();
